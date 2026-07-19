import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useStadiumState } from '../../context/StadiumStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { AlertBanner } from './AlertBanner';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Bot, 
  ShieldAlert, 
  Leaf,
  Settings, 
  LogOut, 
  Flame, 
  Menu, 
  X, 
  CloudSun,
  UserCheck,
  Youtube,
  Instagram,
  Linkedin,
  Github,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { path, navigate } = useRouter();
  const { user, logout, bypassLogin } = useAuth();
  const { matchDetails, evacuationActive } = useStadiumState();
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const menuItems = [
    { path: '/dashboard', label: t('dashboard'), icon: LayoutDashboard, roles: ['fan', 'admin', 'staff'] },
    { path: '/map', label: t('map'), icon: MapIcon, roles: ['fan', 'admin', 'staff'] },
    { path: '/ai', label: t('ai_assistant'), icon: Bot, roles: ['fan', 'admin', 'staff'] },
    { path: '/sustainability', label: t('sustainability'), icon: Leaf, roles: ['fan', 'admin', 'staff'] },
    { path: '/command-center', label: t('command_center'), icon: ShieldAlert, roles: ['admin', 'staff'] },
    { path: '/admin', label: t('control_center'), icon: Settings, roles: ['admin'] },
  ];

  const handleNavigation = (targetPath: string) => {
    navigate(targetPath);
    setMobileMenuOpen(false);
  };

  const currentYear = new Date().getFullYear();

  // Social Links Component (Developer Card)
  const DeveloperCard = () => (
    <div className="bg-gradient-to-r from-orange-600/10 to-transparent border border-white/5 rounded-xl p-3 text-xs mt-4 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-20%] w-10 h-10 bg-primary/20 rounded-full blur-md pointer-events-none"></div>
      <p className="text-[9px] text-gray-500 font-extrabold uppercase tracking-widest">AI Developer</p>
      <p className="font-extrabold text-white text-xs mt-0.5">Anish Wani</p>
      
      <div className="flex gap-2.5 mt-2.5">
        <a 
          href="https://www.youtube.com/@AnishWani_Ai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-red-500 transition-colors" 
          title="YouTube"
        >
          <Youtube size={15} />
        </a>
        <a 
          href="https://www.instagram.com/anish_inspires?igsh=YmRodXFxd2RwaHZw" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-pink-500 transition-colors" 
          title="Instagram"
        >
          <Instagram size={15} />
        </a>
        <a 
          href="https://www.linkedin.com/in/anish-wani-091071374" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-blue-500 transition-colors" 
          title="LinkedIn"
        >
          <Linkedin size={15} />
        </a>
        <a 
          href="https://github.com/AnishCodes-99" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-white transition-colors" 
          title="GitHub"
        >
          <Github size={15} />
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-darkBg text-white flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-darkBg/95 border-b border-white/5 sticky top-0 z-40 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-gray-400 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/landing')}>
            <span className="bg-primary text-black font-extrabold text-xs px-2.5 py-1 rounded tracking-widest flex items-center gap-1 shadow-lg shadow-primary/20">
              <Flame size={16} className="animate-pulse" />
              FIFA 2026
            </span>
            <span className="font-black text-lg tracking-tight hidden sm:inline">StadiumMind <span className="text-primary">AI</span></span>
          </div>
        </div>

        {/* Live World Cup Ticker */}
        {matchDetails.status === 'live' && (
          <div className="bg-black/40 border border-primary/30 rounded-full px-4 py-1.5 flex items-center gap-3 text-xs sm:text-sm shadow-[0_0_15px_rgba(255,107,0,0.15)]">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-extrabold tracking-wider text-primary text-xs uppercase">{t('live_match')}</span>
            <span className="font-bold tracking-tight">
              {matchDetails.homeTeam} <span className="text-primary font-black">{matchDetails.homeScore}</span> - <span className="text-primary font-black">{matchDetails.awayScore}</span> {matchDetails.awayTeam}
            </span>
            <span className="text-gray-400 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">
              {matchDetails.timePlayed}'
            </span>
          </div>
        )}

        {/* Weather, Language Selector and User Profiles */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400 bg-white/5 border border-white/5 rounded-full px-3 py-1">
            <CloudSun size={14} className="text-primary" />
            <span>24°C • {t('canopy_open')}</span>
          </div>

          {/* Syncing Language Selector in Header */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2 py-1">
            <Globe size={13} className="text-gray-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'es' | 'fr' | 'de' | 'pt')}
              className="bg-transparent border-none text-[11px] font-bold focus:outline-none text-gray-300 cursor-pointer pr-1"
            >
              <option value="en" className="bg-darkBg">English</option>
              <option value="es" className="bg-darkBg">Español</option>
              <option value="fr" className="bg-darkBg">Français</option>
              <option value="de" className="bg-darkBg">Deutsch</option>
              <option value="pt" className="bg-darkBg">Português</option>
            </select>
          </div>

          {/* Quick Bypass Role Selector */}
          <div className="relative">
            <button 
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              className="flex items-center gap-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-3 py-1.5 rounded-full font-bold transition-all"
            >
              <UserCheck size={14} />
              {t('role')}: <span className="uppercase">{user?.role}</span>
            </button>
            
            <AnimatePresence>
              {showRoleSelector && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowRoleSelector(false)}></div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-darkBg-card border border-darkBg-border rounded-xl shadow-2xl p-2 z-50 glass-panel"
                  >
                    <p className="text-[10px] uppercase font-bold text-gray-500 px-3 py-1">{t('simulate_user')}</p>
                    <button 
                      onClick={() => { bypassLogin('fan'); setShowRoleSelector(false); }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between ${user?.role === 'fan' ? 'text-primary font-bold' : 'text-gray-300'}`}
                    >
                      {t('fan_view')}
                    </button>
                    <button 
                      onClick={() => { bypassLogin('staff'); setShowRoleSelector(false); }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between ${user?.role === 'staff' ? 'text-primary font-bold' : 'text-gray-300'}`}
                    >
                      {t('staff_view')}
                    </button>
                    <button 
                      onClick={() => { bypassLogin('admin'); setShowRoleSelector(false); }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between ${user?.role === 'admin' ? 'text-primary font-bold' : 'text-gray-300'}`}
                    >
                      {t('admin_view')}
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-bold uppercase">
              {user?.displayName ? user.displayName.slice(0, 2) : 'FC'}
            </div>
            <span className="hidden sm:inline text-xs font-bold">{user?.displayName}</span>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex-1 flex relative">
        {/* Sidebar (Desktop) */}
        <aside className="w-64 border-r border-white/5 hidden md:flex flex-col bg-darkBg justify-between p-4 shrink-0">
          <div>
            <nav className="flex flex-col gap-1">
              <p className="text-[10px] uppercase font-black tracking-wider text-gray-500 px-3 mb-2">OPERATIONAL DASHBOARDS</p>
              {menuItems.map(item => {
                if (item.roles && !item.roles.includes(user?.role || 'fan')) return null;
                const Icon = item.icon;
                const isActive = path === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all font-semibold ${
                      isActive 
                        ? 'bg-primary text-black font-black shadow-lg shadow-primary/20' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Developer card at bottom of items list */}
            <DeveloperCard />
          </div>

          <div className="flex flex-col gap-2">
            <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center text-xs">
              <p className="text-gray-500 font-bold">{t('status')}</p>
              <p className={`font-black uppercase tracking-wider mt-1 ${evacuationActive ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                {evacuationActive ? t('evacuating') : t('secure')}
              </p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full font-semibold"
            >
              <LogOut size={18} />
              {t('sign_out')}
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 bottom-0 w-72 bg-darkBg border-r border-white/5 z-50 p-4 md:hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-black text-lg">StadiumMind <span className="text-primary">AI</span></span>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <nav className="flex flex-col gap-1.5">
                    {menuItems.map(item => {
                      if (item.roles && !item.roles.includes(user?.role || 'fan')) return null;
                      const Icon = item.icon;
                      const isActive = path === item.path;
                      return (
                        <button
                          key={item.path}
                          onClick={() => handleNavigation(item.path)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all font-semibold ${
                            isActive 
                              ? 'bg-primary text-black font-black shadow-lg' 
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Icon size={18} />
                          {item.label}
                        </button>
                      );
                    })}
                  </nav>
                  
                  {/* Developer Card for Mobile */}
                  <DeveloperCard />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full font-semibold"
                  >
                    <LogOut size={18} />
                    {t('sign_out')}
                  </button>
                  <p className="text-[10px] text-gray-500 text-center">© {currentYear} StadiumMind AI. FIFA World Cup 2026.</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Content Panel */}
        <main className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto gap-4 relative min-w-0 bg-darkBg">
          <AlertBanner />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
