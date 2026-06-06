const { body, param } = require('express-validator');

const reviewValidation = [
  body('productId').isMongoId().withMessage('Valid productId is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required'),
];

const updateReviewValidation = [
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().notEmpty().withMessage('Comment cannot be empty'),
];

const reviewIdValidation = [param('id').isMongoId().withMessage('Invalid review id')];

module.exports = {
  reviewValidation,
  updateReviewValidation,
  reviewIdValidation,
};