import React, { useState, useRef, useEffect } from 'react';
import chatbotService from '../services/chatbotService';
import './Chatbot.css';

const MOOD_EMOJI = {
  happy: '😊',
  sad: '😢',
  stressed: '😰',
  energetic: '⚡',
  calm: '😌',
  tired: '😴',
};

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      type: 'greeting',
      text: "Hey there! 👋 I'm your AthletiCore assistant. How are you feeling today?",
      options: ['happy', 'sad', 'stressed', 'energetic', 'calm', 'tired'],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const result = await chatbotService.sendMessage(text);
      const botData = result.data;

      const botMsg = {
        sender: 'bot',
        type: botData.type,
        text: botData.text,
        options: botData.options || null,
        recommendations: botData.recommendations || null,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', type: 'error', text: 'Oops! Something went wrong. Try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleOptionClick = (mood) => {
    sendMessage(mood);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span className="chatbot-header-icon">🤖</span>
            <div>
              <h3>AthletiCore Bot</h3>
              <span className="chatbot-status">Online</span>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.sender === 'bot' && <span className="bot-avatar">🤖</span>}

                <div className="message-content">
                  <p className="message-text">{msg.text}</p>

                  {/* Mood option buttons */}
                  {msg.options && (
                    <div className="mood-options">
                      {msg.options.map((mood) => (
                        <button
                          key={mood}
                          className="mood-btn"
                          onClick={() => handleOptionClick(mood)}
                          disabled={loading}
                        >
                          {MOOD_EMOJI[mood] || '🙂'} {mood}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Recommendation cards */}
                  {msg.recommendations && (
                    <div className="chat-recommendations">
                      <div className="chat-rec-group">
                        <h4>🎯 Activities</h4>
                        <ul>
                          {msg.recommendations.activities.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="chat-rec-group">
                        <h4>💪 Workouts</h4>
                        <ul>
                          {msg.recommendations.workouts.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="chat-rec-group">
                        <h4>🎵 Music</h4>
                        <ul>
                          {msg.recommendations.music.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message bot">
                <span className="bot-avatar">🤖</span>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a mood or say hi..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !inputValue.trim()}>
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;
