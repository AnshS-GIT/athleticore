const recommendationService = require('../services/RecommendationService');

/**
 * ChatbotService
 * Handles chatbot conversation logic.
 * Reuses RecommendationService for mood-based responses.
 */
class ChatbotService {
  constructor() {
    this.validMoods = ['happy', 'sad', 'stressed', 'energetic', 'calm', 'tired'];
  }

  async processMessage(message) {
    const normalizedMessage = message.trim().toLowerCase();

    // Check if the message matches a valid mood
    const matchedMood = this.validMoods.find(
      (mood) => normalizedMessage === mood || normalizedMessage.includes(mood)
    );

    if (matchedMood) {
      const recommendation = await recommendationService.getRecommendation(matchedMood);

      return {
        type: 'recommendations',
        mood: matchedMood,
        text: `Great! Here are my suggestions for when you're feeling **${matchedMood}**:`,
        recommendations: recommendation,
      };
    }

    // Greeting detection
    const greetings = ['hi', 'hello', 'hey', 'hola', 'sup', 'yo'];
    if (greetings.some((g) => normalizedMessage.includes(g))) {
      return {
        type: 'greeting',
        text: "Hey there! 👋 I'm your AthletiCore assistant. How are you feeling today?",
        options: this.validMoods,
      };
    }

    // Help / unknown input
    return {
      type: 'prompt',
      text: "I can help you find activities, workouts, and music based on your mood! Just tell me how you're feeling. Pick one:",
      options: this.validMoods,
    };
  }
}

module.exports = new ChatbotService();
