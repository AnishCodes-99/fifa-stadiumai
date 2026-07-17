import React from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  Leaf, 
  Zap, 
  Recycle, 
  Award, 
  CheckCircle,
  QrCode
} from 'lucide-react';

export const SustainabilityDashboard: React.FC = () => {
  const { ecoChallenges, ecoPoints, completeChallenge } = useStadiumState();
  const { t } = useLanguage();

  const energyData = [
    { hour: '16:00', Grid: 1400, Solar: 620 },
    { hour: '17:00', Grid: 1650, Solar: 580 },
    { hour: '18:00', Grid: 2100, Solar: 410 },
    { hour: '19:00', Grid: 2800, Solar: 200 },
    { hour: '20:00', Grid: 3200, Solar: 50 },
  ];

  const wasteData = [
    { match: 'Match 1', Recycled: 12.4, General: 18.2 },
    { match: 'Match 2', Recycled: 14.8, General: 16.5 },
    { match: 'Match 3', Recycled: 18.9, General: 15.1 },
    { match: 'USA-MEX', Recycled: 22.1, General: 12.8 },
  ];

  const handleClaimReward = (id: string) => {
    completeChallenge(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('sus_title')}</h2>
        <p className="text-sm text-gray-400">{t('sus_subtitle')}</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Eco points scoreboard */}
        <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-xl pointer-events-none"></div>
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-extrabold text-sm tracking-tight flex items-center gap-2">
                <Award size={16} className="text-emerald-400" /> {t('sus_score')}
              </h4>
              <span className="text-[10px] text-gray-500 font-mono">Rank: #1,452</span>
            </div>
            <p className="text-4xl font-black text-emerald-400 tracking-tight">{ecoPoints} <span className="text-xs text-gray-500 font-bold uppercase">{t('sus_points')}</span></p>
          </div>
          <div className="border-t border-white/5 pt-3 mt-2 text-xs text-gray-400 flex justify-between items-center">
            <span>{t('sus_next_reward')}</span>
            <button className="text-primary hover:underline font-bold">{t('sus_redeem')}</button>
          </div>
        </div>

        {/* Solar yield stat */}
        <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 flex flex-col justify-between min-h-[160px]">
          <div>
            <h4 className="font-extrabold text-sm mb-3 tracking-tight flex items-center gap-2">
              <Zap size={16} className="text-emerald-400" /> {t('sus_canopy_yield')}
            </h4>
            <p className="text-3xl font-black text-white">410 kW</p>
            <p className="text-xs text-gray-400 mt-1">{t('sus_canopy_desc')}</p>
          </div>
          <div className="border-t border-white/5 pt-3 mt-2 text-xs text-gray-500 flex justify-between">
            <span>{t('sus_grid_power')}: 2,100 kW</span>
            <span>{t('sus_offset')}</span>
          </div>
        </div>

        {/* Recycling target */}
        <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 flex flex-col justify-between min-h-[160px]">
          <div>
            <h4 className="font-extrabold text-sm mb-3 tracking-tight flex items-center gap-2">
              <Recycle size={16} className="text-emerald-400" /> {t('sus_recycle_target')}
            </h4>
            <p className="text-3xl font-black text-white">63.3%</p>
            <p className="text-xs text-gray-400 mt-1">{t('sus_recycle_desc')}</p>
          </div>
          <div className="border-t border-white/5 pt-3 mt-2 text-xs text-gray-500 flex justify-between">
            <span>{t('sus_recycle_vending')}: 2,450 drops</span>
            <span className="text-emerald-400 font-bold flex items-center gap-0.5"><CheckCircle size={12} /> {t('sus_recycle_exceeding')}</span>
          </div>
        </div>
      </div>

      {/* Challenges & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Fan Challenges */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5">
            <h4 className="font-extrabold text-sm mb-4 tracking-tight flex items-center gap-2">
              <Leaf size={16} className="text-emerald-400" /> {t('sus_challenges')}
            </h4>

            <div className="space-y-3">
              {ecoChallenges.map(ch => (
                <div key={ch.id} className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase px-2 py-0.5 rounded">
                        +{ch.points} PTS
                      </span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase">{ch.category}</span>
                    </div>
                    <h5 className="font-bold text-sm">{ch.title}</h5>
                    <p className="text-xs text-gray-400 mt-0.5">{ch.description}</p>
                  </div>

                  <div className="shrink-0">
                    {ch.completed ? (
                      <span className="bg-emerald-500 text-black font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-500/15">
                        <CheckCircle size={14} /> {t('sus_completed')}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleClaimReward(ch.id)}
                        className="bg-primary hover:bg-primary-hover text-black font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-lg shadow-primary/10"
                      >
                        <QrCode size={14} /> {t('sus_claim_pts')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Energy usage */}
          <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5">
            <h4 className="font-extrabold text-sm mb-4 tracking-tight flex items-center gap-2">
              <Zap size={16} className="text-emerald-400" /> {t('sus_solar_integration')}
            </h4>
            <div className="h-64 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="hour" stroke="#52525b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#52525b" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#16161A', borderColor: 'rgba(255,255,255,0.08)' }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="Grid" stroke="#FF6B00" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Solar" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Waste management */}
        <div className="space-y-6">
          <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h4 className="font-extrabold text-sm mb-4 tracking-tight flex items-center gap-2">
                <Recycle size={16} className="text-emerald-400" /> {t('sus_waste_analytics')}
              </h4>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wasteData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                    <XAxis dataKey="match" stroke="#52525b" fontSize={10} tickLine={false} />
                    <YAxis stroke="#52525b" fontSize={10} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#16161A', borderColor: 'rgba(255,255,255,0.08)' }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="Recycled" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="General" fill="#3f3f46" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Leaderboard info */}
          <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5">
            <h4 className="font-extrabold text-sm mb-3 tracking-tight flex items-center gap-2">
              <Award size={16} className="text-emerald-400" /> {t('sus_leaderboard')}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="font-bold text-gray-300">1. Lionel M.</span>
                <span className="text-emerald-400 font-mono font-bold">1,250 pts</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="font-bold text-gray-300">2. Kylian M.</span>
                <span className="text-emerald-400 font-mono font-bold">1,100 pts</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="font-bold text-gray-300">3. Erling H.</span>
                <span className="text-emerald-400 font-mono font-bold">950 pts</span>
              </div>
              <div className="flex justify-between items-center py-1.5 text-primary font-bold">
                <span>{t('sus_you')}</span>
                <span className="font-mono">{ecoPoints} pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
