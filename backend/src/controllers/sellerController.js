const Seller = require('../models/Seller');
const Product = require('../models/Product');
const Review = require('../models/Review');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendResponse } = require('../utils/apiResponse');
const { signToken } = require('../utils/generateToken');

const createSellerPayload = (seller) => ({
  id: seller._id,
  shopName: seller.shopName,
  ownerName: seller.ownerName,
  email: seller.email,
  role: seller.role,
  ratings: seller.ratings,
});

const createProductSummary = (product) => ({
  id: product._id,
  title: product.title,
  category: product.category,
  price: product.price,
  stock: product.stock,
  isActive: product.isActive,
  ratings: product.ratings,
  reviewCount: product.reviewCount,
  images: product.images,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
});

const createReviewSummary = (review) => ({
  id: review._id,
  rating: review.rating,
  comment: review.comment,
  createdAt: review.createdAt,
  user: review.userId
    ? {
        id: review.userId._id,
        name: review.userId.name,
        profileImage: review.userId.profileImage,
      }
    : null,
  product: review.productId
    ? {
        id: review.productId._id,
        title: review.productId.title,
        category: review.productId.category,
      }
    : null,
});

const registerSeller = asyncHandler(async (req, res) => {
  const { shopName, ownerName, email, password, profileImage = '' } = req.body;

  const existingSeller = await Seller.findOne({ email });
  if (existingSeller) {
    throw new AppError('Seller already exists', 400);
  }

  const seller = await Seller.create({
    shopName,
    ownerName,
    email,
    password,
    profileImage,
    role: 'seller',
  });

  const token = signToken({ id: seller._id, role: seller.role, accountType: 'seller' });

  return sendResponse(res, 201, 'Seller registered successfully', {
    seller: createSellerPayload(seller),
    token,
  });
});

const loginSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const seller = await Seller.findOne({ email }).select('+password');
  if (!seller) {
    throw new AppError('Invalid credentials', 401);
  }

  const isPasswordValid = await seller.matchPassword(password);
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  if (seller.isBlocked) {
    throw new AppError('Seller account is blocked', 403);
  }

  const token = signToken({ id: seller._id, role: seller.role, accountType: 'seller' });

  return sendResponse(res, 200, 'Login successful', {
    seller: createSellerPayload(seller),
    token,
  });
});

const getSellerDashboard = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;
  const [seller, sellerProducts] = await Promise.all([
    Seller.findById(sellerId).select('-password -passwordResetToken -passwordResetExpires'),
    Product.find({ sellerId }).sort({ createdAt: -1 }),
  ]);

  if (!seller) {
    throw new AppError('Seller not found', 404);
  }

  const sellerProductIds = sellerProducts.map((product) => product._id);
  const [totalReviews, recentReviews, statsSummary] = await Promise.all([
    Review.countDocuments({ productId: { $in: sellerProductIds } }),
    Review.find({ productId: { $in: sellerProductIds } })
      .populate('userId', 'name profileImage')
      .populate('productId', 'title category')
      .sort({ createdAt: -1 })
      .limit(5),
    Product.aggregate([
      { $match: { sellerId } },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          activeProducts: {
            $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] },
          },
          totalStock: { $sum: '$stock' },
          lowStockProducts: {
            $sum: {
              $cond: [{ $lte: ['$stock', 5] }, 1, 0],
            },
          },
          averageRating: { $avg: '$ratings.average' },
          totalReviewCount: { $sum: '$reviewCount' },
        },
      },
    ]),
  ]);

  const stats = statsSummary[0] || {
    totalProducts: 0,
    activeProducts: 0,
    totalStock: 0,
    lowStockProducts: 0,
    averageRating: 0,
    totalReviewCount: 0,
  };

  return sendResponse(res, 200, 'Seller dashboard fetched successfully', {
    seller: createSellerPayload(seller),
    stats: {
      totalProducts: stats.totalProducts || 0,
      activeProducts: stats.activeProducts || 0,
      totalStock: stats.totalStock || 0,
      lowStockProducts: stats.lowStockProducts || 0,
      averageRating: Number((stats.averageRating || 0).toFixed(2)),
      totalReviews: totalReviews || stats.totalReviewCount || 0,
    },
    recentProducts: sellerProducts.slice(0, 5).map(createProductSummary),
    recentReviews: recentReviews.map(createReviewSummary),
  });
});

const getSellerProducts = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  const filter = { sellerId };
  if (req.query.status === 'active') {
    filter.isActive = true;
  }
  if (req.query.status === 'inactive') {
    filter.isActive = false;
  }

  const [products, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  return sendResponse(
    res,
    200,
    'Seller products fetched successfully',
    {
      products: products.map(createProductSummary),
    },
    {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    }
  );
});

const getSellerReviews = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  const sellerProducts = await Product.find({ sellerId }).select('_id');
  const productIds = sellerProducts.map((product) => product._id);

  const [reviews, total] = await Promise.all([
    Review.find({ productId: { $in: productIds } })
      .populate('userId', 'name profileImage')
      .populate('productId', 'title category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Review.countDocuments({ productId: { $in: productIds } }),
  ]);

  return sendResponse(
    res,
    200,
    'Seller reviews fetched successfully',
    {
      reviews: reviews.map(createReviewSummary),
    },
    {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    }
  );
});

module.exports = {
  registerSeller,
  loginSeller,
  getSellerDashboard,
  getSellerProducts,
  getSellerReviews,
};