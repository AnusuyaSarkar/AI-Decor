const Review = require('../models/Review');
const Product = require('../models/Product');
const Seller = require('../models/Seller');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendResponse } = require('../utils/apiResponse');
const { recalculateSellerRatings } = require('./productController');

const recalculateProductRatings = async (productId) => {
  const result = await Review.aggregate([
    { $match: { productId } },
    {
      $group: {
        _id: '$productId',
        average: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ]);

  const ratings = result[0] || { average: 0, count: 0 };
  const product = await Product.findById(productId);

  if (product) {
    product.ratings = {
      average: Number((ratings.average || 0).toFixed(2)),
      count: ratings.count || 0,
    };
    product.reviewCount = ratings.count || 0;
    await product.save();
    await recalculateSellerRatings(product.sellerId);
  }
};

const addReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;

  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    throw new AppError('Product not found', 404);
  }

  const existingReview = await Review.findOne({ userId: req.user._id, productId });
  if (existingReview) {
    throw new AppError('You have already reviewed this product', 400);
  }

  const review = await Review.create({
    userId: req.user._id,
    productId,
    rating,
    comment,
  });

  await recalculateProductRatings(productId);

  return sendResponse(res, 201, 'Review added successfully', { review });
});

const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    throw new AppError('Review not found', 404);
  }

  if (String(review.userId) !== String(req.user._id) && req.user.role !== 'admin') {
    throw new AppError('Not authorized to update this review', 403);
  }

  if (req.body.rating !== undefined) review.rating = req.body.rating;
  if (req.body.comment !== undefined) review.comment = req.body.comment;
  await review.save();

  await recalculateProductRatings(review.productId);

  return sendResponse(res, 200, 'Review updated successfully', { review });
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    throw new AppError('Review not found', 404);
  }

  if (String(review.userId) !== String(req.user._id) && req.user.role !== 'admin') {
    throw new AppError('Not authorized to delete this review', 403);
  }

  await review.deleteOne();
  await recalculateProductRatings(review.productId);

  return sendResponse(res, 200, 'Review deleted successfully');
});

module.exports = {
  addReview,
  updateReview,
  deleteReview,
};