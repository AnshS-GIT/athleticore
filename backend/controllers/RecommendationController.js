const recommendationService = require('../services/RecommendationService');

/**
 * RecommendationController
 * Handles HTTP request/response for recommendation endpoints.
 * Delegates all logic to RecommendationService.
 */
class RecommendationController {
  async getRecommendation(req, res, next) {
    try {
      const { mood } = req.params;

      const recommendation = await recommendationService.getRecommendation(mood);

      res.status(200).json({
        success: true,
        data: recommendation,
      });
    } catch (error) {
      next(error);
    }
  }

  async seedRecommendations(req, res, next) {
    try {
      const result = await recommendationService.seedDefaults();

      res.status(200).json({
        success: true,
        message: `Seeded ${result.seeded} mood recommendations.`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RecommendationController();
