const { body, param } = require('express-validator');

const designAnalysisValidation = [
  body('prompt').trim().notEmpty().withMessage('Prompt is required'),
];

const designRedesignValidation = [
  body('style')
    .trim()
    .isIn(['Modern', 'Minimalist', 'Luxury', 'Scandinavian', 'Bohemian'])
    .withMessage('Style must be one of the supported design styles'),
  body('prompt').optional().trim(),
];

const designIdValidation = [param('id').isMongoId().withMessage('Invalid design id')];

module.exports = {
  designAnalysisValidation,
  designRedesignValidation,
  designIdValidation,
};