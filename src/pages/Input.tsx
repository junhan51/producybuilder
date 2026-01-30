import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const TEMP_DATA_KEY = 'looksmax_temp_data';

const Input = () => {
  const { t } = useLanguage();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [frontPhoto, setFrontPhoto] = useState<string | null>(null);
  const [frontPhotoBase64, setFrontPhotoBase64] = useState<string | null>(null);
  const [sidePhoto, setSidePhoto] = useState<string | null>(null);
  const [sidePhotoBase64, setSidePhotoBase64] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFrontPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (frontPhoto) {
        URL.revokeObjectURL(frontPhoto);
      }
      setFrontPhoto(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontPhotoBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSidePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (sidePhoto) {
        URL.revokeObjectURL(sidePhoto);
      }
      setSidePhoto(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setSidePhotoBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckout = async () => {
    if (!frontPhotoBase64 || !sidePhotoBase64) {
      setError(t('input.errorBothPhotos'));
      return;
    }

    setCheckoutLoading(true);
    setError('');

    // Save data to localStorage before checkout
    localStorage.setItem(TEMP_DATA_KEY, JSON.stringify({
      frontPhoto: frontPhotoBase64,
      sidePhoto: sidePhotoBase64,
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
            {t('input.back')}
          </a>
          <h1 className="text-4xl font-black text-white mb-4">{t('input.title')}</h1>
          <p className="text-slate-400">{t('input.subtitle')}</p>
        </div>

        {/* Form */}
        <div className="glass-card rounded-[2.5rem] p-8 md:p-12">
          {/* Photo Upload Instructions */}
          <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-400 text-xl mt-0.5">info</span>
              <p className="text-amber-200 text-sm leading-relaxed">
                <strong>{t('input.warning')}</strong> {t('input.warningText')}
              </p>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Front Photo */}
            <div className="flex flex-col items-center">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">face</span>
                {t('input.frontView')}
              </h3>
              {frontPhoto ? (
                <img
                  src={frontPhoto}
                  alt="Front Preview"
                  className="w-40 h-40 rounded-2xl object-cover border-4 border-primary/30 mb-4 shadow-2xl"
                />
              ) : (
                <div className="w-40 h-40 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-5xl text-slate-500 mb-2">face</span>
                  <span className="text-slate-500 text-xs">{t('input.frontFacing')}</span>
                </div>
              )}
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFrontPhotoChange}
                />
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm text-white transition-colors">
                  <span className="material-symbols-outlined text-lg">photo_camera</span>
                  {frontPhoto ? t('input.change') : t('input.upload')}
                </span>
              </label>
            </div>

            {/* Side Profile Photo */}
            <div className="flex flex-col items-center">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-accent">person</span>
                {t('input.sideProfile')}
              </h3>
              {sidePhoto ? (
                <img
                  src={sidePhoto}
                  alt="Side Preview"
                  className="w-40 h-40 rounded-2xl object-cover border-4 border-accent/30 mb-4 shadow-2xl"
                />
              ) : (
                <div className="w-40 h-40 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-5xl text-slate-500 mb-2">person</span>
                  <span className="text-slate-500 text-xs">{t('input.sideView')}</span>
                </div>
              )}
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSidePhotoChange}
                />
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm text-white transition-colors">
                  <span className="material-symbols-outlined text-lg">photo_camera</span>
                  {sidePhoto ? t('input.change') : t('input.upload')}
                </span>
              </label>
            </div>
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">{t('input.height')}</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">{t('input.weight')}</label>
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
            disabled={checkoutLoading || !frontPhotoBase64 || !sidePhotoBase64}
            className="w-full py-5 bg-gradient-to-r from-accent to-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-black text-xl shadow-2xl shadow-accent/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3"
          >
            {checkoutLoading ? (
              <>
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('input.processing')}
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                {t('input.proceed')}
              </>
            )}
          </button>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              {t('input.securePayment')}
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
