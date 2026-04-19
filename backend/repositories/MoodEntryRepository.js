const MoodEntry = require('../models/MoodEntry');

/**
 * MoodEntryRepository
 * Encapsulates all database operations for the MoodEntry collection.
 */
class MoodEntryRepository {
  async create(entryData) {
    const entry = new MoodEntry(entryData);
    return entry.save();
  }

  async findByUserId(userId, { limit = 20, skip = 0 } = {}) {
    return MoodEntry.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async findById(id) {
    return MoodEntry.findById(id);
  }
}

module.exports = new MoodEntryRepository();
