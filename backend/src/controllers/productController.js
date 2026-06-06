const Product = require('../models/Product');
const Seller = require('../models/Seller');
const Review = require('../models/Review');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendResponse } = require('../utils/apiResponse');
const { buildPagination } = require('../utils/pagination');

const normalizeArrayField = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string' && value.length > 0) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (_error) {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
};

const canManageProduct = (product, req) => req.user.role === 'admin' || String(product.sellerId) === String(req.user._id);

const recalculateSellerRatings = async (sellerId) => {
  const products = await Product.find({ sellerId });
  if (!products.length) {
    await Seller.findByIdAndUpdate(sellerId, { ratings: { average: 0, count: 0 } });
    return;
  }

  const average = products.reduce((sum, product) => sum + (product.ratings?.average || 0), 0) / products.length;
  await Seller.findByIdAndUpdate(sellerId, {
    ratings: {
      average: Number(average.toFixed(2)),
      count: products.length,
    },
  });
};

const createProduct = asyncHandler(async (req, res) => {
  const images = normalizeArrayField(req.body.images);
  const sellerId = req.user.role === 'admin' ? req.body.sellerId : req.user._id;

  if (req.user.role === 'admin' && !sellerId) {
    throw new AppError('sellerId is required when creating products as admin', 400);
  }

  const seller = await Seller.findById(sellerId);
  if (!seller) {
    throw new AppError('Seller not found', 404);
  }

  const product = await Product.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock || 0,
    images,
    sellerId,
  });

  await Seller.findByIdAndUpdate(sellerId, { $addToSet: { products: product._id } });

  return sendResponse(res, 201, 'Product created successfully', { product });
});

const getProducts = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const { category, search, sort = '-createdAt' } = req.query;

  const filter = { isActive: true };
  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
    ];
  }

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate('sellerId', 'shopName ownerName ratings')
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  return sendResponse(res, 200, 'Products fetched successfully', products, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 1,
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('sellerId', 'shopName ownerName ratings');

  if (!product || !product.isActive) {
    throw new AppError('Product not found', 404);
  }

  const reviews = await Review.find({ productId: product._id }).populate('userId', 'name profileImage');

  return sendResponse(res, 200, 'Product fetched successfully', {
    product,
    reviews,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || !product.isActive) {
    throw new AppError('Product not found', 404);
  }

  if (!canManageProduct(product, req)) {
    throw new AppError('Not authorized to update this product', 403);
  }

  const { title, description, category, price, stock, images } = req.body;
  if (title !== undefined) product.title = title;
  if (description !== undefined) product.description = description;
  if (category !== undefined) product.category = category;
  if (price !== undefined) product.price = price;
  if (stock !== undefined) product.stock = stock;
  if (images !== undefined) product.images = normalizeArrayField(images);

  await product.save();

  return sendResponse(res, 200, 'Product updated successfully', { product });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || !product.isActive) {
    throw new AppError('Product not found', 404);
  }

  if (!canManageProduct(product, req)) {
    throw new AppError('Not authorized to delete this product', 403);
  }

  product.isActive = false;
  await product.save();
  await Seller.findByIdAndUpdate(product.sellerId, { $pull: { products: product._id } });
  await User.updateMany({ wishlist: product._id }, { $pull: { wishlist: product._id } });

  return sendResponse(res, 200, 'Product deleted successfully');
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  recalculateSellerRatings,
};