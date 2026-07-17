export interface MatchDetails {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  timePlayed: number;
  stage: string;
  status: 'live' | 'upcoming' | 'finished';
  attendance: number;
  temperature: number;
  possessionHome: number;
  possessionAway: number;
  shotsHome: number;
  shotsAway: number;
  foulsHome: number;
  foulsAway: number;
}

export type FacilityType = 'gate' | 'parking' | 'medical' | 'food' | 'restroom' | 'exit' | 'zone';

export interface FacilityMarker {
  id: string;
  name: string;
  type: FacilityType;
  coordinates: [number, number]; // [lat, lng]
  status: 'open' | 'congested' | 'closed' | 'active';
  details: string;
  capacity?: string;
  waitTimeMinutes?: number;
}

export interface Incident {
  id: string;
  type: 'medical' | 'security' | 'fire' | 'facility';
  title: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'dispatching' | 'on-scene' | 'resolved';
  timestamp: string;
  coordinates: [number, number];
  assignedStaff?: string;
}

export interface TransportOption {
  id: string;
  type: 'train' | 'bus' | 'shuttle' | 'rideshare';
  name: string;
  destination: string;
  nextDeparture: string;
  frequency: string;
  status: 'on-time' | 'delayed' | 'suspended';
  occupancy: 'low' | 'medium' | 'high';
}

export interface EcoChallenge {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'transport' | 'recycling' | 'energy';
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language?: string;
}
