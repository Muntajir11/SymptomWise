import type { Route } from "./+types/home";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SymptomWise - AI Symptom Checker" },
    { name: "description", content: "Enter your symptoms and get guidance on potential conditions and which doctor to see." },
  ];
}

interface AnalysisResult {
  disease: string;
  doctor: string;
  description: string;
}

export default function Home() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symptoms.trim()) {
      setError("Please enter your symptoms");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/analyze-symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze symptoms");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">🩺 SymptomWise</h1>
        <p className="tagline">AI-powered symptom analysis to guide your healthcare journey</p>
      </header>

      <main>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="symptoms" className="form-label">
                Describe your symptoms
              </label>
              <textarea
                id="symptoms"
                className="form-textarea"
                placeholder="Example: I have a headache, fever, and sore throat for the past 2 days..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <span className="loading">
                  <span className="spinner"></span>
                  Analyzing...
                </span>
              ) : (
                "Analyze Symptoms"
              )}
            </button>
          </form>

          {error && <div className="error">{error}</div>}

          {result && (
            <div className="results">
              <div className="result-card">
                <div className="result-label">Possible Condition</div>
                <div className="result-value">{result.disease}</div>
                {result.description && (
                  <p className="result-description">{result.description}</p>
                )}
              </div>

              <div className="result-card">
                <div className="result-label">Recommended Specialist</div>
                <div className="result-value">{result.doctor}</div>
              </div>
            </div>
          )}

          <div className="disclaimer">
            ⚠️ This tool provides general guidance only and is not a substitute for professional medical advice. 
            Always consult a healthcare provider for proper diagnosis and treatment.
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 SymptomWise. For informational purposes only.</p>
      </footer>
    </div>
  );
}
