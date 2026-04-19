const express = require('express');
const router = express.Router();
const moodController = require('../controllers/MoodController');
const authMiddleware = require('../middleware/authMiddleware');

// All mood routes require authentication
router.use(authMiddleware);

// POST /api/mood
router.post('/', moodController.addMoodEntry.bind(moodController));

// GET /api/mood
router.get('/', moodController.getMoodHistory.bind(moodController));

module.exports = router;
