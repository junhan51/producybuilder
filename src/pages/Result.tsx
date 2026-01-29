import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const SESSION_TOKEN_KEY = 'looksmax_session_token';
const TEMP_DATA_KEY = 'looksmax_temp_data';

interface ParsedResult {
  overallScore: number | null;
  predictedAge: string | null;
  bodyFat: string | null;
  facialScores: { region: string; score: number; description: string }[];
  skinType: string | null;
  sections: { title: string; content: string }[];
}

const parseAnalysis = (text: string): ParsedResult => {
  const result: ParsedResult = {
    overallScore: null,
    predictedAge: null,
    bodyFat: null,
    facialScores: [],
    skinType: null,
    sections: [],
  };

  // Extract overall score (PSL scale)
  const scoreMatch = text.match(/(?:attractiveness rating|overall|score)[:\s]*(\d+\.?\d*)\s*[\/out of]*\s*10/i);
  if (scoreMatch) {
    result.overallScore = parseFloat(scoreMatch[1]);
  }

  // Extract predicted age
  const ageMatch = text.match(/(?:predicted age|age)[:\s]*(\d+)\s*(?:years|yrs)?/i);
  if (ageMatch) {
    result.predictedAge = ageMatch[1];
  }

  // Extract body fat level
  const bodyFatMatch = text.match(/(?:body fat|fat level)[:\s]*(low|medium|high)/i);
  if (bodyFatMatch) {
    result.bodyFat = bodyFatMatch[1].toLowerCase();
  }

  // Extract facial region scores
  const regions = ['eye area', 'midface', 'jaw', 'chin', 'skin', 'symmetry'];
  regions.forEach(region => {
    const regex = new RegExp(`${region}[:\\s]*(\\d+\\.?\\d*)\\s*(?:[/]|out of)?\\s*10`, 'i');
    const match = text.match(regex);
    if (match) {
      // Find description after the score
      const descRegex = new RegExp(`${region}[^\\n]*?\\d+[^\\n]*?[-–:]?\\s*([^\\n]+)`, 'i');
      const descMatch = text.match(descRegex);
      result.facialScores.push({
        region: region.charAt(0).toUpperCase() + region.slice(1),
        score: parseFloat(match[1]),
        description: descMatch ? descMatch[1].trim() : '',
      });
    }
  });

  // Extract skin type
  const skinMatch = text.match(/(?:skin type)[:\s]*(dry|oily|combination)/i);
  if (skinMatch) {
    result.skinType = skinMatch[1].toLowerCase();
  }

  // Split into sections
  const sectionHeaders = [
    'Overall Snapshot',
    'Facial Region Scores',
    'Skin Type',
    'Actionable',
    'Actual guidance',
    'Body Fat Management',
    'Improvement Potential',
  ];

  let currentSection = { title: 'Overview', content: '' };
  const lines = text.split('\n');

  lines.forEach(line => {
    const headerMatch = sectionHeaders.find(h =>
      line.toLowerCase().includes(h.toLowerCase())
    );
    if (headerMatch && line.trim().length < 100) {
      if (currentSection.content.trim()) {
        result.sections.push({ ...currentSection });
      }
      currentSection = { title: line.replace(/[#*]/g, '').trim(), content: '' };
    } else {
      currentSection.content += line + '\n';
    }
  });

  if (currentSection.content.trim()) {
    result.sections.push(currentSection);
  }

  return result;
};

// Circular Progress Component
const CircularScore = ({ score, maxScore = 10 }: { score: number; maxScore?: number }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = (animatedScore / maxScore) * 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (animatedScore < score) {
        setAnimatedScore(prev => Math.min(prev + 0.1, score));
      }
    }, 20);
    return () => clearTimeout(timer);
  }, [animatedScore, score]);

  const getScoreColor = (s: number) => {
    if (s >= 7) return '#10b981'; // emerald
    if (s >= 5) return '#3b82f6'; // blue
    if (s >= 3) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="72"
          cy="72"
          r="54"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="72"
          cy="72"
          r="54"
          stroke={getScoreColor(score)}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black text-white">{animatedScore.toFixed(1)}</span>
        <span className="text-xs text-slate-400 font-bold">/ {maxScore}</span>
      </div>
    </div>
  );
};

// Progress Bar Component
const ScoreBar = ({ label, score, maxScore = 10, description }: { label: string; score: number; maxScore?: number; description?: string }) => {
  const [width, setWidth] = useState(0);
  const percentage = (score / maxScore) * 100;

  useEffect(() => {
    setTimeout(() => setWidth(percentage), 100);
  }, [percentage]);

  const getBarColor = (s: number) => {
    if (s >= 7) return 'bg-emerald-500';
    if (s >= 5) return 'bg-blue-500';
    if (s >= 3) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-white">{label}</span>
        <span className="text-sm font-bold text-slate-400">{score.toFixed(1)}/10</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${getBarColor(score)} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
      {description && (
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      )}
    </div>
  );
};

// Accordion Section Component
const AccordionSection = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span className="font-bold text-white">{title}</span>
        <span className={`material-symbols-outlined text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 bg-white/[0.02]">
          {children}
        </div>
      </div>
    </div>
  );
};

const Result = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [parsedResult, setParsedResult] = useState<ParsedResult | null>(null);
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const checkoutId = urlParams.get('checkout_id');
      const storedToken = localStorage.getItem(SESSION_TOKEN_KEY);

      if (checkoutId) {
        window.history.replaceState({}, '', '/result');
      }

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
        setVerifying(false);
        await runAnalysis('dev_token');
      }
    } catch {
      setVerifying(false);
      await runAnalysis('dev_token');
    }
  };

  const runAnalysis = async (token: string) => {
    const savedDataStr = localStorage.getItem(TEMP_DATA_KEY);
    if (!savedDataStr) {
      setError('No photo data found. Please start over.');
      return;
    }

    const savedData = JSON.parse(savedDataStr);
    setPhotoPreview(savedData.photo);
    setLoading(true);

    try {
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
      setParsedResult(parseAnalysis(data.analysis));

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
              className="w-32 h-32 rounded-full object-cover mx-auto mb-8 border-4 border-primary/30 animate-pulse"
            />
          )}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <h2 className="text-2xl font-black text-white mb-4">AI Analysis in Progress</h2>
          <p className="text-slate-400">Examining facial structure, proportions, and aesthetic potential...</p>
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6">
            <span className="material-symbols-outlined text-xl">check_circle</span>
            Analysis Complete
          </div>
          <h1 className="text-4xl font-black text-white mb-4">Your Results</h1>
        </div>

        {/* Main Score Card */}
        {parsedResult && (parsedResult.overallScore || photoPreview) && (
          <div className="glass-card rounded-[2.5rem] p-8 md:p-12 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Photo */}
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Your photo"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white/10"
                />
              )}

              {/* Score */}
              {parsedResult.overallScore && (
                <div className="flex-1 flex flex-col md:flex-row items-center gap-8">
                  <CircularScore score={parsedResult.overallScore} />
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-black text-white mb-2">PSL Rating</h2>
                    <p className="text-slate-400 text-sm mb-4">Based on scientific facial analysis</p>
                    <div className="flex flex-wrap gap-3">
                      {parsedResult.predictedAge && (
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-slate-300">
                          Age: ~{parsedResult.predictedAge}
                        </span>
                      )}
                      {parsedResult.bodyFat && (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          parsedResult.bodyFat === 'low' ? 'bg-emerald-500/20 text-emerald-400' :
                          parsedResult.bodyFat === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          Body Fat: {parsedResult.bodyFat}
                        </span>
                      )}
                      {parsedResult.skinType && (
                        <span className="px-3 py-1 bg-blue-500/20 rounded-full text-xs font-bold text-blue-400">
                          Skin: {parsedResult.skinType}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Facial Region Scores */}
        {parsedResult && parsedResult.facialScores.length > 0 && (
          <div className="glass-card rounded-[2.5rem] p-8 md:p-12 mb-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-white">face_6</span>
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Facial Region Analysis</h2>
                <p className="text-sm text-slate-400">Detailed breakdown by area</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8">
              {parsedResult.facialScores.map((item, idx) => (
                <ScoreBar
                  key={idx}
                  label={item.region}
                  score={item.score}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        )}

        {/* Detailed Sections */}
        {parsedResult && parsedResult.sections.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-white">description</span>
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Detailed Analysis</h2>
                <p className="text-sm text-slate-400">Personalized insights and recommendations</p>
              </div>
            </div>
            {parsedResult.sections.map((section, idx) => (
              <AccordionSection key={idx} title={section.title} defaultOpen={idx === 0}>
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h3 className="text-lg font-bold text-white mt-4 mb-2">{children}</h3>,
                      h2: ({ children }) => <h4 className="text-base font-bold text-white mt-3 mb-2">{children}</h4>,
                      h3: ({ children }) => <h5 className="text-sm font-bold text-white mt-2 mb-1">{children}</h5>,
                      p: ({ children }) => <p className="text-slate-300 mb-3 leading-relaxed">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside text-slate-300 mb-3 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside text-slate-300 mb-3 space-y-1">{children}</ol>,
                      li: ({ children }) => <li className="text-slate-300">{children}</li>,
                      strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
                    }}
                  >
                    {section.content}
                  </ReactMarkdown>
                </div>
              </AccordionSection>
            ))}
          </div>
        )}

        {/* Full Raw Analysis (Fallback) */}
        {(!parsedResult || parsedResult.sections.length === 0) && analysis && (
          <div className="glass-card rounded-[2.5rem] p-8 md:p-12 mb-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-white">analytics</span>
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Your Analysis</h2>
                <p className="text-sm text-slate-400">AI-powered recommendations</p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h2 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h2>,
                  h2: ({ children }) => <h3 className="text-xl font-bold text-white mt-5 mb-2">{children}</h3>,
                  h3: ({ children }) => <h4 className="text-lg font-bold text-white mt-4 mb-2">{children}</h4>,
                  p: ({ children }) => <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="text-slate-300">{children}</li>,
                  strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
                }}
              >
                {analysis}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.print()}
            className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">print</span>
            Save Report
          </button>
          <a
            href="/"
            className="flex-1 py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold transition flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">home</span>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;
