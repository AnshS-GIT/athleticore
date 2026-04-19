const moodEntryRepository = require('../repositories/MoodEntryRepository');

/**
 * MoodService
 * Handles all mood-related business logic.
 * Delegates DB operations to MoodEntryRepository.
 */
class MoodService {
  async addMoodEntry({ userId, mood, note }) {
    if (!mood) {
      const error = new Error('Mood is required');
      error.statusCode = 400;
      throw error;
    }

    const entry = await moodEntryRepository.create({
      userId,
      mood,
      note: note || '',
    });

    return entry;
  }

  async getMoodHistory(userId, { page = 1, limit = 20 } = {}) {
    const skip = (page - 1) * limit;

    const entries = await moodEntryRepository.findByUserId(userId, {
      limit,
      skip,
    });

    return {
      entries,
      page,
      limit,
    };
  }
}

module.exports = new MoodService();
