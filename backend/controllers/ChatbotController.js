const chatbotService = require('../services/ChatbotService');

/**
 * ChatbotController
 * Handles HTTP request/response for the chatbot endpoint.
 * Delegates all logic to ChatbotService.
 */
class ChatbotController {
  async chat(req, res, next) {
    try {
      const { message } = req.body;

      if (!message || !message.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Message is required.',
        });
      }

      const response = await chatbotService.processMessage(message);

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChatbotController();
