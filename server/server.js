import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// ============ SECURITY MIDDLEWARE ============

// Helmet: Secure HTTP headers
app.use(helmet());

// CORS: Allow frontend origin(s)
const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5175').split(',').map(origin => origin.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);

// Rate Limiting: Prevent spam on booking endpoint
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT) || 30, // 30 requests per 15 min
  message: 'Too many booking requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// ============ BODY PARSER ============
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ============ ROUTES ============
app.use('/api', bookingLimiter, bookingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: '✅ Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// ============ ERROR HANDLING ============
app.use(errorHandler);

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API endpoint: http://localhost:${PORT}/api/appointments`);
});
