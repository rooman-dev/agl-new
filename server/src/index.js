import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API endpoints:`);
  console.log(`   - POST /api/auth/login`);
  console.log(`   - GET  /api/auth/verify`);
  console.log(`   - GET  /api/posts/published`);
  console.log(`   - GET  /api/posts (admin)`);
  console.log(`   - POST /api/posts (admin)`);
  console.log(`   - PUT  /api/posts/:id (admin)`);
  console.log(`   - DELETE /api/posts/:id (admin)`);
  console.log(`   - POST /api/contact/contact`);
  console.log(`   - POST /api/contact/consultation`);
});
