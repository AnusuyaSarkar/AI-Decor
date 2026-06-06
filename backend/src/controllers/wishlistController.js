const User = require('../models/User');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendResponse } = require('../utils/apiResponse');

const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    throw new AppError('Product not found', 404);
  }

  await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: productId } });

  return sendResponse(res, 200, 'Product added to wishlist');
});

const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  await User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: productId } });

  return sendResponse(res, 200, 'Product removed from wishlist');
});

const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');

  return sendResponse(res, 200, 'Wishlist fetched successfully', {
    wishlist: user?.wishlist || [],
  });
});

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};