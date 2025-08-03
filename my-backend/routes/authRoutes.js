const express = require('express');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  getMe
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resettoken', resetPassword);
router.get('/verify-email/:verificationtoken', verifyEmail);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router; 