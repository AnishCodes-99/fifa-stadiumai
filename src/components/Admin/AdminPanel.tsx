import React, { useState } from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Settings, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Plus, 
  Gamepad2, 
  Radio, 
  Wifi, 
  Cpu
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    matchDetails, 
    incrementMatchScore, 
    evacuationActive, 
    setEvacuationActive, 
    triggerSOS, 
    addLog 
  } = useStadiumState();

  const { t } = useLanguage();
  const [sensorMultiplier, setSensorMultiplier] = useState<number>(1.0);
  const [telemetryFrequency, setTelemetryFrequency] = useState<number>(5);

  const handleScoreHome = () => {
    incrementMatchScore('home');
  };

  const handleScoreAway = () => {
    incrementMatchScore('away');
  };

  const handleEvacToggle = () => {
    const nextState = !evacuationActive;
    setEvacuationActive(nextState);
    addLog(
      nextState 
        ? "ADMIN: Stadium-wide evacuation broadcast enabled." 
        : "ADMIN: Stadium-wide evacuation broadcast stood down.",
      nextState ? 'error' : 'success'
    );
  };

  const handleSOSTrigger = () => {
    const lat = 40.8135 + (Math.random() - 0.5) * 0.002;
    const lng = -74.0744 + (Math.random() - 0.5) * 0.002;
    triggerSOS([lat, lng]);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('control_center')}</h2>
        <p className="text-sm text-gray-400">Administrative dashboard to override telemetry, adjust scores, and trigger emergency drills.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Match score controllers */}
        <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>
          <div>
            <h4 className="font-extrabold text-sm mb-3 tracking-tight flex items-center gap-2">
              <Gamepad2 size={16} className="text-primary" /> Live Match Score Override
            </h4>
            <p className="text-xs text-gray-400 leading-normal mb-4">
              Manually increment goals to trigger score ticks in the headers.
            </p>

            <div className="flex gap-4 items-center justify-around bg-black/25 rounded-xl p-3 border border-white/5">
              <div className="text-center">
                <p className="text-sm font-bold text-gray-300">{matchDetails.homeTeam}</p>
                <p className="text-2xl font-black text-white mt-1">{matchDetails.homeScore}</p>
                <button
                  onClick={handleScoreHome}
                  className="mt-2 bg-primary hover:bg-primary-hover text-black font-extrabold text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus size={10} /> Add Goal
                </button>
              </div>
              
              <div className="h-10 w-[1px] bg-white/5"></div>

              <div className="text-center">
                <p className="text-sm font-bold text-gray-300">{matchDetails.awayTeam}</p>
                <p className="text-2xl font-black text-white mt-1">{matchDetails.awayScore}</p>
                <button
                  onClick={handleScoreAway}
                  className="mt-2 bg-primary hover:bg-primary-hover text-black font-extrabold text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus size={10} /> Add Goal
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-[10px] text-gray-500 text-center mt-2">Score adjustments propagate immediately to all fan accounts.</p>
        </div>

        {/* Emergency Drills Override */}
        <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 flex flex-col justify-between min-h-[220px]">
          <div>
            <h4 className="font-extrabold text-sm mb-3 tracking-tight flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={16} /> Broadcast Emergency Override
            </h4>
            <p className="text-xs text-gray-400 leading-normal mb-4">
              Initiate full stadium evacuation protocols. This unlocks exits and displays alert banner.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleEvacToggle}
                className={`w-full py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                  evacuationActive
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/10'
                    : 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/10'
                }`}
              >
                {evacuationActive ? (
                  <>
                    <VolumeX size={14} /> Stand Down Evacuation
                  </>
                ) : (
                  <>
                    <Volume2 size={14} /> Trigger Evacuation
                  </>
                )}
              </button>

              <button
                onClick={handleSOSTrigger}
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/10"
              >
                <Radio size={14} /> Simulate SOS Distress Beacon
              </button>
            </div>
          </div>
          
          <p className="text-[10px] text-gray-500 text-center mt-2">Emergency states lock/unlock digital doors dynamically.</p>
        </div>

        {/* IoT parameters sliders */}
        <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 flex flex-col justify-between min-h-[220px]">
          <div>
            <h4 className="font-extrabold text-sm mb-3 tracking-tight flex items-center gap-2">
              <Cpu size={16} className="text-primary" /> IoT Gate Telemetry Config
            </h4>
            <p className="text-xs text-gray-400 leading-normal mb-3">
              Modify sensor multipliers to simulate queue bottlenecks.
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 font-bold">Queue Bottleneck Multiplier</span>
                  <span className="text-primary font-bold font-mono">{sensorMultiplier.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={sensorMultiplier}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setSensorMultiplier(val);
                    addLog(`ADMIN: Queue telemetry bottleneck multiplier set to ${val.toFixed(1)}x.`, 'info');
                  }}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 font-bold">Sensor Heartbeat Rate</span>
                  <span className="text-primary font-bold font-mono">{telemetryFrequency}s</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={telemetryFrequency}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setTelemetryFrequency(val);
                    addLog(`ADMIN: IoT heartbeat interval set to ${val} seconds.`, 'info');
                  }}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 justify-center mt-2 text-[10px] text-green-400 font-bold">
            <Wifi size={12} className="animate-pulse" /> Telemetry nodes connected: 12/12
          </div>
        </div>
      </div>

      {/* System config details */}
      <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5">
        <h4 className="font-extrabold text-sm mb-3 tracking-tight flex items-center gap-2">
          <Settings size={16} className="text-primary" /> {t('control_center')} Info
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/5 border border-white/5 rounded-xl p-3">
            <p className="text-gray-500 font-bold">Firestore Database</p>
            <p className="font-extrabold text-white mt-1">CONNECTED (MOCK/LOCAL)</p>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-3">
            <p className="text-gray-500 font-bold">Gemini AI Client</p>
            <p className="font-extrabold text-white mt-1">STANDBY (MOCK/LOCAL)</p>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-3">
            <p className="text-gray-500 font-bold">Leaflet Engine</p>
            <p className="font-extrabold text-white mt-1">ONLINE (v1.9.4)</p>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-3">
            <p className="text-gray-500 font-bold">Framer Motion Renderer</p>
            <p className="font-extrabold text-white mt-1">ENABLED (WebGL)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
