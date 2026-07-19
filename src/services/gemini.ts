import { GoogleGenerativeAI } from '@google/generative-ai';

const rawApiKey = import.meta.env.VITE_GEMINI_API_KEY;
const apiKey = typeof rawApiKey === 'string' ? rawApiKey.trim() : '';
const isGeminiConfigured = apiKey !== '' && apiKey !== 'YOUR_GEMINI_API_KEY_HERE' && apiKey.length > 10;

let genAI: GoogleGenerativeAI | null = null;
if (isGeminiConfigured) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
  } catch (error) {
    console.warn("Failed to initialize Gemini AI client:", error);
  }
}

export interface AIResponse {
  text: string;
  action?: {
    type: 'focus' | 'route';
    targetId: string;
    routeType?: 'standard' | 'wheelchair';
  };
}

// Local fallback with topic checking
const generateFallbackResponse = (query: string, language: string = 'en'): AIResponse => {
  const q = query.toLowerCase();
  
  // Identify requested language
  let lang = language;
  if (q.includes('hola') || q.includes('baño') || q.includes('salida') || q.includes('médico') || q.includes('estacionamiento')) lang = 'es';
  else if (q.includes('bonjour') || q.includes('toilette') || q.includes('sortie') || q.includes('secours')) lang = 'fr';
  else if (q.includes('hallo') || q.includes('toilette') || q.includes('ausgang') || q.includes('arzt')) lang = 'de';
  else if (q.includes('olá') || q.includes('banheiro') || q.includes('saída') || q.includes('médico')) lang = 'pt';

  const responses: Record<string, {
    emergency: AIResponse;
    medical: AIResponse;
    wheelchair: AIResponse;
    gates: AIResponse;
    transit: AIResponse;
    sustainability: AIResponse;
    food: AIResponse;
    match: AIResponse;
    general: AIResponse;
  }> = {
    en: {
      emergency: {
        text: "🚨 EMERGENCY ALERT: Emergency exits are highlighted in red on your map. Please locate Exit Gates N and S immediately. Avoid the main gate elevator which is restricted. Follow security staff instructions.",
        action: { type: 'focus', targetId: 'exit-n' }
      },
      medical: {
        text: "🏥 MEDICAL STATIONS: The closest medical facility is Medical Station West located near Gate D (West). I have highlighted the fastest path on your map.",
        action: { type: 'route', targetId: 'med-west', routeType: 'standard' }
      },
      wheelchair: {
        text: "♿ ACCESSIBILITY GUIDE: MetLife Stadium provides full ADA compliance. Entry Gate A (North) features a wheelchair ramp, and Gate C offers immediate elevator lifts. I have mapped an accessible, step-free route for you.",
        action: { type: 'route', targetId: 'gate-a', routeType: 'wheelchair' }
      },
      gates: {
        text: "🎟️ GATE WAIT TIMES: Gate A has a 5-minute wait, Gate D has a 4-minute wait, and Gate C has a 10-minute wait. Avoid Gate B (VIP) which currently has a 25-minute backlog. Proceed to Gate D for the fastest entry.",
        action: { type: 'focus', targetId: 'gate-d' }
      },
      transit: {
        text: "🚄 TRANSPORTATION: The Meadowlands Rail Link is departing Penn Station trains every 8 minutes (occupancy: High). FIFA Shuttle Express 351 to Port Authority departs every 5 minutes. Rideshare wait times are currently 10 mins.",
        action: { type: 'focus', targetId: 'park-2' }
      },
      sustainability: {
        text: "♻️ SUSTAINABILITY: You can deposit recyclable plastics at the Reverse Vending Machine (RVM) located at Food Court North to claim 100 Eco-Points. These points can be redeemed for food discounts or FIFA merchandise!",
        action: { type: 'focus', targetId: 'food-north' }
      },
      food: {
        text: "🍔 FOOD & DRINK: Food Court North (Burgers, Vegan, Halal) has an 8-minute wait. Food Court South (Tacos, Pizza) is congested with an 18-minute wait. Restrooms are adjacent to both blocks.",
        action: { type: 'route', targetId: 'food-north', routeType: 'standard' }
      },
      match: {
        text: "⚽ MATCH UPDATE: We are in the 64th minute of the USA vs. Mexico Quarter-Finals. USA leads 1 - 0. Attendance is at a full capacity of 82,500. Temperature is a comfortable 24°C.",
        action: { type: 'focus', targetId: 'gate-a' }
      },
      general: {
        text: "Hello! I am StadiumMind AI, your FIFA World Cup 2026 assistant. I can assist you with directions, food wait times, emergency routes, accessibility requests, and eco-incentives. Try asking: 'Where is the nearest medical center?' or 'How long is the line at Gate B?'"
      }
    },
    es: {
      emergency: {
        text: "🚨 ALERTA DE EMERGENCIA: Las salidas de emergencia están marcadas en rojo en el mapa. Localice las salidas N y S de inmediato. Evite los ascensores principales. Siga las instrucciones del personal.",
        action: { type: 'focus', targetId: 'exit-n' }
      },
      medical: {
        text: "🏥 PUESTO MÉDICO: El puesto médico más cercano es Estación Médica Oeste, cerca de la Puerta D. He trazado la ruta más rápida en su mapa.",
        action: { type: 'route', targetId: 'med-west', routeType: 'standard' }
      },
      wheelchair: {
        text: "♿ ACCESIBILIDAD: El estadio MetLife cuenta con accesibilidad total ADA. La Puerta A (Norte) posee rampa y la Puerta C ascensores directos. He configurado una ruta sin escaleras para usted.",
        action: { type: 'route', targetId: 'gate-a', routeType: 'wheelchair' }
      },
      gates: {
        text: "🎟️ TIEMPOS DE ESPERA: Puerta A: 5 min, Puerta D: 4 min, Puerta C: 10 min. Evite la Puerta B (VIP) que presenta demoras de 25 min. Diríjase a la Puerta D.",
        action: { type: 'focus', targetId: 'gate-d' }
      },
      transit: {
        text: "🚄 TRANSPORTE: El Meadowlands Rail Link sale cada 8 min hacia NY Penn Station (alta ocupación). El bus express 351 sale cada 5 min. Taxis tienen una espera de 10 min.",
        action: { type: 'focus', targetId: 'park-2' }
      },
      sustainability: {
        text: "♻️ SOSTENIBILIDAD: Recicle sus botellas de plástico en la máquina RVM del Patio de Comidas Norte y sume 100 Eco-Puntos para obtener descuentos en comida y recuerdos.",
        action: { type: 'focus', targetId: 'food-north' }
      },
      food: {
        text: "🍔 ALIMENTOS: El Patio de Comidas Norte (hamburguesas, vegano) tiene 8 min de espera. El Sur (tacos, pizza) está congestionado con 18 min de espera.",
        action: { type: 'route', targetId: 'food-north', routeType: 'standard' }
      },
      match: {
        text: "⚽ PARTIDO LIVE: Minuto 64 de los Cuartos de Final entre EE.UU. y México. EE.UU. lidera 1 - 0. Asistencia: 82,500 espectadores. Temperatura: 24°C.",
        action: { type: 'focus', targetId: 'gate-a' }
      },
      general: {
        text: "¡Hola! Soy StadiumMind AI, su asistente para la Copa Mundial de la FIFA 2026. Puedo guiarle en accesibilidad, baños, tiempos de espera, salidas y transporte. Pregúnteme: '¿Dónde está el puesto médico?'"
      }
    },
    fr: {
      emergency: {
        text: "🚨 ALERTE D'URGENCE: Les sorties de secours sont surlignées en rouge. Veuillez identifier les Portes de Sortie N et S. Suivez les instructions des agents de sécurité.",
        action: { type: 'focus', targetId: 'exit-n' }
      },
      medical: {
        text: "🏥 POSTE MÉDICAL: Le centre médical le plus proche est la Station Médicale Ouest près de la Porte D. La route la plus rapide est affichée sur la carte.",
        action: { type: 'route', targetId: 'med-west', routeType: 'standard' }
      },
      wheelchair: {
        text: "♿ GUIDE D'ACCESSIBILITÉ: Le stade MetLife propose un accès PMR complet. La Porte A (Nord) dispose d'une rampe, la Porte C dispose d'un ascenseur. Voici un itinéraire sans marches.",
        action: { type: 'route', targetId: 'gate-a', routeType: 'wheelchair' }
      },
      gates: {
        text: "🎟️ TEMPS D'ATTENTE: Porte A: 5 min, Porte D: 4 min, Porte B: 25 min. Veuillez emprunter la Porte D pour entrer rapidement.",
        action: { type: 'focus', targetId: 'gate-d' }
      },
      transit: {
        text: "🚄 TRANSPORT: La liaison ferroviaire Meadowlands part toutes les 8 minutes. La navette Express 351 circule toutes les 5 minutes. Les taxis ont une attente de 10 min.",
        action: { type: 'focus', targetId: 'park-2' }
      },
      sustainability: {
        text: "♻️ DURABILITÉ: Déposez vos bouteilles en plastique dans la machine RVM du Food Court Nord et gagnez 100 Éco-Points échangeables contre des remises.",
        action: { type: 'focus', targetId: 'food-north' }
      },
      food: {
        text: "🍔 RESTAURATION: Le Food Court Nord (burgers, végétalien) a une attente de 8 min. Le Sud (tacos, pizza) a une attente de 18 min.",
        action: { type: 'route', targetId: 'food-north', routeType: 'standard' }
      },
      match: {
        text: "⚽ DIRECT MATCH: 64ème minute. É-U 1 x 0 MEXIQUE. Affluence: 82 500 spectateurs. Température: 24°C.",
        action: { type: 'focus', targetId: 'gate-a' }
      },
      general: {
        text: "Bonjour! Je suis StadiumMind AI, votre assistant. Je peux vous aider avec les itinéraires, les portes de stade et le transport."
      }
    },
    de: {
      emergency: {
        text: "🚨 NOTFALLALARM: Notausgänge sind auf der Karte rot markiert. Finden Sie sofort die Tore N und S. Folgen Sie den Anweisungen der Sicherheitskräfte.",
        action: { type: 'focus', targetId: 'exit-n' }
      },
      medical: {
        text: "🏥 SANITÄTSSTATION: Die nächste Sanitätsstation West befindet sich in der Nähe von Tor D. Der schnellste Weg ist auf der Karte markiert.",
        action: { type: 'route', targetId: 'med-west', routeType: 'standard' }
      },
      wheelchair: {
        text: "♿ BARRIEREFREIHEIT: Das MetLife Stadium ist ADA-konform. Tor A verfügt über eine Rampe, Tor C über Aufzüge. Stufenlose Route auf der Karte angezeigt.",
        action: { type: 'route', targetId: 'gate-a', routeType: 'wheelchair' }
      },
      gates: {
        text: "🎟️ WARTEZEITEN AN TOREN: Tor A: 5 Min, Tor D: 4 Min, Tor C: 10 Min. Meiden Sie Tor B (VIP). Bitte gehen Sie zu Tor D.",
        action: { type: 'focus', targetId: 'gate-d' }
      },
      transit: {
        text: "🚄 VERKEHRSMITTEL: Der Meadowlands Rail Link fährt alle 8 Minuten. Der Express-Shuttle-Bus 351 fährt alle 5 Minuten. Rideshares haben 10 Min Wartezeit.",
        action: { type: 'focus', targetId: 'park-2' }
      },
      sustainability: {
        text: "♻️ NACHHALTIGKEIT: Werfen Sie Plastikflaschen in den RVM-Automaten bei Gastronomie Nord ein, um 100 Eco-Punkte für Rabatte zu erhalten.",
        action: { type: 'focus', targetId: 'food-north' }
      },
      food: {
        text: "🍔 ESSEN & TRINKEN: Gastronomie Nord hat 8 Minuten Wartezeit. Gastronomie Süd (Tacos, Pizza) hat 18 Minuten Wartezeit.",
        action: { type: 'route', targetId: 'food-north', routeType: 'standard' }
      },
      match: {
        text: "⚽ LIVE-SPIEL: 64. Minute im Viertelfinale. USA führt 1 - 0 gegen Mexiko. Zuschauer: 82.500. Temperatur: 24°C.",
        action: { type: 'focus', targetId: 'gate-a' }
      },
      general: {
        text: "Hallo! Ich bin StadiumMind AI, Ihr Assistent. Ich kann Ihnen bei der Navigation, den Wartezeiten und den Notausgängen helfen."
      }
    },
    pt: {
      emergency: {
        text: "🚨 ALERTA DE EMERGÊNCIA: As saídas de emergência estão marcadas em vermelho. Por favor, localize os Portões de Saída N e S. Siga as instruções dos seguranças.",
        action: { type: 'focus', targetId: 'exit-n' }
      },
      medical: {
        text: "🏥 POSTO MÉDICO: O posto médico mais próximo é a Estação Médica Oeste, perto do Portão D. Tracei a rota mais rápida no seu mapa.",
        action: { type: 'route', targetId: 'med-west', routeType: 'standard' }
      },
      wheelchair: {
        text: "♿ ACESSIBILIDADE: O MetLife Stadium possui acessibilidade ADA completa. Portão A possui rampa e o Portão C elevadores. Rota sem degraus traçada no mapa.",
        action: { type: 'route', targetId: 'gate-a', routeType: 'wheelchair' }
      },
      gates: {
        text: "🎟️ TEMPOS DE ESPERA: Portão A: 5 min, Portão D: 4 min, Portão C: 10 min. Evite o Portão B (VIP, 25 min). Dirija-se ao Portão D.",
        action: { type: 'focus', targetId: 'gate-d' }
      },
      transit: {
        text: "🚄 TRANSPORTE: O trem Meadowlands Rail Link sai a cada 8 min. O ônibus express 351 sai a cada 5 min. Carros de aplicativo têm espera de 10 min.",
        action: { type: 'focus', targetId: 'park-2' }
      },
      sustainability: {
        text: "♻️ SUSTENTABILIDADE: Deposite garrafas plásticas na máquina de reciclagem RVM na Praça de Alimentação Norte e receba 100 Eco-Pontos para resgatar lanches.",
        action: { type: 'focus', targetId: 'food-north' }
      },
      food: {
        text: "🍔 ALIMENTAÇÃO: A Praça de Alimentação Norte (Burgers, Vegan, Halal) tem 8 min de espera. A Sul tem congestionamentos com 18 min de espera.",
        action: { type: 'route', targetId: 'food-north', routeType: 'standard' }
      },
      match: {
        text: "⚽ PLACAR AO VIVO: Minuto 64 das Quartas de Final. EUA 1 x 0 MÉXICO. Público de 82.500 torcedores. Temperatura: 24°C.",
        action: { type: 'focus', targetId: 'gate-a' }
      },
      general: {
        text: "Olá! Sou o StadiumMind AI, seu assistente da Copa do Mundo FIFA 2026. Posso ajudar com orientações, portões, postos médicos e transporte."
      }
    }
  };

  const currentLang = responses[lang] ? lang : 'en';
  const data = responses[currentLang];

  if (q.includes('emerg') || q.includes('sos') || q.includes('danger') || q.includes('evac') || q.includes('incend') || q.includes('peligro')) {
    return data.emergency;
  }
  if (q.includes('medic') || q.includes('doctor') || q.includes('hurt') || q.includes('paramed') || q.includes('first aid') || q.includes('auxil') || q.includes('lesion') || q.includes('blessure')) {
    return data.medical;
  }
  if (q.includes('wheel') || q.includes('access') || q.includes('disab') || q.includes('ramp') || q.includes('elevat') || q.includes('handicap') || q.includes('ada') || q.includes('silla de rued') || q.includes('fauteuil')) {
    return data.wheelchair;
  }
  if (q.includes('gate') || q.includes('wait') || q.includes('queue') || q.includes('entry') || q.includes('line') || q.includes('puerta') || q.includes('porte') || q.includes('cola') || q.includes('attente')) {
    return data.gates;
  }
  if (q.includes('train') || q.includes('bus') || q.includes('transit') || q.includes('transport') || q.includes('shuttle') || q.includes('rideshare') || q.includes('uber') || q.includes('lyft') || q.includes('estacion') || q.includes('gare')) {
    return data.transit;
  }
  if (q.includes('sustain') || q.includes('eco') || q.includes('recycle') || q.includes('green') || q.includes('points') || q.includes('challenge') || q.includes('recicla') || q.includes('sostenib')) {
    return data.sustainability;
  }
  if (q.includes('food') || q.includes('eat') || q.includes('drink') || q.includes('burger') || q.includes('pizza') || q.includes('restroom') || q.includes('toilet') || q.includes('bathroom') || q.includes('baño') || q.includes('comida') || q.includes('nourrit') || q.includes('wc')) {
    return data.food;
  }
  if (q.includes('match') || q.includes('score') || q.includes('live') || q.includes('game') || q.includes('play') || q.includes('usa') || q.includes('mexic') || q.includes('gol') || q.includes('goal')) {
    return data.match;
  }

  // Dynamic fallback for general queries
  const generalResponses: Record<string, string> = {
    en: `Regarding "${query}", that is an interesting topic! As an AI assistant, I can confirm it represents a great area of query. I am fully prepared to discuss and help you with anything you need!`,
    es: `Con respecto a "${query}", ¡es un tema muy interesante! Como tu asistente de IA, estoy totalmente preparado para ayudarte en lo que necesites.`,
    fr: `Concernant "${query}", c'est un sujet très intéressant! En tant qu'assistant IA, je suis à votre disposition pour vous aider.`,
    de: `Zu "${query}": Das ist ein faszinierendes Thema! Als Ihr KI-Assistent helfe ich Ihnen gerne bei allen Anliegen weiter.`,
    pt: `Sobre "${query}", esse é um assunto muito interessante! Como assistente de IA, estou totalmente disponível para ajudar no que for preciso.`
  };

  return { text: generalResponses[lang] || generalResponses.en };
};

export const askGemini = async (query: string, language: string = 'en'): Promise<AIResponse> => {
    const sanitizedQuery = typeof query === 'string' ? query.replace(/<[^>]*>/g, '').trim().slice(0, 1000) : '';
  if (!sanitizedQuery) {
    return {
      text: language === 'es' 
        ? "Por favor, ingresa una pregunta válida." 
        : "Please enter a valid question."
    };
  }

  if (!isGeminiConfigured || !genAI) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateFallbackResponse(sanitizedQuery, language));
      }, 600);
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const systemPrompt = `You are StadiumMind AI, the official assistant for FIFA World Cup 2026 held at MetLife Stadium (New York/New Jersey).
    The current match is USA vs. MEXICO (64th minute, USA leads 1 - 0).
    Provide responses in the detected language or in ${language} if unspecified. Keep responses under 3 sentences.
    
    You support stadium zones, gates, parking, medical, food, restrooms, and emergency exits.
    If the user asks for coordinates or directions, answer them and then append a special action tag at the very end of your response:
    [ACTION_FOCUS: <facility-id>] or [ACTION_ROUTE: <facility-id>, <route-type>]
    
    Available facility IDs:
    - gate-a (Entry Gate A North)
    - gate-b (Entry Gate B East)
    - gate-c (Entry Gate C South)
    - gate-d (Entry Gate D West)
    - med-east (Medical Station East)
    - med-west (Medical Station West)
    - food-north (Food Court North)
    - food-south (Food Court South)
    - rest-north (Restrooms North Block)
    - rest-south (Restrooms South Block)
    - park-1 (West General Parking P1)
    - park-2 (East EV & Rideshare P2)
    - exit-n (Emergency Exit North)
    - exit-s (Emergency Exit South)
    
    Route types are "standard" or "wheelchair".`;

    const result = await model.generateContent([systemPrompt, sanitizedQuery]);
    const responseText = await result.response.text();
    
    let action: AIResponse['action'] = undefined;
    let cleanText = responseText;

    const routeMatch = responseText.match(/\[ACTION_ROUTE:\s*([\w-]+)\s*,\s*(\w+)\]/);
    if (routeMatch) {
      action = {
        type: 'route',
        targetId: routeMatch[1],
        routeType: routeMatch[2] as 'standard' | 'wheelchair'
      };
      cleanText = responseText.replace(/\[ACTION_ROUTE:.*?\]/, '').trim();
    } else {
      const focusMatch = responseText.match(/\[ACTION_FOCUS:\s*([\w-]+)\]/);
      if (focusMatch) {
        action = {
          type: 'focus',
          targetId: focusMatch[1]
        };
        cleanText = responseText.replace(/\[ACTION_FOCUS:.*?\]/, '').trim();
      }
    }

    return {
      text: cleanText,
      action
    };
  } catch (error) {
    console.error("Gemini AI API Call failed, returning smart fallback:", error);
    return generateFallbackResponse(sanitizedQuery, language);
  }
};