import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.post('/api/analyze-symptoms', async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.trim() === '') {
      return res.status(400).json({ error: 'Please provide symptoms' });
    }

    // TODO: Add your API key and endpoint here
    const API_KEY = process.env.API_KEY || ''; // Add your API key
    const API_URL = process.env.API_URL || ''; // Add your API URL

    if (!API_KEY || !API_URL) {
      // Demo response when API is not configured
      return res.json({
        disease: 'API not configured',
        doctor: 'Please configure your API key and URL in the .env file',
        description: 'Once configured, this will provide real symptom analysis.'
      });
    }

    // Make API call here
    // Example:
    // const response = await fetch(API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${API_KEY}`
    //   },
    //   body: JSON.stringify({ symptoms })
    // });
    // const data = await response.json();
    // return res.json(data);

    res.json({
      disease: 'Configure API',
      doctor: 'Configure API',
      description: 'Please set up your API'
    });

  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    res.status(500).json({ error: 'Failed to analyze symptoms' });
  }
});

// Serve static files from the React app build
const clientBuildPath = path.join(__dirname, '../frontend/build/client');
app.use(express.static(clientBuildPath));

// Handle React routing - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 SymptomWise server running on port ${PORT}`);
});
