const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mood: {
      type: String,
      required: true,
      enum: ['happy', 'sad', 'stressed', 'energetic', 'calm', 'tired'], // Example moods
    },
    note: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: false }, // Only need createdAt as per spec
  }
);

// Indexes for performance
// 1. Finding entries for a specific user quickly.
moodEntrySchema.index({ userId: 1 });
// 2. Finding all recent mood entries of a user quickly (e.g., timeline views).
moodEntrySchema.index({ userId: 1, createdAt: -1 });

const MoodEntry = mongoose.model('MoodEntry', moodEntrySchema);

module.exports = MoodEntry;
