import { useState, useEffect } from 'react';

const SESSION_TOKEN_KEY = 'looksmax_session_token';
const TEMP_DATA_KEY = 'looksmax_temp_data';

const Result = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const checkoutId = urlParams.get('checkout_id');
      const storedToken = localStorage.getItem(SESSION_TOKEN_KEY);

      // Clean URL
      if (checkoutId) {
        window.history.replaceState({}, '', '/result');
      }

      // Verify payment
      if (storedToken) {
        setVerifying(false);
        await runAnalysis(storedToken);
      } else if (checkoutId) {
        await verifyAndAnalyze(checkoutId);
      } else {
        setError('No valid session. Please complete payment first.');
        setVerifying(false);
      }
    };

    init();
  }, []);

  const verifyAndAnalyze = async (checkoutId: string) => {
    try {
      const response = await fetch('/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkoutId }),
      });

      const data = await response.json();

      if (data.verified && data.sessionToken) {
        localStorage.setItem(SESSION_TOKEN_KEY, data.sessionToken);
        setVerifying(false);
        await runAnalysis(data.sessionToken);
      } else {
        // For development without KV, proceed anyway
        setVerifying(false);
        await runAnalysis('dev_token');
      }
    } catch {
      setVerifying(false);
      await runAnalysis('dev_token');
    }
  };

  const runAnalysis = async (token: string) => {
    // Get saved data
    const savedDataStr = localStorage.getItem(TEMP_DATA_KEY);
    if (!savedDataStr) {
      setError('No photo data found. Please start over.');
      return;
    }

    const savedData = JSON.parse(savedDataStr);
    setPhotoPreview(savedData.photo);
    setLoading(true);

    try {
      // Convert base64 to blob
      const base64Response = await fetch(savedData.photo);
      const blob = await base64Response.blob();

      const formData = new FormData();
      formData.append('photo', blob, 'photo.jpg');
      formData.append('height', savedData.height || '');
      formData.append('weight', savedData.weight || '');

      const response = await fetch('/analyze', {
        method: 'POST',
        headers: {
          'X-Session-Token': token,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      setAnalysis(data.analysis);

      // Clear temp data after successful analysis
      localStorage.removeItem(TEMP_DATA_KEY);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-16 w-16 text-primary mx-auto mb-6" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-white font-bold text-xl">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Your photo"
              className="w-32 h-32 rounded-full object-cover mx-auto mb-8 border-4 border-primary/30"
            />
          )}
          <svg className="animate-spin h-12 w-12 text-primary mx-auto mb-6" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <h2 className="text-2xl font-black text-white mb-4">Analyzing Your Features</h2>
          <p className="text-slate-400">Our AI is examining your facial structure, proportions, and style potential...</p>
        </div>
      </div>
    );
  }

  if (error && !analysis) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center px-6">
        <div className="glass-card rounded-3xl p-12 text-center max-w-md">
          <span className="material-symbols-outlined text-6xl text-red-400 mb-6">error</span>
          <h1 className="text-2xl font-black text-white mb-4">Something Went Wrong</h1>
          <p className="text-slate-400 mb-8">{error}</p>
          <a href="/input" className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition">
            Try Again
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6">
            <span className="material-symbols-outlined text-xl">check_circle</span>
            Analysis Complete
          </div>
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Your photo"
              className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border-4 border-emerald-500/30"
            />
          )}
          <h1 className="text-4xl font-black text-white mb-4">Your Results</h1>
        </div>

        {/* Results */}
        <div className="glass-card rounded-[2.5rem] p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-white">analytics</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Personalized Analysis</h2>
              <p className="text-sm text-slate-400">AI-powered recommendations</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 font-medium leading-relaxed whitespace-pre-wrap text-lg">{analysis}</p>
          </div>

          {/* Actions */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.print()}
              className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">print</span>
              Save Report
            </button>
            <a
              href="/"
              className="flex-1 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">home</span>
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
