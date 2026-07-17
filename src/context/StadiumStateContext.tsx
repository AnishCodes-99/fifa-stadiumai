import React, { createContext, useContext, useState, useEffect } from 'react';
import { MatchDetails, FacilityMarker, Incident, TransportOption, EcoChallenge } from '../types/stadium';

interface StadiumStateContextType {
  matchDetails: MatchDetails;
  facilities: FacilityMarker[];
  incidents: Incident[];
  transportOptions: TransportOption[];
  ecoChallenges: EcoChallenge[];
  ecoPoints: number;
  evacuationActive: boolean;
  activeSOS: { active: boolean; coordinates?: [number, number]; message?: string };
  selectedFacility: FacilityMarker | null;
  activeRoute: [number, number][] | null;
  activeRouteDetails: { distance: string; duration: string; type: string } | null;
  stadiumLogs: { time: string; message: string; type: 'info' | 'warn' | 'error' | 'success' }[];
  triggerSOS: (coordinates?: [number, number]) => void;
  clearSOS: () => void;
  resolveIncident: (id: string) => void;
  addIncident: (type: Incident['type'], title: string, location: string, severity: Incident['severity'], coords: [number, number]) => void;
  updateIncidentStatus: (id: string, status: Incident['status']) => void;
  toggleGateStatus: (id: string) => void;
  setEvacuationActive: (active: boolean) => void;
  setSelectedFacility: (facility: FacilityMarker | null) => void;
  setActiveRoute: (route: [number, number][] | null, details?: { distance: string; duration: string; type: string } | null) => void;
  completeChallenge: (id: string) => void;
  addLog: (message: string, type?: 'info' | 'warn' | 'error' | 'success') => void;
  incrementMatchScore: (team: 'home' | 'away') => void;
}

const StadiumStateContext = createContext<StadiumStateContextType | undefined>(undefined);

const initialMatch: MatchDetails = {
  homeTeam: 'USA',
  awayTeam: 'MEXICO',
  homeScore: 1,
  awayScore: 0,
  timePlayed: 64,
  stage: 'Quarter-Finals',
  status: 'live',
  attendance: 82500,
  temperature: 24,
  possessionHome: 52,
  possessionAway: 48,
  shotsHome: 8,
  shotsAway: 6,
  foulsHome: 11,
  foulsAway: 14
};

const initialFacilities: FacilityMarker[] = [
  { id: 'gate-a', name: 'Entry Gate A (North)', type: 'gate', coordinates: [40.8145, -74.0754], status: 'open', details: 'Serving Zones 1-3. General entry & wheelchair ramp.', capacity: '85%', waitTimeMinutes: 5 },
  { id: 'gate-b', name: 'Entry Gate B (East)', type: 'gate', coordinates: [40.8148, -74.0734], status: 'congested', details: 'Serving Zones 4-6. VIP Entrance. Backlog at bag checks.', capacity: '95%', waitTimeMinutes: 25 },
  { id: 'gate-c', name: 'Entry Gate C (South)', type: 'gate', coordinates: [40.8122, -74.0732], status: 'open', details: 'Serving Zones 7-9. Accessible parking access.', capacity: '60%', waitTimeMinutes: 10 },
  { id: 'gate-d', name: 'Entry Gate D (West)', type: 'gate', coordinates: [40.8125, -74.0756], status: 'open', details: 'Serving Zones 10-12. Rapid entry gates.', capacity: '45%', waitTimeMinutes: 4 },
  
  { id: 'med-east', name: 'Medical Station East', type: 'medical', coordinates: [40.8138, -74.0730], status: 'open', details: 'Full emergency services. Trauma care available.', capacity: '20%' },
  { id: 'med-west', name: 'Medical Station West', type: 'medical', coordinates: [40.8132, -74.0758], status: 'open', details: 'First Aid, ice packs, and minor injury treatment.', capacity: '10%' },
  
  { id: 'food-north', name: 'Food Court North', type: 'food', coordinates: [40.8142, -74.0740], status: 'open', details: 'Burgers, vegan wraps, halal options, Coca-Cola store.', waitTimeMinutes: 8 },
  { id: 'food-south', name: 'Food Court South', type: 'food', coordinates: [40.8128, -74.0748], status: 'congested', details: 'Tacos, pizza, local NY style snacks, long queues.', waitTimeMinutes: 18 },
  
  { id: 'rest-north', name: 'Restrooms North Block', type: 'restroom', coordinates: [40.8140, -74.0748], status: 'open', details: 'Men, Women, and All-Gender ADA Accessible facilities.' },
  { id: 'rest-south', name: 'Restrooms South Block', type: 'restroom', coordinates: [40.8130, -74.0740], status: 'open', details: 'Men, Women, and All-Gender ADA Accessible facilities. Baby changing station.' },
  
  { id: 'park-1', name: 'West General Parking (Lot P1)', type: 'parking', coordinates: [40.8160, -74.0770], status: 'open', details: 'Tailgating allowed. Standard pricing.', capacity: '88%' },
  { id: 'park-2', name: 'East EV & Ride Share (Lot P2)', type: 'parking', coordinates: [40.8110, -74.0710], status: 'open', details: 'Eco-discounts. Rideshare zone & EV Chargers.', capacity: '92%' },
  
  { id: 'exit-n', name: 'Emergency Exit North', type: 'exit', coordinates: [40.8152, -74.0744], status: 'closed', details: 'Only opens during evacuation override.' },
  { id: 'exit-s', name: 'Emergency Exit South', type: 'exit', coordinates: [40.8118, -74.0744], status: 'closed', details: 'Only opens during evacuation override.' }
];

const initialIncidents: Incident[] = [
  { id: 'inc-1', type: 'medical', title: 'Heat exhaustion', location: 'Section 104 Row M', severity: 'medium', status: 'on-scene', timestamp: '19:42', coordinates: [40.8139, -74.0746], assignedStaff: 'Paramedic Team 3' },
  { id: 'inc-2', type: 'facility', title: 'Broken escalator', location: 'Gate B Concourse', severity: 'low', status: 'reported', timestamp: '19:55', coordinates: [40.8147, -74.0736], assignedStaff: 'Maintenance Tech James' }
];

const initialTransport: TransportOption[] = [
  { id: 'tr-1', type: 'train', name: 'Meadowlands Rail Link', destination: 'New York Penn Station', nextDeparture: '4 min', frequency: 'Every 8 mins', status: 'on-time', occupancy: 'high' },
  { id: 'tr-2', type: 'bus', name: 'FIFA Shuttle Express 351', destination: 'Port Authority Bus Terminal', nextDeparture: '7 min', frequency: 'Every 5 mins', status: 'on-time', occupancy: 'medium' },
  { id: 'tr-3', type: 'shuttle', name: 'ADA Wheelchair Shuttle', destination: 'ADA Remote Lot P4', nextDeparture: '2 min', frequency: 'On-demand', status: 'on-time', occupancy: 'low' },
  { id: 'tr-4', type: 'rideshare', name: 'Uber/Lyft Hub Zone', destination: 'Local Drop-offs / Hotels', nextDeparture: '10 min wait', frequency: 'Continuous', status: 'delayed', occupancy: 'high' }
];

const initialEcoChallenges: EcoChallenge[] = [
  { id: 'eco-1', title: 'Green Commuter', description: 'Arrive at the stadium using the Meadowlands Rail or FIFA Shuttle Express.', points: 150, category: 'transport', completed: false },
  { id: 'eco-2', title: 'Zero Waste Fan', description: 'Deposit plastic bottles into the Reverse Vending Machine (RVM) at Food Courts.', points: 100, category: 'recycling', completed: false },
  { id: 'eco-3', title: 'Canopy Supporter', description: 'Enable "energy save mode" on the stadium app during peak play hours.', points: 50, category: 'energy', completed: false }
];

export const StadiumStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [matchDetails, setMatchDetails] = useState<MatchDetails>(initialMatch);
  const [facilities, setFacilities] = useState<FacilityMarker[]>(initialFacilities);
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [transportOptions] = useState<TransportOption[]>(initialTransport);
  const [ecoChallenges, setEcoChallenges] = useState<EcoChallenge[]>(initialEcoChallenges);
  const [ecoPoints, setEcoPoints] = useState<number>(0);
  const [evacuationActive, setEvacuationActiveState] = useState<boolean>(false);
  const [activeSOS, setActiveSOS] = useState<StadiumStateContextType['activeSOS']>({ active: false });
  const [selectedFacility, setSelectedFacility] = useState<FacilityMarker | null>(null);
  const [activeRoute, setActiveRouteState] = useState<[number, number][] | null>(null);
  const [activeRouteDetails, setActiveRouteDetails] = useState<StadiumStateContextType['activeRouteDetails']>(null);
  const [stadiumLogs, setStadiumLogs] = useState<StadiumStateContextType['stadiumLogs']>([
    { time: '19:30', message: 'System boot complete. Connecting IoT sensors.', type: 'success' },
    { time: '19:35', message: 'Match started. USA vs. Mexico kickoff.', type: 'info' },
    { time: '19:42', message: 'Medical dispatch: Section 104 Heat Exhaustion.', type: 'warn' }
  ]);

  useEffect(() => {
    if (matchDetails.status !== 'live') return;
    const interval = setInterval(() => {
      setMatchDetails(prev => {
        if (prev.timePlayed >= 90) {
          clearInterval(interval);
          return { ...prev, status: 'finished' };
        }
        return { ...prev, timePlayed: prev.timePlayed + 1 };
      });
    }, 12000);
    return () => clearInterval(interval);
  }, [matchDetails.status]);

  const addLog = (message: string, type: 'info' | 'warn' | 'error' | 'success' = 'info') => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setStadiumLogs(prev => [{ time: timeStr, message, type }, ...prev].slice(0, 100));
  };

  const incrementMatchScore = (team: 'home' | 'away') => {
    setMatchDetails(prev => {
      const isHome = team === 'home';
      const homeS = isHome ? prev.homeScore + 1 : prev.homeScore;
      const awayS = !isHome ? prev.awayScore + 1 : prev.awayScore;
      addLog(`GOAL! ${isHome ? prev.homeTeam : prev.awayTeam} scored. New score: ${homeS} - ${awayS}`, 'success');
      return {
        ...prev,
        homeScore: homeS,
        awayScore: awayS
      };
    });
  };

  const triggerSOS = (coordinates?: [number, number]) => {
    const coords: [number, number] = coordinates || [40.8135, -74.0744];
    setActiveSOS({
      active: true,
      coordinates: coords,
      message: 'SOS ALERT: Fan requires emergency medical assistance.'
    });
    addLog('SOS Alert Triggered! Dispatching nearest medical response unit.', 'error');
    addIncident('medical', 'SOS Fan Distress Beacon', 'Section 220 Concourse', 'critical', coords);
  };

  const clearSOS = () => {
    setActiveSOS({ active: false });
    addLog('SOS Incident flagged as cleared.', 'success');
  };

  const addIncident = (type: Incident['type'], title: string, location: string, severity: Incident['severity'], coords: [number, number]) => {
    const newInc: Incident = {
      id: `inc-${Date.now()}`,
      type,
      title,
      location,
      severity,
      status: 'reported',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      coordinates: coords,
      assignedStaff: 'Pending dispatcher assignment'
    };
    setIncidents(prev => [newInc, ...prev]);
    addLog(`New ${severity} severity ${type} incident reported at ${location}.`, severity === 'critical' || severity === 'high' ? 'error' : 'warn');
  };

  const resolveIncident = (id: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        addLog(`Incident resolved: ${inc.title} at ${inc.location}.`, 'success');
        return { ...inc, status: 'resolved' as const };
      }
      return inc;
    }));
  };

  const updateIncidentStatus = (id: string, status: Incident['status']) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        let staff = inc.assignedStaff;
        if (status === 'dispatching') {
          staff = 'Rapid Response Team A';
        } else if (status === 'on-scene') {
          staff = 'Responder Unit 14 (On Scene)';
        }
        addLog(`Incident status updated to [${status}]: ${inc.title}.`, 'info');
        return { ...inc, status, assignedStaff: staff };
      }
      return inc;
    }));
  };

  const toggleGateStatus = (id: string) => {
    setFacilities(prev => prev.map(fac => {
      if (fac.id === id) {
        const newStatus = fac.status === 'closed' ? 'open' : 'closed';
        addLog(`Gate Status Change: ${fac.name} is now ${newStatus.toUpperCase()}.`, newStatus === 'closed' ? 'warn' : 'success');
        return { ...fac, status: newStatus };
      }
      return fac;
    }));
  };

  const setEvacuationActive = (active: boolean) => {
    setEvacuationActiveState(active);
    setFacilities(prev => prev.map(fac => {
      if (fac.type === 'exit') {
        return { ...fac, status: active ? 'open' : 'closed', details: active ? 'EMERGENCY EVACUATION EXIT OPEN.' : 'Closed.' };
      }
      if (fac.type === 'gate') {
        return { ...fac, status: active ? 'open' : fac.status, waitTimeMinutes: active ? 0 : fac.waitTimeMinutes, details: active ? 'OPEN FOR EVACUATION.' : fac.details };
      }
      return fac;
    }));

    if (active) {
      addLog('!!! STADIUM-WIDE EMERGENCY EVACUATION TRIGGERED !!!', 'error');
    } else {
      addLog('Stadium emergency evacuation alert stood down.', 'success');
    }
  };

  const setActiveRoute = (route: [number, number][] | null, details?: { distance: string; duration: string; type: string } | null) => {
    setActiveRouteState(route);
    setActiveRouteDetails(details || null);
    if (route) {
      addLog(`New route calculated: ${details?.type || 'standard'} (${details?.distance}, ${details?.duration}).`, 'info');
    }
  };

  const completeChallenge = (id: string) => {
    setEcoChallenges(prev => prev.map(ch => {
      if (ch.id === id && !ch.completed) {
        setEcoPoints(curr => curr + ch.points);
        addLog(`Eco Challenge Completed! "${ch.title}" (+${ch.points} pts)`, 'success');
        return { ...ch, completed: true };
      }
      return ch;
    }));
  };

  return (
    <StadiumStateContext.Provider value={{
      matchDetails,
      facilities,
      incidents,
      transportOptions,
      ecoChallenges,
      ecoPoints,
      evacuationActive,
      activeSOS,
      selectedFacility,
      activeRoute,
      activeRouteDetails,
      stadiumLogs,
      triggerSOS,
      clearSOS,
      resolveIncident,
      addIncident,
      updateIncidentStatus,
      toggleGateStatus,
      setEvacuationActive,
      setSelectedFacility,
      setActiveRoute,
      completeChallenge,
      addLog,
      incrementMatchScore
    }}>
      {children}
    </StadiumStateContext.Provider>
  );
};

export const useStadiumState = () => {
  const context = useContext(StadiumStateContext);
  if (context === undefined) {
    throw new Error('useStadiumState must be used within a StadiumStateProvider');
  }
  return context;
};
