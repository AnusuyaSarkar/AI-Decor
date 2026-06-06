const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { updateProfileValidation } = require('../validations/userValidation');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

router.get('/profile', protect, authorizeRoles('user', 'admin'), getProfile);
router.put('/profile', protect, authorizeRoles('user', 'admin'), updateProfileValidation, validateRequest, updateProfile);

module.exports = router;