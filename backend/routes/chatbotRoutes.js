const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/ChatbotController');
const authMiddleware = require('../middleware/authMiddleware');

// All chatbot routes require authentication
router.use(authMiddleware);

// POST /api/chatbot
router.post('/', chatbotController.chat.bind(chatbotController));

module.exports = router;
