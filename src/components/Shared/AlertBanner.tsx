import React from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { AlertOctagon, ShieldAlert } from 'lucide-react';

export const AlertBanner: React.FC = () => {
  const { evacuationActive, activeSOS, clearSOS } = useStadiumState();
  const { t } = useLanguage();

  if (!evacuationActive && !activeSOS.active) return null;

  return (
    <div className="w-full flex flex-col gap-2 z-50">
      {evacuationActive && (
        <div className="bg-red-950/80 border border-red-500 text-red-200 px-4 py-3 rounded-lg shadow-2xl flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-red-500 h-6 w-6 animate-bounce" />
            <div>
              <p className="font-extrabold text-sm tracking-wider uppercase">{t('alert_evac_title')}</p>
              <p className="text-xs text-red-300">
                {t('alert_evac_desc')}
              </p>
            </div>
          </div>
          <span className="bg-red-500 text-black font-black text-xs px-2.5 py-1 rounded">EVACUATION</span>
        </div>
      )}

      {activeSOS.active && (
        <div className="bg-orange-950/80 border border-orange-500 text-orange-200 px-4 py-3 rounded-lg shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertOctagon className="text-orange-500 h-6 w-6 animate-spin-slow" />
            <div>
              <p className="font-extrabold text-sm tracking-wider uppercase">{t('alert_sos_title')}</p>
              <p className="text-xs text-orange-300">
                {t('alert_sos_desc')}
              </p>
            </div>
          </div>
          <button 
            onClick={clearSOS} 
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs px-3 py-1 rounded transition-colors"
          >
            {t('alert_sos_clear')}
          </button>
        </div>
      )}
    </div>
  );
};
