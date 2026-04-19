const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/UserRepository');

const SALT_ROUNDS = 10;

/**
 * AuthService
 * Handles all authentication business logic — signup, login, token generation.
 * No direct DB calls; delegates to UserRepository.
 */
class AuthService {
  async signup({ name, email, password }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      const error = new Error('User with this email already exists');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this._generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const token = this._generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  _generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
  }
}

module.exports = new AuthService();
