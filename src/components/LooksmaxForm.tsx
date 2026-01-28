import { useState } from 'react';

const LooksmaxForm = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState('');

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (photo) {
        URL.revokeObjectURL(photo);
      }
      setPhoto(URL.createObjectURL(event.target.files[0]));
      setPhotoFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!photoFile) {
      setError('Please upload a photo.');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis('');

    const formData = new FormData();
    formData.append('photo', photoFile);
    formData.append('height', height);
    formData.append('weight', weight);

    try {
      const response = await fetch('/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to get analysis. Please try again.');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card rounded-[2.5rem] p-8 md:p-12">
        <form onSubmit={handleSubmit}>
          {/* Photo Upload */}
          <div className="flex flex-col items-center mb-10">
            {photo ? (
              <img
                src={photo}
                alt="Preview"
                className="w-40 h-40 rounded-full object-cover border-4 border-white/20 mb-6 shadow-2xl"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-slate-500">add_a_photo</span>
              </div>
            )}
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors">
                <span className="material-symbols-outlined text-xl">photo_camera</span>
                Upload Photo
              </span>
            </label>
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analyzing...
              </>
            ) : (
              'Analyze My Potential'
            )}
          </button>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
          <span className="material-symbols-outlined text-red-400">error</span>
          <p className="text-red-400 font-medium text-sm">{error}</p>
        </div>
      )}

      {/* Results */}
      {analysis && (
        <div className="glass-card rounded-[2.5rem] p-8 md:p-12 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-3xl text-primary">analytics</span>
            <h3 className="text-2xl font-black">Analysis Result</h3>
          </div>
          <p className="text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default LooksmaxForm;
