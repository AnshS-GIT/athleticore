import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MoodCard from '../components/MoodCard';
import moodService from '../services/moodService';
import './MoodPage.css';

const MOODS = [
  { value: 'happy', emoji: '😊', label: 'Happy' },
  { value: 'sad', emoji: '😢', label: 'Sad' },
  { value: 'stressed', emoji: '😰', label: 'Stressed' },
  { value: 'energetic', emoji: '⚡', label: 'Energetic' },
  { value: 'calm', emoji: '😌', label: 'Calm' },
  { value: 'tired', emoji: '😴', label: 'Tired' },
];

function MoodPage() {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const result = await moodService.getMoodHistory({ limit: 10 });
      setHistory(result.data.entries);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood) {
      setError('Please select a mood');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await moodService.addMoodEntry({ mood: selectedMood, note });
      setSuccess('Mood logged successfully!');
      setSelectedMood('');
      setNote('');
      fetchHistory(); // Refresh the history
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log mood');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="mood-page">
        <section className="mood-input-section">
          <h1>How are you feeling?</h1>
          <p className="mood-subtitle">Select your current mood and add an optional note.</p>

          <form onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}
            {success && <div className="mood-success">{success}</div>}

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

            <div className="form-group">
              <label htmlFor="note">Note (optional)</label>
              <textarea
                id="note"
                rows="3"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind?"
              />
            </div>

            <div className="mood-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Logging...' : 'Log Mood'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(`/recommendations?mood=${selectedMood}`)}
                disabled={!selectedMood}
              >
                Get Recommendations →
              </button>
            </div>
          </form>
        </section>

        <section className="mood-history-section">
          <h2>Your Mood History</h2>
          {loadingHistory ? (
            <p className="loading-text">Loading...</p>
          ) : history.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📝</span>
              <p>No entries yet. Log your first mood above!</p>
            </div>
          ) : (
            <div className="mood-grid">
              {history.map((entry) => (
                <MoodCard key={entry._id} entry={entry} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default MoodPage;
