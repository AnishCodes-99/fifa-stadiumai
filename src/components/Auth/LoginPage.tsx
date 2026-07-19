import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Flame, Lock, Mail, User, Eye, EyeOff } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, register, bypassLogin } = useAuth();
  const { t } = useLanguage();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

        try {
      if (isRegister) {
        await register(email, password, name);
      } else {
        await login(email, password);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed. Please verify credentials.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white flex items-center justify-center relative px-4">
      {/* Glow Orbs */}
      <div className="absolute top-[20%] left-[20%] w-[35%] h-[35%] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[20%] w-[35%] h-[35%] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-darkBg-card border border-darkBg-border rounded-2xl p-6 md:p-8 shadow-2xl glass-panel relative z-10">
        
        {/* Brand Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary px-3.5 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase mb-3">
            <Flame size={12} className="animate-pulse" /> FIFA World Cup 2026
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">StadiumMind <span className="text-primary">AI</span></h2>
          <p className="text-xs text-gray-400 mt-1">Smart Stadium Intelligence Platform</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl mb-4 font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">{t('auth_fullname')}</label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-gray-500"><User size={16} /></span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Diego Maradona"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">{t('auth_email')}</label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-gray-500"><Mail size={16} /></span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="fan@stadiummind.ai"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">{t('auth_password')}</label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-gray-500"><Lock size={16} /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-primary/50 text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-black font-black py-3 rounded-xl transition-all shadow-xl shadow-primary/20 mt-2 text-sm"
          >
            {loading ? t('auth_processing') : isRegister ? t('auth_register') : t('auth_signin')}
          </button>
        </form>

        {/* Toggle switch */}
        <div className="text-center mt-6 text-xs">
          <button 
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isRegister ? t('auth_toggle_login') : t('auth_toggle_create')}
          </button>
        </div>

        {/* Bypass Access */}
        <div className="mt-8 border-t border-white/5 pt-6">
          <p className="text-[10px] font-black uppercase text-gray-500 text-center tracking-wider mb-3.5">
            {t('auth_bypass')}
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => bypassLogin('fan')}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white py-2 rounded-xl text-[10px] font-bold transition-all text-center uppercase"
            >
              ⚽ Fan
            </button>
            <button
              onClick={() => bypassLogin('staff')}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white py-2 rounded-xl text-[10px] font-bold transition-all text-center uppercase"
            >
              🛡️ Staff
            </button>
            <button
              onClick={() => bypassLogin('admin')}
              className="bg-primary/15 hover:bg-primary/20 border border-primary/20 text-primary py-2 rounded-xl text-[10px] font-bold transition-all text-center uppercase"
            >
              ⚙️ Admin
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
