import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import recommendationService from '../services/recommendationService';
import './RecommendationsPage.css';

const MOODS = [
  { value: 'happy', emoji: '😊', label: 'Happy' },
  { value: 'sad', emoji: '😢', label: 'Sad' },
  { value: 'stressed', emoji: '😰', label: 'Stressed' },
  { value: 'energetic', emoji: '⚡', label: 'Energetic' },
  { value: 'calm', emoji: '😌', label: 'Calm' },
  { value: 'tired', emoji: '😴', label: 'Tired' },
];

function RecommendationsPage() {
  const [searchParams] = useSearchParams();
  const [selectedMood, setSelectedMood] = useState(searchParams.get('mood') || '');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedMood) {
      fetchRecommendations(selectedMood);
    }
  }, [selectedMood]);

  const fetchRecommendations = async (mood) => {
    setLoading(true);
    setError('');
    try {
      const result = await recommendationService.getRecommendations(mood);
      setRecommendations(result.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch recommendations');
      setRecommendations(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="recommendations-page">
        <h1>Recommendations</h1>
        <p className="rec-subtitle">Select a mood to get personalized suggestions.</p>

        <div className="mood-selector">
          {MOODS.map((mood) => (
            <button
              key={mood.value}
              type="button"
              className={`mood-option ${selectedMood === mood.value ? 'selected' : ''}`}
              onClick={() => setSelectedMood(mood.value)}
            >
              <span className="mood-option-emoji">{mood.emoji}</span>
              <span className="mood-option-label">{mood.label}</span>
            </button>
          ))}
        </div>

        {error && <div className="auth-error">{error}</div>}

        {loading && <p className="loading-text">Loading recommendations...</p>}

        {recommendations && !loading && (
          <div className="rec-results">
            <div className="rec-category">
              <div className="rec-category-header">
                <span className="rec-icon">🎯</span>
                <h2>Activities</h2>
              </div>
              <ul className="rec-list">
                {recommendations.activities.map((item, i) => (
                  <li key={i} className="rec-item">{item}</li>
                ))}
              </ul>
            </div>

            <div className="rec-category">
              <div className="rec-category-header">
                <span className="rec-icon">💪</span>
                <h2>Workouts</h2>
              </div>
              <ul className="rec-list">
                {recommendations.workouts.map((item, i) => (
                  <li key={i} className="rec-item">{item}</li>
                ))}
              </ul>
            </div>

            <div className="rec-category">
              <div className="rec-category-header">
                <span className="rec-icon">🎵</span>
                <h2>Music</h2>
              </div>
              <ul className="rec-list">
                {recommendations.music.map((item, i) => (
                  <li key={i} className="rec-item">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!selectedMood && !loading && (
          <div className="empty-state">
            <span className="empty-icon">💡</span>
            <p>Choose a mood above to see what we recommend!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default RecommendationsPage;
