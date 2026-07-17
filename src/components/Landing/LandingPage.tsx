import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  MapPin, 
  Leaf, 
  Bot, 
  Tv, 
  ArrowRight, 
  Flame, 
  Activity, 
  Clock
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useRouter().navigate;
  const { user, bypassLogin } = useAuth();
  const { t } = useLanguage();

  const handleLaunch = () => {
    if (!user) {
      bypassLogin('fan');
    }
    navigate('/dashboard');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white overflow-hidden relative selection:bg-primary selection:text-black">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      {/* Header bar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-black font-extrabold text-xs px-2.5 py-1 rounded tracking-widest flex items-center gap-1 shadow-lg shadow-primary/20">
            <Flame size={12} />
            FIFA 2026
          </span>
          <span className="font-black text-xl tracking-tight">StadiumMind <span className="text-primary">AI</span></span>
        </div>
        <button 
          onClick={handleLaunch}
          className="bg-white/5 border border-white/10 hover:border-primary/50 text-white font-bold text-sm px-5 py-2 rounded-full hover:bg-primary hover:text-black transition-all flex items-center gap-2"
        >
          {t('launch_btn')} <ArrowRight size={16} />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-primary/10 text-primary border border-primary/20 text-xs px-4 py-1.5 rounded-full font-extrabold tracking-widest uppercase mb-6 flex items-center gap-2"
        >
          <Activity size={12} className="animate-pulse" />
          {t('hero_badge')}
        </motion.div>

        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight max-w-4xl leading-[1.05]"
        >
          StadiumMind <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-white">AI</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 text-base sm:text-xl max-w-2xl mt-6 font-medium leading-relaxed"
        >
          {t('hero_subtitle')}
        </motion.p>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-10 justify-center w-full max-w-md"
        >
          <button 
            onClick={handleLaunch}
            className="bg-primary hover:bg-primary-hover text-black font-black px-8 py-4 rounded-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
          >
            {t('launch_btn')} <ArrowRight size={20} />
          </button>
          
          <button 
            onClick={() => { bypassLogin('admin'); navigate('/admin'); }}
            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all"
          >
            {t('admin_sim_btn')}
          </button>
        </motion.div>

        {/* Live stats ticker */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mt-20 border border-white/5 bg-white/[0.02] backdrop-blur-md rounded-2xl p-6"
        >
          <div className="text-center md:border-r border-white/5 py-2">
            <p className="text-3xl sm:text-4xl font-black text-primary">82.5K</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{t('stats_fans')}</p>
          </div>
          <div className="text-center md:border-r border-white/5 py-2">
            <p className="text-3xl sm:text-4xl font-black text-white">4.8m</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{t('stats_wait')}</p>
          </div>
          <div className="text-center md:border-r border-white/5 py-2">
            <p className="text-3xl sm:text-4xl font-black text-primary">&lt;1.2s</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{t('stats_latency')}</p>
          </div>
          <div className="text-center py-2">
            <p className="text-3xl sm:text-4xl font-black text-white">100%</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{t('stats_ada')}</p>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-black uppercase text-xs tracking-widest">{t('modules_title')}</p>
          <h2 className="text-3xl sm:text-5xl font-black mt-2">{t('modules_sub')}</h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <Bot size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('module_ai_title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t('module_ai_desc')}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('module_map_title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t('module_map_desc')}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
              <ShieldAlert size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('module_command_title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t('module_command_desc')}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Leaf size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('module_sustain_title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t('module_sustain_desc')}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Tv size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('module_telemetry_title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t('module_telemetry_desc')}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('module_transit_title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t('module_transit_desc')}</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#030304] py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="bg-primary/20 text-primary font-bold text-xs px-2 py-0.5 rounded">FIFA 2026</span>
            <span className="font-extrabold text-sm">StadiumMind AI</span>
          </div>
          <p className="text-xs text-gray-500">Designed and built for the FIFA World Cup Smart Stadium Hackathon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
