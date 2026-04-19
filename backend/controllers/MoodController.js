const moodService = require('../services/MoodService');

/**
 * MoodController
 * Handles HTTP request/response for mood entry endpoints.
 * Delegates all logic to MoodService.
 */
class MoodController {
  async addMoodEntry(req, res, next) {
    try {
      const { mood, note } = req.body;
      const userId = req.user.userId;

      const entry = await moodService.addMoodEntry({ userId, mood, note });

      res.status(201).json({
        success: true,
        message: 'Mood entry added successfully.',
        data: entry,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMoodHistory(req, res, next) {
    try {
      const userId = req.user.userId;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;

      const result = await moodService.getMoodHistory(userId, { page, limit });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MoodController();
