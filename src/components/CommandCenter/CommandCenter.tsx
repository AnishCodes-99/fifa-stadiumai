import React, { useEffect, useRef, useState } from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Shield, 
  Activity, 
  Lock, 
  Unlock, 
  Radio, 
  Play,
  Square
} from 'lucide-react';

const CCTVFeed = ({ cameraName, index }: { cameraName: string; index: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    for (let i = 0; i < 8; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 6 + 4
      });
    }

    const draw = () => {
      ctx.fillStyle = '#0f1115';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(0, 255, 100, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      const scanLineY = (Date.now() / 25) % canvas.height;
      ctx.fillRect(0, scanLineY, canvas.width, 2);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.strokeStyle = 'rgba(0, 255, 100, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);

        ctx.fillStyle = 'rgba(0, 255, 100, 0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(0, 255, 100, 0.8)';
        ctx.font = '8px monospace';
        ctx.fillText('96.8% Fan', p.x - p.size, p.y - p.size - 2);
      });

      ctx.fillStyle = '#ff6b00';
      ctx.font = '9px monospace';
      ctx.fillText(`CAM_${100 + index} [LIVE]`, 10, 20);

      ctx.fillStyle = '#9ca3af';
      ctx.fillText(new Date().toLocaleTimeString(), canvas.width - 70, 20);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, index]);

  return (
    <div className="bg-black/90 rounded-xl overflow-hidden border border-white/5 relative group">
      <canvas ref={canvasRef} className="w-full h-40 object-cover" width={320} height={160} />
      <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[9px] font-mono tracking-tight text-white flex items-center gap-1">
        <Radio size={10} className="text-red-500 animate-pulse" /> {cameraName}
      </div>
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 p-1.5 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isPlaying ? <Square size={10} /> : <Play size={10} />}
      </button>
    </div>
  );
};

export const CommandCenter: React.FC = () => {
  const { 
    incidents, 
    updateIncidentStatus, 
    resolveIncident, 
    facilities, 
    toggleGateStatus,
    stadiumLogs,
    addIncident
  } = useStadiumState();

  const { t } = useLanguage();
  const [newIncidentTitle, setNewIncidentTitle] = useState('');
  const [newIncidentLocation, setNewIncidentLocation] = useState('');
  const [newIncidentSeverity, setNewIncidentSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('low');

  const gates = facilities.filter(f => f.type === 'gate');
  const activeIncidents = incidents.filter(inc => inc.status !== 'resolved');

  const handleDispatch = (id: string, status: 'dispatching' | 'on-scene') => {
    updateIncidentStatus(id, status);
  };

  const handleResolve = (id: string) => {
    resolveIncident(id);
  };

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncidentTitle || !newIncidentLocation) return;
    
    const lat = 40.8135 + (Math.random() - 0.5) * 0.003;
    const lng = -74.0744 + (Math.random() - 0.5) * 0.003;

    addIncident(
      newIncidentSeverity === 'critical' ? 'security' : 'facility',
      newIncidentTitle,
      newIncidentLocation,
      newIncidentSeverity,
      [lat, lng]
    );

    setNewIncidentTitle('');
    setNewIncidentLocation('');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('cc_title')}</h2>
        <p className="text-sm text-gray-400">{t('cc_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CCTV grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5">
            <h4 className="font-extrabold text-sm mb-4 tracking-tight flex items-center gap-2">
              <Activity size={16} className="text-primary" /> {t('cc_threat')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CCTVFeed cameraName="North Concourse A" index={1} />
              <CCTVFeed cameraName="East Gate B Ingress" index={2} />
              <CCTVFeed cameraName="South Gate C Lift" index={3} />
              <CCTVFeed cameraName="Field Level West" index={4} />
            </div>
          </div>

          {/* Incidents Dispatch */}
          <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5">
            <h4 className="font-extrabold text-sm mb-4 tracking-tight flex items-center gap-2">
              <Shield size={16} className="text-primary" /> {t('cc_active')}
            </h4>

            {activeIncidents.length > 0 ? (
              <div className="space-y-3">
                {activeIncidents.map(inc => (
                  <div key={inc.id} className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                          inc.severity === 'critical' ? 'bg-red-500 text-black animate-pulse' :
                          inc.severity === 'high' ? 'bg-red-500/10 text-red-400' :
                          inc.severity === 'medium' ? 'bg-orange-500/10 text-orange-400' :
                          'bg-blue-500/10 text-blue-400'
                        }`}>
                          {inc.severity}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">{inc.timestamp}</span>
                      </div>
                      <h5 className="font-bold text-sm">{inc.title}</h5>
                      <p className="text-xs text-gray-400 mt-0.5">Loc: {inc.location}</p>
                      <p className="text-[10px] text-gray-500 mt-1 font-semibold">Staff: {inc.assignedStaff}</p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      {inc.status === 'reported' && (
                        <button
                          onClick={() => handleDispatch(inc.id, 'dispatching')}
                          className="bg-primary hover:bg-primary-hover text-black font-bold text-xs px-3.5 py-2 rounded-xl transition-colors"
                        >
                          {t('cc_dispatch')}
                        </button>
                      )}
                      {inc.status === 'dispatching' && (
                        <button
                          onClick={() => handleDispatch(inc.id, 'on-scene')}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors"
                        >
                          {t('cc_confirm')}
                        </button>
                      )}
                      {inc.status === 'on-scene' && (
                        <button
                          onClick={() => handleResolve(inc.id)}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors"
                        >
                          {t('cc_resolve')}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/[0.01] border border-dashed border-white/5 rounded-xl py-8 text-center text-gray-500 text-xs font-semibold">
                {t('cc_no_incidents')}
              </div>
            )}
          </div>
        </div>

        {/* Dispatch Controls (Right) */}
        <div className="space-y-6">
          <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5">
            <h4 className="font-extrabold text-sm mb-3 tracking-tight flex items-center gap-2">
              <Lock size={16} className="text-primary" /> {t('cc_gate_lock')}
            </h4>
            <p className="text-xs text-gray-400 leading-normal mb-4">
              {t('cc_lock_desc')}
            </p>
            <div className="space-y-2.5">
              {gates.map(gate => (
                <div key={gate.id} className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-200">{gate.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-mono">{t('status')}: {gate.status}</p>
                  </div>
                  <button
                    onClick={() => toggleGateStatus(gate.id)}
                    className={`p-2 rounded-lg border transition-all ${
                      gate.status === 'closed'
                        ? 'bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20'
                        : 'bg-green-500/10 border-green-500/40 text-green-400 hover:bg-green-500/20'
                    }`}
                  >
                    {gate.status === 'closed' ? <Lock size={14} /> : <Unlock size={14} />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5">
            <h4 className="font-extrabold text-sm mb-3 tracking-tight flex items-center gap-2">
              <Radio size={16} className="text-primary" /> {t('cc_report_alarm')}
            </h4>
            <form onSubmit={handleCreateIncident} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">{t('cc_alarm_title')}</label>
                <input
                  type="text"
                  required
                  value={newIncidentTitle}
                  onChange={(e) => setNewIncidentTitle(e.target.value)}
                  placeholder="e.g. Broken water valve"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50 text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">{t('cc_alarm_loc')}</label>
                <input
                  type="text"
                  required
                  value={newIncidentLocation}
                  onChange={(e) => setNewIncidentLocation(e.target.value)}
                  placeholder="e.g. Section 112 Restroom"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50 text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">{t('cc_alarm_severity')}</label>
                <select
                  value={newIncidentSeverity}
                  onChange={(e) => setNewIncidentSeverity(e.target.value as any)}
                  className="w-full bg-darkBg border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50 text-gray-300"
                >
                  <option value="low">Low (Info)</option>
                  <option value="medium">Medium (Caution)</option>
                  <option value="high">High (Danger)</option>
                  <option value="critical">Critical (SOS)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold py-2 rounded-xl text-xs transition-all mt-2"
              >
                {t('cc_alarm_log_btn')}
              </button>
            </form>
          </div>

          <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5">
            <h4 className="font-extrabold text-sm mb-3 tracking-tight flex items-center gap-2">
              <Activity size={16} className="text-primary" /> {t('cc_logs')}
            </h4>
            <div className="h-40 overflow-y-auto space-y-2 border border-white/5 rounded-xl p-3 bg-black/20 font-mono text-[10px]">
              {stadiumLogs.map((log, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-gray-500 shrink-0">{log.time}</span>
                  <span className={
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'warn' ? 'text-orange-400' :
                    log.type === 'success' ? 'text-green-400' : 'text-gray-300'
                  }>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
