const Recommendation = require('../models/Recommendation');

/**
 * RecommendationRepository
 * Encapsulates all database operations for the Recommendation collection.
 */
class RecommendationRepository {
  async findByMood(mood) {
    return Recommendation.findOne({ mood });
  }

  async upsertByMood(mood, data) {
    return Recommendation.findOneAndUpdate(
      { mood },
      { mood, ...data },
      { upsert: true, new: true }
    );
  }

  async findAll() {
    return Recommendation.find();
  }
}

module.exports = new RecommendationRepository();
