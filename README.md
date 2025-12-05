# SymptomWise 🩺

AI-powered symptom checker that helps you understand potential health conditions and which type of doctor to consult.

## Features

- 🔍 Enter symptoms in natural language
- 🤖 AI-powered analysis
- 👨‍⚕️ Recommends appropriate medical specialist
- 🎨 Modern, responsive UI
- ⚡ Fast and lightweight

## Project Structure

```
├── frontend/          # React Router frontend
│   ├── app/
│   │   ├── routes/
│   │   │   └── home.tsx    # Main symptom checker page
│   │   ├── app.css         # Global styles
│   │   └── root.tsx        # Root layout
│   └── package.json
├── backend/           # Express.js backend
│   ├── server.js      # API server
│   ├── .env.example   # Environment variables template
│   └── package.json
└── package.json       # Root package.json with scripts
```

## Getting Started

### Installation

```bash
# Install all dependencies
npm run install:all
```

### Configuration

1. Copy the environment example file:
```bash
cp backend/.env.example backend/.env
```

2. Add your API credentials to `backend/.env`:
```
API_KEY=your_api_key_here
API_URL=your_api_url_here
```

### Development

Run frontend and backend separately:

```bash
# Terminal 1 - Frontend (http://localhost:5173)
npm run dev:frontend

# Terminal 2 - Backend (http://localhost:3000)
npm run dev:backend
```

## Deployment on Render

### Setup

1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure the service:

| Setting | Value |
|---------|-------|
| **Build Command** | `npm run render-build` |
| **Start Command** | `npm start` |
| **Root Directory** | (leave empty) |

4. Add environment variables:
   - `API_KEY` - Your API key
   - `API_URL` - Your API URL
   - `NODE_ENV` - `production`

### How it works

- The build command installs dependencies and builds the React frontend
- The Express server serves the built frontend files
- API requests to `/api/*` are handled by the backend

## Tech Stack

- **Frontend**: React Router 7, TypeScript, TailwindCSS
- **Backend**: Node.js, Express.js
- **Deployment**: Render

## Disclaimer

⚠️ This tool provides general guidance only and is not a substitute for professional medical advice. Always consult a healthcare provider for proper diagnosis and treatment.

## License

MIT

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
