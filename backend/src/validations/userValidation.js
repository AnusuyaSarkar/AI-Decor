const { body } = require('express-validator');

const updateProfileValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('profileImage').optional().isURL().withMessage('Profile image must be a valid URL'),
];

module.exports = { updateProfileValidation };
