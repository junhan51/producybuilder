import LooksmaxForm from './components/LooksmaxForm';
import Result from './pages/Result';
import Input from './pages/Input';
import LanguageSelector from './components/LanguageSelector';
import { useLanguage } from './i18n/LanguageContext';

function App() {
  const { t } = useLanguage();
  // Simple routing based on pathname
  const path = window.location.pathname;

  if (path === '/result') {
    return <Result />;
  }

  if (path === '/input') {
    return <Input />;
  }
  const scrollToAnalyze = () => {
    document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-card border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-2xl">token</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight">LooksMax.app</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-400">
            <a className="hover:text-white transition-colors" href="#analyze">{t('nav.analyze')}</a>
            <a className="hover:text-white transition-colors" href="#optimization">{t('nav.optimization')}</a>
            <a className="hover:text-white transition-colors" href="#process">{t('nav.process')}</a>
            <a className="hover:text-white transition-colors" href="#benefits">{t('nav.benefits')}</a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <button
              onClick={scrollToAnalyze}
              className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-all"
            >
              {t('nav.getStarted')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-20 pb-32">
        <div className="absolute inset-0 z-0 opacity-40" style={{ background: 'var(--bg-glow)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/10 text-xs font-bold uppercase tracking-widest text-primary mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            {t('hero.badge')}
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight">
            {t('hero.title1')} <br /> <span className="text-gradient">{t('hero.title2')}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={scrollToAnalyze}
              className="w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-xl shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1"
            >
              {t('hero.cta')}
            </button>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-background-dark"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOKaXzIMdSt3gyhw9l4OAXSF3Wi3EnQAqm2GUj0BVWfp5BOTGyeZMmb5JWcFvTbisPYNzPVfNAv_uVDq4SpcIx_cAi2t6XyJHPfTZf_SipvsRuUc8NdOOolESFbGsGGH4i7w4XDbfikDXKQ-HaANWNfZpaBhyGP9hUaP7c10sbSJZIXoU7SvKUGk9TXbeaX0phz64MxcV17bzNE-wXSnid84Vb2cNihRVE-jRR3C4Kz8OnqkN3wurMxNowBeBj_--YFAzr90eN9A"
                />
                <img
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-background-dark"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2dlxl3F70c6fIGIKaTd7ocazwbfYVcy7zQc-KI7GCo8iihN1n8afbYLx9WmuIivJ4GVJqyFkjCSs3Biaw03ppeUpds39xq2WpU9o654JQhCjXTHmiYEnobKDjEVQcgFQjchAUvxe4P2SUZ8XRLLquh5vw4Hwm0iykQpMoM9HxsXYturayhMYAqtXv7iF8mdpGli57F04KW1nBq6poNC-x8IP5qvVWCfuLASsYzVymiGUvP0wzkyhzejTTWfTJpBGFU6Yl5rZZgQ"
                />
                <img
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-background-dark"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIfDUNGmvqnhwzxNDbVNO_l_4iPZ4McapptcZy_EiIZluJhyanIarFm7fyvzbA9ztAKShKjsMiCznawV-6f3ga3GkrXZ64xdyOfSGWR8Uzpwq9-QHeLBGFa7IzPxmJf5AA0dnUCD4lwmjC9hIzEslckloQ6TFMw1f7bgKlcOzGbYu23jTXpzb0SNqby9i5zO8gRrFo794HfK2E6hLrMi3CkbMR8yYoNMBltgspktAWcBzqpgcJBvlTaT526SwWP7_Uj1Tlycdekw"
                />
              </div>
              <span className="text-sm font-bold text-slate-500">{t('hero.users')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Analyze Form Section */}
      <section className="py-32 px-6" id="analyze">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl font-black mb-4">{t('analyze.title')}</h2>
          <div className="h-1.5 w-24 bg-primary rounded-full" />
        </div>
        <LooksmaxForm />
      </section>

      {/* Optimization */}
      <section className="py-32 px-6" id="optimization">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-3xl glass-card flex items-center justify-center mb-8 border-white/10 group-hover:border-primary/50 transition-all duration-500 group-hover:bg-primary/5">
                <span className="material-symbols-outlined text-5xl text-primary">face_6</span>
              </div>
              <h3 className="text-2xl font-black mb-4">{t('optimization.face')}</h3>
              <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
                {t('optimization.faceDesc')}
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-3xl glass-card flex items-center justify-center mb-8 border-white/10 group-hover:border-accent/50 transition-all duration-500 group-hover:bg-accent/5">
                <span className="material-symbols-outlined text-5xl text-accent">apparel</span>
              </div>
              <h3 className="text-2xl font-black mb-4">{t('optimization.style')}</h3>
              <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
                {t('optimization.styleDesc')}
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-3xl glass-card flex items-center justify-center mb-8 border-white/10 group-hover:border-emerald-500/50 transition-all duration-500 group-hover:bg-emerald-500/5">
                <span className="material-symbols-outlined text-5xl text-emerald-500">accessibility_new</span>
              </div>
              <h3 className="text-2xl font-black mb-4">{t('optimization.posture')}</h3>
              <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
                {t('optimization.postureDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 bg-surface-dark/30" id="process">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-4xl font-black mb-4">{t('process.title')}</h2>
            <div className="h-1.5 w-24 bg-primary rounded-full" />
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 hidden md:block" />
            <div className="grid md:grid-cols-3 gap-16 relative z-10">
              <div className="flex flex-col items-center text-center md:block md:text-left">
                <div className="w-16 h-16 rounded-full bg-background-dark border-2 border-primary flex items-center justify-center text-primary font-black text-xl mb-8 mx-auto md:mx-0 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  01
                </div>
                <h4 className="text-xl font-bold mb-3">{t('process.step1')}</h4>
                <p className="text-slate-500 text-sm font-medium">{t('process.step1Desc')}</p>
              </div>
              <div className="flex flex-col items-center text-center md:block md:text-left">
                <div className="w-16 h-16 rounded-full bg-background-dark border-2 border-white/20 flex items-center justify-center text-white/50 font-black text-xl mb-8 mx-auto md:mx-0">
                  02
                </div>
                <h4 className="text-xl font-bold mb-3">{t('process.step2')}</h4>
                <p className="text-slate-500 text-sm font-medium">{t('process.step2Desc')}</p>
              </div>
              <div className="flex flex-col items-center text-center md:block md:text-left">
                <div className="w-16 h-16 rounded-full bg-background-dark border-2 border-white/20 flex items-center justify-center text-white/50 font-black text-xl mb-8 mx-auto md:mx-0">
                  03
                </div>
                <h4 className="text-xl font-bold mb-3">{t('process.step3')}</h4>
                <p className="text-slate-500 text-sm font-medium">{t('process.step3Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-32 px-6" id="benefits">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-[2.5rem] hover:bg-white/5 transition-all">
              <div className="text-primary mb-6">
                <span className="material-symbols-outlined text-4xl">verified</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white">{t('benefits.confidence')}</h4>
              <p className="text-slate-400 font-medium">{t('benefits.confidenceDesc')}</p>
            </div>
            <div className="glass-card p-10 rounded-[2.5rem] bg-gradient-to-b from-primary/5 to-transparent border-primary/20">
              <div className="text-primary mb-6">
                <span className="material-symbols-outlined text-4xl">map</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white">{t('benefits.roadmap')}</h4>
              <p className="text-slate-400 font-medium">{t('benefits.roadmapDesc')}</p>
            </div>
            <div className="glass-card p-10 rounded-[2.5rem] hover:bg-white/5 transition-all">
              <div className="text-primary mb-6">
                <span className="material-symbols-outlined text-4xl">biotech</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white">{t('benefits.data')}</h4>
              <p className="text-slate-400 font-medium">{t('benefits.dataDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass-card rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-50" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8">{t('cta.title')}</h2>
            <p className="text-slate-400 mb-12 text-lg max-w-xl mx-auto">{t('cta.subtitle')}</p>
            <button
              onClick={scrollToAnalyze}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform"
            >
              {t('cta.button')}
            </button>
            <p className="mt-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
              {t('cta.secure')}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-black text-xl">token</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight">LooksMax.app</span>
          </div>
          <div className="flex gap-10 text-sm font-bold text-slate-500">
            <a className="hover:text-white" href="#">{t('footer.privacy')}</a>
            <a className="hover:text-white" href="#">{t('footer.terms')}</a>
            <a className="hover:text-white" href="#">{t('footer.contact')}</a>
            <a className="hover:text-white" href="#">{t('footer.twitter')}</a>
          </div>
          <p className="text-sm text-slate-600 font-medium">&copy; 2025 LooksMax.app AI Systems</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
