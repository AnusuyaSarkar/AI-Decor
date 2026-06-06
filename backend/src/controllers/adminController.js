const User = require('../models/User');
const Seller = require('../models/Seller');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendResponse } = require('../utils/apiResponse');

const getUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  return sendResponse(res, 200, 'Users fetched successfully', { users });
});

const getSellers = asyncHandler(async (_req, res) => {
  const sellers = await Seller.find().sort({ createdAt: -1 });
  return sendResponse(res, 200, 'Sellers fetched successfully', { sellers });
});

const getProducts = asyncHandler(async (_req, res) => {
  const products = await Product.find().populate('sellerId', 'shopName ownerName email');
  return sendResponse(res, 200, 'Products fetched successfully', { products });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  await Product.findByIdAndUpdate(product._id, { isActive: false });
  await Seller.findByIdAndUpdate(product.sellerId, { $pull: { products: product._id } });

  return sendResponse(res, 200, 'Product removed by admin');
});

const blockUser = asyncHandler(async (req, res) => {
  const { blocked = true } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  user.isBlocked = blocked;
  await user.save();

  return sendResponse(res, 200, `User ${blocked ? 'blocked' : 'unblocked'} successfully`, { user });
});

const getDashboardStats = asyncHandler(async (_req, res) => {
  const [users, sellers, products] = await Promise.all([
    User.countDocuments(),
    Seller.countDocuments(),
    Product.countDocuments(),
  ]);

  return sendResponse(res, 200, 'Dashboard stats fetched successfully', {
    stats: { users, sellers, products },
  });
});

module.exports = {
  getUsers,
  getSellers,
  getProducts,
  deleteProduct,
  blockUser,
  getDashboardStats,
};