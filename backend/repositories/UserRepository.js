const User = require('../models/User');

/**
 * UserRepository
 * Encapsulates all database operations for the User collection.
 * No business logic — only raw data access.
 */
class UserRepository {
  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findById(id) {
    return User.findById(id).select('-password');
  }

  async create(userData) {
    const user = new User(userData);
    return user.save();
  }
}

module.exports = new UserRepository();
