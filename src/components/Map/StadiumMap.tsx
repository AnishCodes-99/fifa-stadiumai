import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useStadiumState } from '../../context/StadiumStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { FacilityMarker } from '../../types/stadium';
import { 
  Navigation, 
  Accessibility, 
  AlertTriangle, 
  MapPin, 
  Timer
} from 'lucide-react';

const MapFocusController = ({ selectedFacility }: { selectedFacility: FacilityMarker | null }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedFacility) {
      map.setView(selectedFacility.coordinates, 17, { animate: true, duration: 1 });
    }
  }, [selectedFacility, map]);
  return null;
};

export const StadiumMap: React.FC = () => {
  const { 
    facilities, 
    selectedFacility, 
    setSelectedFacility, 
    activeRoute, 
    activeRouteDetails,
    setActiveRoute,
    evacuationActive
  } = useStadiumState();

  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const centerCoordinates: [number, number] = [40.8135, -74.0744];

  const createFacilityIcon = (facility: FacilityMarker) => {
    const isSelected = selectedFacility?.id === facility.id;
    let color = '#3B82F6';

    if (facility.status === 'closed') {
      color = '#ef4444';
    } else if (facility.status === 'congested') {
      color = '#FF6B00';
    } else {
      switch (facility.type) {
        case 'gate': color = '#FF6B00'; break;
        case 'parking': color = '#10B981'; break;
        case 'medical': color = '#ef4444'; break;
        case 'food': color = '#F59E0B'; break;
        case 'restroom': color = '#8B5CF6'; break;
        case 'exit': color = '#ec4899'; break;
        default: color = '#9CA3AF';
      }
    }

    const borderStyle = isSelected ? 'border: 3px solid #fff; box-shadow: 0 0 15px #FF6B00;' : 'border: 2px solid rgba(255,255,255,0.7);';
    const size = isSelected ? 32 : 24;

    const initials = facility.type === 'gate' ? 'G' : 
                     facility.type === 'parking' ? 'P' :
                     facility.type === 'medical' ? 'M' :
                     facility.type === 'food' ? 'F' :
                     facility.type === 'restroom' ? 'W' : 'E';

    return L.divIcon({
      html: `
        <div style="background-color: ${color}; ${borderStyle} width: ${size}px; height: ${size}px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: ${isSelected ? '12' : '10'}px; font-weight: 900; color: #000; transition: all 0.2s ease;">
          ${initials}
        </div>
      `,
      className: 'custom-map-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  };

  const handleCalculateRoute = (target: FacilityMarker, mode: 'standard' | 'wheelchair') => {
    const userLoc: [number, number] = [40.8120, -74.0768];
    const targetLoc = target.coordinates;

    let routeCoords: [number, number][] = [];
    let distance = '480 m';
    let duration = '6 mins';

    if (mode === 'wheelchair') {
      const midPoint1: [number, number] = [userLoc[0] + 0.0003, userLoc[1]];
      const midPoint2: [number, number] = [midPoint1[0], targetLoc[1] - 0.0005];
      routeCoords = [userLoc, midPoint1, midPoint2, targetLoc];
      distance = '620 m';
      duration = '9 mins (ADA)';
    } else {
      const midPoint: [number, number] = [userLoc[0] + (targetLoc[0] - userLoc[0]) * 0.5, userLoc[1] + (targetLoc[1] - userLoc[1]) * 0.5];
      routeCoords = [userLoc, midPoint, targetLoc];
      distance = '410 m';
      duration = '5 mins';
    }

    setActiveRoute(routeCoords, {
      distance,
      duration,
      type: mode === 'wheelchair' ? t('ada_route') : t('direct_path')
    });
  };

  const filteredFacilities = facilities.filter(fac => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'evac') return fac.type === 'exit' || fac.type === 'gate';
    return fac.type === activeFilter;
  });

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6 h-full min-h-[500px]">
      {/* Map Content */}
      <div className="flex-1 rounded-2xl overflow-hidden border border-darkBg-border relative h-[450px] lg:h-auto shadow-2xl">
        <MapContainer 
          center={centerCoordinates} 
          zoom={16} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {filteredFacilities.map(fac => (
            <Marker 
              key={fac.id} 
              position={fac.coordinates} 
              icon={createFacilityIcon(fac)}
              eventHandlers={{
                click: () => {
                  setSelectedFacility(fac);
                  setActiveRoute(null);
                }
              }}
            >
              <Popup>
                <div className="p-1">
                  <p className="font-extrabold text-sm text-primary mb-1">{fac.name}</p>
                  <p className="text-xs text-gray-300 leading-relaxed">{fac.details}</p>
                  {fac.waitTimeMinutes !== undefined && (
                    <div className="flex items-center gap-1 mt-2 text-xs font-bold text-orange-400">
                      <Timer size={12} />
                      {t('wait_time')}: {fac.waitTimeMinutes} min
                    </div>
                  )}
                  {fac.capacity && (
                    <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">{t('occupancy')}: {fac.capacity}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          {activeRoute && (
            <Polyline 
              positions={activeRoute} 
              color={activeRouteDetails?.type.includes('ADA') || activeRouteDetails?.type.includes('Ruta') ? '#3B82F6' : '#FF6B00'} 
              weight={5}
              opacity={0.8}
              dashArray={activeRouteDetails?.type.includes('ADA') || activeRouteDetails?.type.includes('Ruta') ? '8, 8' : undefined}
            />
          )}

          <Marker 
            position={[40.8120, -74.0768]} 
            icon={L.divIcon({
              html: `
                <div class="relative">
                  <div class="absolute -inset-2 bg-blue-500/30 rounded-full animate-ping"></div>
                  <div style="background-color: #3B82F6; border: 2px solid white; width: 16px; height: 16px; border-radius: 50%;"></div>
                </div>
              `,
              className: 'custom-user-marker',
              iconSize: [16, 16],
              iconAnchor: [8, 8]
            })}
          >
            <Popup>
              <p className="font-bold text-xs">Your Location</p>
            </Popup>
          </Marker>

          <MapFocusController selectedFacility={selectedFacility} />
        </MapContainer>

        {/* Map Float Filters */}
        <div className="absolute top-3 left-12 z-[1000] flex flex-wrap gap-1.5 max-w-[calc(100%-100px)]">
          {[
            { id: 'all', label: t('filter_all') },
            { id: 'gate', label: t('filter_gates') },
            { id: 'parking', label: t('filter_parking') },
            { id: 'medical', label: t('filter_medical') },
            { id: 'restroom', label: t('filter_restrooms') },
            { id: 'food', label: t('filter_dining') },
            { id: 'evac', label: t('filter_safety') }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => { setActiveFilter(btn.id); setActiveRoute(null); }}
              className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all shadow-md ${
                activeFilter === btn.id 
                  ? 'bg-primary text-black' 
                  : 'bg-darkBg-card border border-white/5 text-gray-300 hover:bg-white/5'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Facility Info Panel */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        {selectedFacility ? (
          <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] uppercase font-black tracking-widest text-primary border border-primary/20 px-2 py-0.5 rounded">
                  {selectedFacility.type}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                  selectedFacility.status === 'open' ? 'bg-green-500/10 text-green-400' :
                  selectedFacility.status === 'congested' ? 'bg-orange-500/10 text-orange-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  {selectedFacility.status}
                </span>
              </div>

              <h3 className="text-xl font-extrabold mb-2 tracking-tight">{selectedFacility.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{selectedFacility.details}</p>

              <div className="space-y-2 border-t border-white/5 pt-4">
                {selectedFacility.waitTimeMinutes !== undefined && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1.5 font-medium"><Timer size={16} /> {t('wait_time')}</span>
                    <span className="font-bold text-orange-400">{selectedFacility.waitTimeMinutes} minutes</span>
                  </div>
                )}
                {selectedFacility.capacity && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1.5 font-medium"><Timer size={16} /> {t('occupancy')}</span>
                    <span className="font-bold">{selectedFacility.capacity}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5 font-medium"><MapPin size={16} /> {t('location_code')}</span>
                  <span className="font-mono text-xs text-gray-300">
                    {selectedFacility.coordinates[0].toFixed(4)}, {selectedFacility.coordinates[1].toFixed(4)}
                  </span>
                </div>
              </div>

              {evacuationActive && (
                <div className="mt-4 bg-red-950/40 border border-red-500/30 rounded-xl p-3 flex items-start gap-2.5">
                  <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-xs text-red-300 leading-normal">
                    Evacuation active. exits are open.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-2 pt-4 border-t border-white/5">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">{t('directions_title')}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCalculateRoute(selectedFacility, 'standard')}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation size={14} />
                  {t('direct_path')}
                </button>
                <button
                  onClick={() => handleCalculateRoute(selectedFacility, 'wheelchair')}
                  className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Accessibility size={14} />
                  {t('ada_route')}
                </button>
              </div>

              {activeRoute && (
                <div className="mt-3 bg-white/5 border border-white/5 rounded-xl p-3.5 flex flex-col gap-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-bold">{activeRouteDetails?.type}</span>
                    <span className="bg-primary text-black font-black text-[10px] px-2 py-0.5 rounded">{t('calculated_badge')}</span>
                  </div>
                  <div className="flex justify-between items-baseline mt-1">
                    <span className="text-lg font-black">{activeRouteDetails?.duration}</span>
                    <span className="text-xs text-gray-500 font-mono">Dist: {activeRouteDetails?.distance}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">{t('starting_loc')}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-6 text-center flex flex-col items-center justify-center h-full text-gray-500 min-h-[300px]">
            <MapPin size={48} className="text-gray-600 mb-3 animate-pulse" />
            <p className="font-extrabold text-white text-base">{t('landmark_title')}</p>
            <p className="text-xs text-gray-400 max-w-[200px] mt-1.5 leading-relaxed">
              {t('landmark_sub')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
