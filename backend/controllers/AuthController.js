const authService = require('../services/AuthService');

/**
 * AuthController
 * Handles HTTP request/response for authentication endpoints.
 * Delegates all logic to AuthService.
 */
class AuthController {
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and password are required.',
        });
      }

      const result = await authService.signup({ name, email, password });

      res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required.',
        });
      }

      const result = await authService.login({ email, password });

      res.status(200).json({
        success: true,
        message: 'Login successful.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
