const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/RecommendationController');

// GET /api/recommendations/:mood
router.get('/:mood', recommendationController.getRecommendation.bind(recommendationController));

// POST /api/recommendations/seed  (utility route for seeding default data)
router.post('/seed', recommendationController.seedRecommendations.bind(recommendationController));

module.exports = router;
