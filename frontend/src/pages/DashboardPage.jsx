import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MoodCard from '../components/MoodCard';
import authService from '../services/authService';
import moodService from '../services/moodService';
import './Dashboard.css';

function DashboardPage() {
  const user = authService.getUser();
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await moodService.getMoodHistory({ limit: 5 });
        setMoodHistory(result.data.entries);
      } catch (err) {
        console.error('Failed to fetch mood history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="dashboard">
        <section className="dashboard-welcome">
          <h1>Welcome back, <span className="highlight">{user?.name || 'User'}</span> 👋</h1>
          <p>Track your mood and get personalized recommendations.</p>
        </section>

        <section className="dashboard-actions">
          <Link to="/mood" className="action-card">
            <span className="action-icon">📝</span>
            <h3>Log Mood</h3>
            <p>Record how you're feeling right now</p>
          </Link>
          <Link to="/recommendations" className="action-card">
            <span className="action-icon">💡</span>
            <h3>Get Recommendations</h3>
            <p>Activities, workouts & music for your mood</p>
          </Link>
        </section>

        <section className="dashboard-history">
          <div className="section-header">
            <h2>Recent Mood History</h2>
            <Link to="/mood" className="view-all">View all →</Link>
          </div>

          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : moodHistory.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📊</span>
              <p>No mood entries yet. Start logging your mood!</p>
            </div>
          ) : (
            <div className="mood-grid">
              {moodHistory.map((entry) => (
                <MoodCard key={entry._id} entry={entry} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
