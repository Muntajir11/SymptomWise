import { useState } from 'react';

function App() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!symptoms.trim()) {
      setError('Please enter your symptoms');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/analyze-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze symptoms');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-teal-400 mb-2">
          SymptomWise
        </h1>
        <p className="text-gray-300">
          AI-powered symptom analysis to guide your healthcare journey
        </p>
      </header>

      {/* Main Card */}
      <main className="w-full max-w-2xl">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-700">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="symptoms" className="block text-white font-medium mb-2">
                Describe your symptoms
              </label>
              <textarea
                id="symptoms"
                className="w-full h-32 px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                placeholder="Example: I have a headache, fever, and sore throat for the past 2 days..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Analyze Symptoms'
              )}
            </button>
          </form>

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-900/30 border border-red-500 rounded-xl text-red-300">
              {error}
            </div>
          )}

          {/* Result */}
          {result && result.conditions && (
            <div className="mt-6 p-6 bg-gray-900/50 rounded-xl border border-gray-600">
              <h2 className="text-xl font-bold text-teal-400 mb-4">
                {result.conditions.length === 1 ? 'Possible Condition' : 'Possible Conditions'}
              </h2>
              
              <div className="space-y-6">
                {result.conditions.map((condition, index) => (
                  <div key={index} className={`${index > 0 ? 'pt-6 border-t border-gray-700' : ''}`}>
                    {result.conditions.length > 1 && (
                      <span className="text-teal-500 text-sm font-medium mb-2 block">
                        {index + 1}. {condition.disease}
                      </span>
                    )}
                    
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-gray-400 text-sm uppercase tracking-wide">Condition</h3>
                        <p className="text-white text-lg font-medium">{condition.disease}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-gray-400 text-sm uppercase tracking-wide">Recommended Specialist</h3>
                        <p className="text-white text-lg font-medium">{condition.doctor}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-gray-400 text-sm uppercase tracking-wide">Description</h3>
                        <p className="text-gray-300">{condition.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600/50 rounded-xl">
            <p className="text-yellow-200 text-sm text-center">
              This tool provides general guidance only and is not a substitute for professional medical advice. 
              Always consult a healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 text-gray-500 text-sm">
        © 2025 SymptomWise. For informational purposes only.
      </footer>
    </div>
  );
}

export default App;
