const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Global middleware (Allow requests from deployed frontend domain)
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AthletiCore API is running' });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/mood', require('./routes/moodRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));

// Global error handler (must be registered AFTER routes)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
