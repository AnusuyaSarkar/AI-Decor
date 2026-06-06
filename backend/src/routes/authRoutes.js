const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/authController');
const {
  registerUserValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require('../validations/authValidation');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

router.post('/register', registerUserValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, loginUser);
router.post('/forgot-password', forgotPasswordValidation, validateRequest, forgotPassword);
router.post('/reset-password', resetPasswordValidation, validateRequest, resetPassword);

module.exports = router;