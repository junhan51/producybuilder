const LooksmaxForm = () => {
  const goToInput = () => {
    window.location.href = '/input';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card rounded-[2.5rem] p-8 md:p-12">
        {/* Features */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-primary">face_6</span>
            </div>
            <div>
              <h4 className="font-bold text-white">Facial Analysis</h4>
              <p className="text-sm text-slate-400">Golden ratio & symmetry evaluation</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-accent">apparel</span>
            </div>
            <div>
              <h4 className="font-bold text-white">Style Recommendations</h4>
              <p className="text-sm text-slate-400">Personalized wardrobe & grooming tips</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-emerald-500">fitness_center</span>
            </div>
            <div>
              <h4 className="font-bold text-white">Body Optimization</h4>
              <p className="text-sm text-slate-400">Fitness & posture improvement plan</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={goToInput}
          className="w-full py-4 bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white rounded-2xl font-black text-lg shadow-2xl shadow-accent/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined">auto_awesome</span>
          Unlock Premium Analysis
        </button>

        {/* Info */}
        <p className="text-center text-slate-500 text-sm mt-4">
          One-time payment. No subscription required.
        </p>
      </div>
    </div>
  );
};

export default LooksmaxForm;
