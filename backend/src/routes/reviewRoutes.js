const express = require('express');
const { addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const { reviewValidation, reviewIdValidation, updateReviewValidation } = require('../validations/reviewValidation');

const router = express.Router();

router.post('/', protect, authorizeRoles('user', 'admin'), reviewValidation, validateRequest, addReview);
router.put('/:id', protect, authorizeRoles('user', 'admin'), reviewIdValidation, updateReviewValidation, validateRequest, updateReview);
router.delete('/:id', protect, authorizeRoles('user', 'admin'), reviewIdValidation, validateRequest, deleteReview);

module.exports = router;