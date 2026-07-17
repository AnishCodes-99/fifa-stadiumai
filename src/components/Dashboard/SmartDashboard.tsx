import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useStadiumState } from '../../context/StadiumStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area
} from 'recharts';
import { 
  Clock, 
  Accessibility, 
  Compass, 
  CloudRain, 
  Flame,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const SmartDashboard: React.FC = () => {
  const { navigate } = useRouter();
  const { matchDetails, facilities, transportOptions } = useStadiumState();
  const { t } = useLanguage();

  const ingressData = [
    { time: '16:00', fans: 12000 },
    { time: '17:00', fans: 28000 },
    { time: '18:00', fans: 55000 },
    { time: '19:00', fans: 78000 },
    { time: '19:30', fans: 82500 },
  ];

  const gates = facilities.filter(f => f.type === 'gate');
  const sortedGates = [...gates].sort((a, b) => (a.waitTimeMinutes || 0) - (b.waitTimeMinutes || 0));
  const fastestGate = sortedGates[0];

  return (
    <div className="space-y-6">
      {/* Top Welcome Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('dashboard_title')}</h2>
          <p className="text-sm text-gray-400">{t('dashboard_subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate('/map')}
            className="bg-primary text-black font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-primary/10 hover:bg-primary-hover"
          >
            <Compass size={14} /> {t('map')}
          </button>
          <button 
            onClick={() => navigate('/ai')}
            className="bg-white/5 border border-white/10 hover:border-white/20 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
          >
            {t('ai_assistant')}
          </button>
        </div>
      </div>

      {/* Grid Layout (Top Widgets) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Match Ticker Widget */}
        <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[180px]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] uppercase font-black tracking-widest text-primary border border-primary/20 px-2 py-0.5 rounded flex items-center gap-1">
                <Flame size={10} /> FIFA World Cup 2026
              </span>
              <span className="text-[10px] text-gray-500 font-mono">MetLife Stadium</span>
            </div>

            <div className="flex justify-center items-center gap-4 py-2">
              <div className="text-center flex-1">
                <p className="text-lg font-black">{matchDetails.homeTeam}</p>
                <p className="text-[10px] text-gray-500 font-bold">{t('home')}</p>
              </div>
              <div className="bg-black/35 px-4 py-2 rounded-xl border border-white/5 text-center shrink-0">
                <p className="text-2xl font-black tracking-wider text-primary">
                  {matchDetails.homeScore} - {matchDetails.awayScore}
                </p>
                <p className="text-[9px] font-mono text-gray-400 mt-0.5">{matchDetails.timePlayed}'</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-lg font-black">{matchDetails.awayTeam}</p>
                <p className="text-[10px] text-gray-500 font-bold">{t('away')}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/5 mt-2">
            <span>{t('attendance')}: {matchDetails.attendance.toLocaleString()}</span>
            <span>{t('possession')}: {matchDetails.possessionHome}% - {matchDetails.possessionAway}%</span>
          </div>
        </div>

        {/* Queue Wait Times Recommendations */}
        <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 flex flex-col justify-between min-h-[180px]">
          <div>
            <h4 className="font-extrabold text-sm mb-3 tracking-tight flex items-center gap-2">
              <Clock size={16} className="text-primary" /> {t('bottlenecks')}
            </h4>
            
            <div className="grid grid-cols-2 gap-2">
              {gates.slice(0, 4).map(g => (
                <div key={g.id} className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-300">{g.name.split(' ')[2]}</p>
                    <p className="text-[10px] text-gray-500">{t('wait_time')}</p>
                  </div>
                  <span className={`text-xs font-mono font-black ${
                    (g.waitTimeMinutes || 0) < 10 ? 'text-green-400' :
                    (g.waitTimeMinutes || 0) < 20 ? 'text-orange-400' : 'text-red-400'
                  }`}>
                    {g.waitTimeMinutes}m
                  </span>
                </div>
              ))}
            </div>
          </div>

          {fastestGate && (
            <div className="mt-3 bg-primary/10 border border-primary/20 rounded-xl p-2.5 flex items-center justify-between text-xs text-primary">
              <span className="font-semibold">{t('recommended')}: {fastestGate.name}</span>
              <span className="font-bold flex items-center gap-0.5">Enter <ArrowRight size={12} /></span>
            </div>
          )}
        </div>

        {/* Live Weather & Canopy Status */}
        <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 flex flex-col justify-between min-h-[180px]">
          <div>
            <h4 className="font-extrabold text-sm mb-3 tracking-tight flex items-center gap-2">
              <CloudRain size={16} className="text-primary" /> {t('weather_title')}
            </h4>
            <div className="flex items-center gap-4 py-2">
              <span className="text-4xl font-black text-white">{matchDetails.temperature}°C</span>
              <div>
                <p className="text-xs font-bold text-gray-300">{t('clear_sky')}</p>
                <p className="text-[10px] text-gray-500">Wind: 8 km/h • Hum: 42%</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 border-t border-white/5 pt-3 mt-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">{t('solar_canopy')}</span>
              <span className="text-green-400 font-bold uppercase">OPEN</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">{t('precipitation')}</span>
              <span className="font-mono">5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Transit Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Entry Analytics Chart (Left) */}
        <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-extrabold text-sm tracking-tight flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" /> {t('occupancy_curve')}
              </h4>
              <p className="text-[10px] text-gray-500">{t('occupancy_sub')}</p>
            </div>
            <span className="text-xs bg-white/5 px-2.5 py-1 rounded border border-white/5 text-gray-300 font-mono">
              Peak: 82,500
            </span>
          </div>

          <div className="h-64 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ingressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#52525b" fontSize={11} tickLine={false} />
                <YAxis stroke="#52525b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#16161A', borderColor: 'rgba(255,255,255,0.08)' }} 
                  labelStyle={{ color: '#FF6B00', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="fans" stroke="#FF6B00" strokeWidth={3} fillOpacity={1} fill="url(#colorFans)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Public Transport Guidance (Right) */}
        <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="font-extrabold text-sm mb-4 tracking-tight flex items-center gap-2">
              <Compass size={16} className="text-primary" /> {t('transit_guide')}
            </h4>
            
            <div className="space-y-3">
              {transportOptions.slice(0, 3).map(opt => (
                <div key={opt.id} className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-gray-200">{opt.name}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      opt.status === 'on-time' ? 'bg-green-500/10 text-green-400' :
                      opt.status === 'delayed' ? 'bg-orange-500/10 text-orange-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {opt.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{t('destination')}: {opt.destination}</span>
                    <span className="text-gray-300 font-bold">{t('departs')}: {opt.nextDeparture}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 bg-white/[0.01] border border-white/5 rounded-xl p-3 flex items-start gap-2">
            <Accessibility size={16} className="text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-400 leading-normal">
              {t('ada_notice')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
