const recommendationRepository = require('../repositories/RecommendationRepository');

/**
 * Default rule-based recommendation data.
 * Used as a fallback when no database entry exists for a mood.
 */
const DEFAULT_RECOMMENDATIONS = {
  happy: {
    activities: ['Go for a walk in nature', 'Call a friend', 'Try a creative hobby'],
    workouts: ['Dance workout', 'Cycling', 'Group sports'],
    music: ['Upbeat pop', 'Feel-good indie', 'Dance hits'],
  },
  sad: {
    activities: ['Journal your thoughts', 'Watch a comforting movie', 'Take a warm bath'],
    workouts: ['Gentle yoga', 'Light stretching', 'Slow walk'],
    music: ['Acoustic ballads', 'Lo-fi chill', 'Classical piano'],
  },
  stressed: {
    activities: ['Practice deep breathing', 'Meditate for 10 minutes', 'Declutter your space'],
    workouts: ['Yoga flow', 'Tai chi', 'Swimming'],
    music: ['Nature sounds', 'Ambient electronic', 'Meditation tracks'],
  },
  energetic: {
    activities: ['Start a new project', 'Explore a new area', 'Socialize with friends'],
    workouts: ['HIIT training', 'Running', 'Jump rope'],
    music: ['EDM', 'Rock anthems', 'Hip-hop bangers'],
  },
  calm: {
    activities: ['Read a book', 'Cook a healthy meal', 'Practice mindfulness'],
    workouts: ['Pilates', 'Gentle cycling', 'Stretching routine'],
    music: ['Jazz', 'Bossa nova', 'Soft folk'],
  },
  tired: {
    activities: ['Take a power nap', 'Hydrate and snack healthy', 'Do light stretches'],
    workouts: ['Restorative yoga', 'Slow walk', 'Foam rolling'],
    music: ['Sleep sounds', 'Soft ambient', 'Calm instrumentals'],
  },
};

/**
 * RecommendationService
 * Provides mood-based recommendations using DB data with rule-based fallback.
 */
class RecommendationService {
  async getRecommendation(mood) {
    const validMoods = Object.keys(DEFAULT_RECOMMENDATIONS);

    if (!validMoods.includes(mood)) {
      const error = new Error(
        `Invalid mood: "${mood}". Valid moods are: ${validMoods.join(', ')}`
      );
      error.statusCode = 400;
      throw error;
    }

    // Try fetching from DB first
    let recommendation = await recommendationRepository.findByMood(mood);

    // Fall back to hardcoded defaults if not in DB
    if (!recommendation) {
      recommendation = {
        mood,
        ...DEFAULT_RECOMMENDATIONS[mood],
      };
    }

    return {
      mood: recommendation.mood,
      activities: recommendation.activities,
      workouts: recommendation.workouts,
      music: recommendation.music,
    };
  }

  /**
   * Seeds the Recommendation collection with default data.
   * Useful for initializing a fresh database.
   */
  async seedDefaults() {
    const moods = Object.keys(DEFAULT_RECOMMENDATIONS);

    for (const mood of moods) {
      await recommendationRepository.upsertByMood(mood, DEFAULT_RECOMMENDATIONS[mood]);
    }

    return { seeded: moods.length };
  }
}

module.exports = new RecommendationService();
