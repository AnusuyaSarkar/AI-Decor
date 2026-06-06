const express = require('express');
const {
  analyzeDecor,
  redesignRoom,
  getDesigns,
  getDesignById,
} = require('../controllers/designController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const {
  designAnalysisValidation,
  designRedesignValidation,
  designIdValidation,
} = require('../validations/designValidation');

const router = express.Router();

router.post('/analyze', protect, authorizeRoles('user', 'admin'), upload.single('image'), designAnalysisValidation, validateRequest, analyzeDecor);
router.post('/redesign', protect, authorizeRoles('user', 'admin'), upload.single('image'), designRedesignValidation, validateRequest, redesignRoom);
router.get('/', protect, authorizeRoles('user', 'admin'), getDesigns);
router.get('/:id', protect, authorizeRoles('user', 'admin'), designIdValidation, validateRequest, getDesignById);

module.exports = router;