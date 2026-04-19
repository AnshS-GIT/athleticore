import React from 'react';
import './MoodCard.css';

const MOOD_EMOJI = {
  happy: '😊',
  sad: '😢',
  stressed: '😰',
  energetic: '⚡',
  calm: '😌',
  tired: '😴',
};

function MoodCard({ entry }) {
  const emoji = MOOD_EMOJI[entry.mood] || '🙂';
  const date = new Date(entry.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`mood-card mood-${entry.mood}`}>
      <div className="mood-card-header">
        <span className="mood-emoji">{emoji}</span>
        <span className="mood-label">{entry.mood}</span>
      </div>
      {entry.note && <p className="mood-note">{entry.note}</p>}
      <span className="mood-date">{date}</span>
    </div>
  );
}

export default MoodCard;
