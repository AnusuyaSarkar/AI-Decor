const { param } = require('express-validator');

const adminIdValidation = [param('id').isMongoId().withMessage('Invalid id')];

module.exports = { adminIdValidation };