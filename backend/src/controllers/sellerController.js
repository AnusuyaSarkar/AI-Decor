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
  const sellerProductIds = await Product.find({ sellerId }).distinct('_id');

  const [products, totalProducts, totalReviews] = await Promise.all([
    Product.find({ sellerId }).sort({ createdAt: -1 }).limit(10),
    Product.countDocuments({ sellerId }),
    Review.countDocuments({ productId: { $in: sellerProductIds } }),
  ]);

  const seller = await Seller.findById(sellerId).select('-password');

  return sendResponse(res, 200, 'Seller dashboard fetched successfully', {
    seller,
    stats: {
      totalProducts,
      totalReviews,
    },
    recentProducts: products,
  });
});

module.exports = {
  registerSeller,
  loginSeller,
  getSellerDashboard,
};