const express = require('express');
const { registerSeller, loginSeller, getSellerDashboard } = require('../controllers/sellerController');
const { registerSellerValidation, loginSellerValidation } = require('../validations/sellerValidation');
const { validateRequest } = require('../middleware/validateRequest');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerSellerValidation, validateRequest, registerSeller);
router.post('/login', loginSellerValidation, validateRequest, loginSeller);
router.get('/dashboard', protect, authorizeRoles('seller'), getSellerDashboard);

module.exports = router;