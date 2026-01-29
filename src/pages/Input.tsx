import { useState } from 'react';

const TEMP_DATA_KEY = 'looksmax_temp_data';

const Input = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Preview
      if (photo) {
        URL.revokeObjectURL(photo);
      }
      setPhoto(URL.createObjectURL(file));

      // Convert to base64 for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckout = async () => {
    if (!photoBase64) {
      setError('Please upload a photo first.');
      return;
    }

    setCheckoutLoading(true);
    setError('');

    // Save data to localStorage before checkout
    localStorage.setItem(TEMP_DATA_KEY, JSON.stringify({
      photo: photoBase64,
      height,
      weight,
      timestamp: Date.now(),
    }));

    try {
      const response = await fetch('/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        console.error('Invalid JSON response:', text);
        throw new Error('Server error. Please try again.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Checkout failed');
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <a href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </a>
          <h1 className="text-4xl font-black text-white mb-4">Upload Your Photo</h1>
          <p className="text-slate-400">Complete the form below to get your personalized analysis</p>
        </div>

        {/* Form */}
        <div className="glass-card rounded-[2.5rem] p-8 md:p-12">
          {/* Photo Upload */}
          <div className="flex flex-col items-center mb-10">
            {photo ? (
              <img
                src={photo}
                alt="Preview"
                className="w-48 h-48 rounded-full object-cover border-4 border-primary/30 mb-6 shadow-2xl"
              />
            ) : (
              <div className="w-48 h-48 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-6xl text-slate-500">add_a_photo</span>
              </div>
            )}
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <span className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold text-sm text-white transition-colors">
                <span className="material-symbols-outlined text-xl">photo_camera</span>
                {photo ? 'Change Photo' : 'Upload Photo'}
              </span>
            </label>
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors text-lg"
              />
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading || !photoBase64}
            className="w-full py-5 bg-gradient-to-r from-accent to-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-black text-xl shadow-2xl shadow-accent/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3"
          >
            {checkoutLoading ? (
              <>
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                Proceed to Payment
              </>
            )}
          </button>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Secure payment powered by Polar. One-time purchase.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-red-400">error</span>
            <p className="text-red-400 font-medium text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
