const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// POST /api/auth/signup
router.post('/signup', authController.signup.bind(authController));

// POST /api/auth/login
router.post('/login', authController.login.bind(authController));

module.exports = router;
