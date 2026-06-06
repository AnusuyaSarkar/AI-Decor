const express = require('express');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlistController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const { wishlistValidation } = require('../validations/wishlistValidation');

const router = express.Router();

router.post('/add', protect, authorizeRoles('user', 'admin'), wishlistValidation, validateRequest, addToWishlist);
router.delete('/remove', protect, authorizeRoles('user', 'admin'), wishlistValidation, validateRequest, removeFromWishlist);
router.get('/', protect, authorizeRoles('user', 'admin'), getWishlist);

module.exports = router;