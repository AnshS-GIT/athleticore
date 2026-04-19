const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema(
  {
    mood: {
      type: String,
      required: true,
      unique: true, 
      enum: ['happy', 'sad', 'stressed', 'energetic', 'calm', 'tired'], 
    },
    activities: [
      {
        type: String,
      },
    ],
    workouts: [
      {
        type: String,
      },
    ],
    music: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: false, // Not heavily updated, static configuration maps mostly
  }
);

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
