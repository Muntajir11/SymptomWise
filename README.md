# MediScan

AI-powered symptom checker that helps identify potential health conditions and recommends appropriate medical specialists.

## Features

- Natural language symptom input
- AI-powered analysis using Google Gemini
- Returns 1-3 possible conditions based on symptom clarity
- Recommends appropriate medical specialist for each condition
- Modern, responsive UI with Tailwind CSS

## Project Structure

```
symptom-wise/
├── backend/
│   ├── server.js           # Express server entry point
│   ├── routes/
│   │   └── api.js          # API route handlers
│   ├── services/
│   │   └── gemini.js       # Gemini API integration
│   └── utils/
│       └── prompts.js      # AI prompts and constants
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Tailwind styles
│   ├── index.html
│   └── package.json
├── .env.example            # Environment template
├── .gitignore
└── package.json            # Root package with scripts
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Google Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/Muntajir11/MediScan.git
cd MediScan

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend && npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

### Development

```bash
# Terminal 1 - Start backend server
npm run server

# Terminal 2 - Start frontend dev server
cd frontend && npm run dev
```

- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:3000

### Production Build

```bash
# Build frontend
cd frontend && npm run build

# Start server (serves both API and static files)
npm start
```

## Deployment (Render)

1. Connect your GitHub repository to Render
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variable: `GEMINI_API_KEY`

## API Endpoints

### POST /api/analyze-symptoms

Analyzes symptoms and returns possible conditions.

**Request:**
```json
{
  "symptoms": "headache, fever, sore throat"
}
```

**Response:**
```json
{
  "conditions": [
    {
      "disease": "Common Cold",
      "doctor": "General Physician",
      "description": "Viral infection affecting the upper respiratory tract."
    }
  ]
}
```

### GET /api/health

Health check endpoint.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **AI:** Google Gemini API

