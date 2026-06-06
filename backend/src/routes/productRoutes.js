const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const {
  productValidation,
  productUpdateValidation,
  productIdValidation,
  productQueryValidation,
} = require('../validations/productValidation');

const router = express.Router();

router.get('/', productQueryValidation, validateRequest, getProducts);
router.get('/:id', productIdValidation, validateRequest, getProductById);
router.post('/', protect, authorizeRoles('seller', 'admin'), productValidation, validateRequest, createProduct);
router.put('/:id', protect, authorizeRoles('seller', 'admin'), productIdValidation, productUpdateValidation, validateRequest, updateProduct);
router.delete('/:id', protect, authorizeRoles('seller', 'admin'), productIdValidation, validateRequest, deleteProduct);

module.exports = router;