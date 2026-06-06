const { body } = require('express-validator');

const wishlistValidation = [
  body('productId').isMongoId().withMessage('Valid productId is required'),
];

module.exports = { wishlistValidation };