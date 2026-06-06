const express = require('express');
const {
  getUsers,
  getSellers,
  getProducts,
  deleteProduct,
  blockUser,
  getDashboardStats,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const { adminIdValidation } = require('../validations/adminValidation');

const router = express.Router();

router.use(protect, authorizeRoles('admin'));

router.get('/stats', getDashboardStats);
router.get('/users', getUsers);
router.get('/sellers', getSellers);
router.get('/products', getProducts);
router.delete('/products/:id', adminIdValidation, validateRequest, deleteProduct);
router.patch('/users/:id/block', adminIdValidation, validateRequest, blockUser);

module.exports = router;