import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import apiRoutes from './routes/api.js';

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Serve static files in production
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
