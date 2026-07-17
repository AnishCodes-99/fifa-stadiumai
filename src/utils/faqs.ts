export interface FAQItem {
  id: string;
  category: 'match' | 'transit' | 'emergency' | 'concessions' | 'accessibility' | 'sustainability';
  question: Record<string, string>;
}

export const faqs: FAQItem[] = [
  // 1-10 Match & General
  {
    id: "faq-1",
    category: "match",
    question: {
      en: "What World Cup match is playing today?",
      es: "¿Qué partido de la Copa Mundial se juega hoy?",
      fr: "Quel match de Coupe du Monde se joue aujourd'hui?",
      de: "Welches WM-Spiel wird heute ausgetragen?",
      pt: "Qual jogo da Copa do Mundo está sendo disputado hoje?"
    }
  },
  {
    id: "faq-2",
    category: "match",
    question: {
      en: "What is the current score of the USA vs Mexico match?",
      es: "¿Cuál es el marcador actual del USA vs México?",
      fr: "Quel est le score actuel du match USA contre Mexique?",
      de: "Wie steht es aktuell beim Spiel USA gegen Mexiko?",
      pt: "Qual é o placar atual do jogo EUA x México?"
    }
  },
  {
    id: "faq-3",
    category: "match",
    question: {
      en: "What minute is the live match in?",
      es: "¿En qué minuto se encuentra el partido en vivo?",
      fr: "À quelle minute en est le match en direct?",
      de: "In welcher Minute befindet sich das Live-Spiel?",
      pt: "Em que minuto está a partida ao vivo?"
    }
  },
  {
    id: "faq-4",
    category: "match",
    question: {
      en: "What is the stadium attendance today?",
      es: "¿Cuál es la asistencia al estadio hoy?",
      fr: "Quelle est l'affluence du stade aujourd'hui?",
      de: "Wie hoch ist die heutige Zuschauerzahl im Stadion?",
      pt: "Qual é o público do estádio hoje?"
    }
  },
  {
    id: "faq-5",
    category: "match",
    question: {
      en: "Where will the FIFA World Cup 2026 finals be held?",
      es: "¿Dónde se celebrará la final de la Copa Mundial 2026?",
      fr: "Où se déroulera la finale de la Coupe du Monde 2026?",
      de: "Wo wird das Finale der FIFA WM 2026 ausgetragen?",
      pt: "Onde será realizada a final da Copa do Mundo FIFA 2026?"
    }
  },
  {
    id: "faq-6",
    category: "match",
    question: {
      en: "What is the tournament stage of today's match?",
      es: "¿Qué etapa del torneo se juega hoy?",
      fr: "À quelle étape du tournoi correspond le match d'aujourd'hui?",
      de: "In welcher Phase des Turniers befindet sich das heutige Spiel?",
      pt: "Qual é a fase do torneio do jogo de hoje?"
    }
  },
  {
    id: "faq-7",
    category: "match",
    question: {
      en: "Are team lineups available in the app?",
      es: "¿Están disponibles las alineaciones en la app?",
      fr: "Les compositions d'équipes sont-elles disponibles?",
      de: "Sind die Mannschaftsaufstellungen in der App verfügbar?",
      pt: "As escalações dos times estão disponíveis no aplicativo?"
    }
  },
  {
    id: "faq-8",
    category: "match",
    question: {
      en: "How can I access match statistics like possession?",
      es: "¿Cómo accedo a estadísticas como la posesión?",
      fr: "Comment puis-je accéder aux statistiques du match?",
      de: "Wie kann ich auf Spielstatistiken wie Ballbesitz zugreifen?",
      pt: "Como posso acessar as estatísticas do jogo, como posse de bola?"
    }
  },
  {
    id: "faq-9",
    category: "match",
    question: {
      en: "Which gate is closest to Section 100?",
      es: "¿Qué puerta está más cerca de la Sección 100?",
      fr: "Quelle porte est la plus proche de la Section 100?",
      de: "Welches Tor liegt der Sektion 100 am nächsten?",
      pt: "Qual portão fica mais próximo da Seção 100?"
    }
  },
  {
    id: "faq-10",
    category: "match",
    question: {
      en: "What time do stadium entry gates open?",
      es: "¿A qué hora abren las puertas de entrada?",
      fr: "À quelle heure ouvrent les portes du stade?",
      de: "Wann öffnen die Einlasstore des Stadions?",
      pt: "A que horas abrem os portões de entrada do estádio?"
    }
  },

  // 11-18 Accessibility
  {
    id: "faq-11",
    category: "accessibility",
    question: {
      en: "Is there a step-free wheelchair path to Gate A?",
      es: "¿Hay una ruta accesible para sillas de ruedas a la Puerta A?",
      fr: "Existe-t-il un chemin sans marche vers la Porte A?",
      de: "Gibt es einen stufenfreien Rollstuhlweg zu Tor A?",
      pt: "Existe um caminho sem degraus para cadeira de rodas até o Portão A?"
    }
  },
  {
    id: "faq-12",
    category: "accessibility",
    question: {
      en: "Where are the elevator towers located?",
      es: "¿Dónde se encuentran las torres de ascensores?",
      fr: "Où se trouvent les ascenseurs?",
      de: "Wo befinden sich die Aufzugtürme?",
      pt: "Onde ficam as torres de elevadores?"
    }
  },
  {
    id: "faq-13",
    category: "accessibility",
    question: {
      en: "Where can I request audio descriptive commentary?",
      es: "¿Dónde solicito comentarios descriptivos de audio?",
      fr: "Où puis-je demander des commentaires audio-descriptifs?",
      de: "Wo kann ich eine audiodeskriptive Spielbeschreibung anfordern?",
      pt: "Onde posso solicitar comentários de áudio descritivo?"
    }
  },
  {
    id: "faq-14",
    category: "accessibility",
    question: {
      en: "Where is the Sensory-Friendly quiet room?",
      es: "¿Dónde está la sala sensorial tranquila?",
      fr: "Où se trouve la salle de repos sensorielle?",
      de: "Wo befindet sich der sensorische Ruheraum?",
      pt: "Onde fica a sala sensorial reservada?"
    }
  },
  {
    id: "faq-15",
    category: "accessibility",
    question: {
      en: "Are strollers permitted inside MetLife Stadium?",
      es: "¿Se permiten cochecitos de bebé en el estadio?",
      fr: "Les poussettes sont-elles autorisées dans le stade?",
      de: "Sind Kinderwagen im MetLife Stadium erlaubt?",
      pt: "Carrinhos de bebê são permitidos no MetLife Stadium?"
    }
  },
  {
    id: "faq-16",
    category: "accessibility",
    question: {
      en: "How do I claim designated ADA companion seating?",
      es: "¿Cómo solicito asientos de acompañante ADA?",
      fr: "Comment réserver des sièges d'accompagnateur PMR?",
      de: "Wie beanspruche ich ausgewiesene ADA-Begleitsitze?",
      pt: "Como solicito assentos reservados para acompanhantes ADA?"
    }
  },
  {
    id: "faq-17",
    category: "accessibility",
    question: {
      en: "Is there a braille map available at Fan Service?",
      es: "¿Hay mapas en braille en Atención al Fan?",
      fr: "Existe-t-il des cartes en braille au point info?",
      de: "Gibt es eine Braille-Karte am Fan-Service-Schalter?",
      pt: "Existe um mapa em braile no Serviço de Atendimento ao Torcedor?"
    }
  },
  {
    id: "faq-18",
    category: "accessibility",
    question: {
      en: "Where can I borrow a sensory-bag noise canceler?",
      es: "¿Dónde alquilo auriculares para la hipersensibilidad?",
      fr: "Où emprunter un casque antibruit pour l'hypersensibilité?",
      de: "Wo kann ich geräuschunterdrückende Kopfhörer ausleihen?",
      pt: "Onde posso pegar emprestado protetores auriculares para hipersensibilidade?"
    }
  },

  // 19-26 Emergency
  {
    id: "faq-19",
    category: "emergency",
    question: {
      en: "How does the in-app SOS distress button work?",
      es: "¿Cómo funciona el botón SOS en la app?",
      fr: "Comment fonctionne le bouton SOS de l'application?",
      de: "Wie funktioniert der SOS-Notrufknopf in der App?",
      pt: "Como funciona o botão de emergência SOS no aplicativo?"
    }
  },
  {
    id: "faq-20",
    category: "emergency",
    question: {
      en: "Where is the closest First-Aid medical tent?",
      es: "¿Dónde está la carpa médica de primeros auxilios?",
      fr: "Où se trouve la tente médicale de premiers secours?",
      de: "Wo befindet sich das nächste Erste-Hilfe-Zelt?",
      pt: "Onde fica a tenda médica de primeiros socorros mais próxima?"
    }
  },
  {
    id: "faq-21",
    category: "emergency",
    question: {
      en: "What should I do if an evacuation is ordered?",
      es: "¿Qué debo hacer si se ordena una evacuación?",
      fr: "Que dois-je faire si une évacuation est ordonnée?",
      de: "Was muss ich tun, wenn eine Evakuierung angeordnet wird?",
      pt: "O que devo fazer se for ordenada uma evacuação?"
    }
  },
  {
    id: "faq-22",
    category: "emergency",
    question: {
      en: "Where are the emergency exit zones located?",
      es: "¿Dónde se ubican las zonas de salida de emergencia?",
      fr: "Où se situent les zones de sortie de secours?",
      de: "Wo befinden sich die Notausgänge?",
      pt: "Onde ficam localizadas as zonas de saída de emergência?"
    }
  },
  {
    id: "faq-23",
    category: "emergency",
    question: {
      en: "Where can I report a fire or hazard alarm?",
      es: "¿Dónde reporto un peligro de incendio?",
      fr: "Où signaler un risque d'incendie ou un danger?",
      de: "Wo kann ich einen Brand oder eine Gefahrenquelle melden?",
      pt: "Onde posso relatar um incêndio ou situação de perigo?"
    }
  },
  {
    id: "faq-24",
    category: "emergency",
    question: {
      en: "Can security personnel track my live GPS location?",
      es: "¿Puede seguridad rastrear mi GPS en una emergencia?",
      fr: "La sécurité peut-elle suivre mon GPS en cas d'urgence?",
      de: "Kann der Sicherheitsdienst im Notfall meinen GPS-Ort orten?",
      pt: "A equipe de segurança pode rastrear minha localização GPS em caso de emergência?"
    }
  },
  {
    id: "faq-25",
    category: "emergency",
    question: {
      en: "What is the emergency phone number inside the stadium?",
      es: "¿Cuál es el número telefónico de emergencia local?",
      fr: "Quel est le numéro d'urgence local du stade?",
      de: "Wie lautet die Notrufnummer im Stadion?",
      pt: "Qual é o número de telefone de emergência interno do estádio?"
    }
  },
  {
    id: "faq-26",
    category: "emergency",
    question: {
      en: "Are automated external defibrillators (AED) available?",
      es: "¿Hay desfibriladores externos automáticos (DEA) cerca?",
      fr: "Des défibrillateurs (DEA) sont-ils disponibles à proximité?",
      de: "Sind automatisierte externe Defibrillatoren (AED) verfügbar?",
      pt: "Existem desfibriladores externos automáticos (DEA) disponíveis?"
    }
  },

  // 27-34 Transit & Parking
  {
    id: "faq-27",
    category: "transit",
    question: {
      en: "How do I take the Meadowlands Rail Link?",
      es: "¿Cómo tomo el Meadowlands Rail Link?",
      fr: "Comment prendre la liaison ferroviaire Meadowlands?",
      de: "Wie fahre ich mit dem Meadowlands Rail Link?",
      pt: "Como pego o Meadowlands Rail Link?"
    }
  },
  {
    id: "faq-28",
    category: "transit",
    question: {
      en: "How often do Shuttle Express buses run?",
      es: "¿Con qué frecuencia pasan los autobuses express?",
      fr: "À quelle fréquence circulent les navettes Express?",
      de: "Wie oft fahren die Shuttle-Express-Busse?",
      pt: "Com que frequência os ônibus Shuttle Express circulam?"
    }
  },
  {
    id: "faq-29",
    category: "transit",
    question: {
      en: "Where is the designated Uber and rideshare hub?",
      es: "¿Dónde está la parada de Uber y vehículos compartidos?",
      fr: "Où se trouve la zone de dépose Uber et covoiturage?",
      de: "Wo befindet sich der Sammelpunkt für Uber und Rideshares?",
      pt: "Onde fica o ponto designado para Uber e carros de aplicativo?"
    }
  },
  {
    id: "faq-30",
    category: "transit",
    question: {
      en: "How do I get to East EV parking Lot P2?",
      es: "¿Cómo llego al estacionamiento ecológico Lote P2?",
      fr: "Comment se rendre au parking électrique Lot P2?",
      de: "Wie gelange ich zum E-Auto-Parkplatz Lot P2?",
      pt: "Como faço para chegar ao estacionamento elétrico Lote P2?"
    }
  },
  {
    id: "faq-31",
    category: "transit",
    question: {
      en: "What is the cost of general parking at Lot P1?",
      es: "¿Cuánto cuesta estacionar en el Lote P1?",
      fr: "Quel é le prix du parking au Lot P1?",
      de: "Wie viel kostet das Parken auf Lot P1?",
      pt: "Qual é o valor do estacionamento geral no Lote P1?"
    }
  },
  {
    id: "faq-32",
    category: "transit",
    question: {
      en: "Are tailgating activities permitted in parking lots?",
      es: "¿Se permite hacer asados/tailgate en los lotes?",
      fr: "Les barbecues (tailgating) sont-ils permis sur les parkings?",
      de: "Ist Grillen und Beisammensein (Tailgating) auf den Parkplätzen erlaubt?",
      pt: "É permitido fazer churrasco (tailgating) nos estacionamentos?"
    }
  },
  {
    id: "faq-33",
    category: "transit",
    question: {
      en: "When is the last train departing back to NY Penn Station?",
      es: "¿Cuándo sale el último tren a NY Penn Station?",
      fr: "Quand part le dernier train vers NY Penn Station?",
      de: "Wann fährt der letzte Zug zurück nach NY Penn Station?",
      pt: "Quando parte o último trem de volta para a NY Penn Station?"
    }
  },
  {
    id: "faq-34",
    category: "transit",
    question: {
      en: "How do I book a wheelchair-accessible shuttle ride?",
      es: "¿Cómo reservo un traslado en minivan adaptada ADA?",
      fr: "Comment réserver une navette adaptée aux fauteuils?",
      de: "Wie buche ich eine Fahrt mit einem rollstuhlgerechten Shuttle?",
      pt: "Como faço para reservar uma viagem de shuttle acessível para cadeira de rodas?"
    }
  },

  // 35-42 Sustainability
  {
    id: "faq-35",
    category: "sustainability",
    question: {
      en: "How do I earn Eco-Points in the app?",
      es: "¿Cómo gano Eco-Puntos en la aplicación?",
      fr: "Comment puis-je gagner des Éco-Points dans l'application?",
      de: "Wie sammle ich Eco-Punkte in der App?",
      pt: "Como faço para acumular Eco-Pontos no aplicativo?"
    }
  },
  {
    id: "faq-36",
    category: "sustainability",
    question: {
      en: "Where are the plastic bottle recycling RVM machines?",
      es: "¿Dónde están las máquinas de reciclaje RVM de plástico?",
      fr: "Où se trouvent les collecteurs RVM de bouteilles?",
      de: "Wo stehen die Pfandflaschenautomaten (RVM)?",
      pt: "Onde ficam as máquinas de reciclagem RVM para garrafas plásticas?"
    }
  },
  {
    id: "faq-37",
    category: "sustainability",
    question: {
      en: "What challenges can I complete to offset carbon footprint?",
      es: "¿Qué desafíos completo para compensar mi huella CO₂?",
      fr: "Quels défis réaliser pour compenser mon empreinte carbone?",
      de: "Welche Herausforderungen kann ich annehmen, um meinen CO₂-Fußabdruck auszugleichen?",
      pt: "Quais desafios posso completar para compensar minha pegada de carbono?"
    }
  },
  {
    id: "faq-38",
    category: "sustainability",
    question: {
      en: "Where can I redeem Eco-Points for food discount?",
      es: "¿Dónde canjeo Eco-Puntos por descuentos en comida?",
      fr: "Où échanger des Éco-Points contre des remises repas?",
      de: "Wo kann ich Eco-Punkte gegen Rabatte auf Essen einlösen?",
      pt: "Onde posso resgatar meus Eco-Pontos por descontos em alimentação?"
    }
  },
  {
    id: "faq-39",
    category: "sustainability",
    question: {
      en: "How much solar power does the canopy capture?",
      es: "¿Cuánta energía solar capta el techo del estadio?",
      fr: "Quelle quantité d'énergie solaire le toit capte-t-il?",
      de: "Wie viel Solarstrom fängt das Stadiondach auf?",
      pt: "Quanto de energia solar a cobertura do estádio capta?"
    }
  },
  {
    id: "faq-40",
    category: "sustainability",
    question: {
      en: "What is the green transit discount incentive?",
      es: "¿Qué es el incentivo de descuento por tránsito verde?",
      fr: "Qu'est-ce que l'avantage financier lié aux transports éco?",
      de: "Welcher Rabatt-Anreiz gilt für umweltfreundliches Reisen?",
      pt: "O que é o incentivo de desconto para transporte ecológico?"
    }
  },
  {
    id: "faq-41",
    category: "sustainability",
    question: {
      en: "Is organic compost waste collected separately?",
      es: "¿Se recogen los residuos de compost orgánico por separado?",
      fr: "Les déchets organiques compostables sont-ils triés?",
      de: "Werden organische Bioabfälle getrennt gesammelt?",
      pt: "O lixo orgânico para compostagem é coletado separadamente?"
    }
  },
  {
    id: "faq-42",
    category: "sustainability",
    question: {
      en: "How is stadium water consumption monitored?",
      es: "¿Cómo se monitorea el consumo de agua del estadio?",
      fr: "Comment la consommation d'eau du stade est-elle mesurée?",
      de: "Wie wird der Wasserverbrauch des Stadions überwacht?",
      pt: "Como é monitorado o consumo de água do estádio?"
    }
  },

  // 43-50 Concessions & Dining
  {
    id: "faq-43",
    category: "concessions",
    question: {
      en: "Where is Food Court North located?",
      es: "¿Dónde se ubica el Patio de Comidas Norte?",
      fr: "Où se trouve le Food Court Nord?",
      de: "Wo befindet sich die Gastronomie Nord?",
      pt: "Onde fica a Praça de Alimentação Norte?"
    }
  },
  {
    id: "faq-44",
    category: "concessions",
    question: {
      en: "What is the estimated queue time at Food Court South?",
      es: "¿Cuál es la fila estimada en el Patio de Comidas Sur?",
      fr: "Quel est le temps d'attente estimé au Food Court Sud?",
      de: "Wie lang ist die Wartezeit bei Gastronomie Süd?",
      pt: "Qual é o tempo estimado de fila na Praça de Alimentação Sul?"
    }
  },
  {
    id: "faq-45",
    category: "concessions",
    question: {
      en: "Does Food Court North offer Halal or Vegan options?",
      es: "¿Tiene el patio norte opciones veganas o halal?",
      fr: "Le Food Court Nord propose-t-il des options véganes ou halal?",
      de: "Gibt es bei Gastronomie Nord halal- oder vegane Speisen?",
      pt: "A Praça de Alimentação Norte oferece opções Halal ou Veganas?"
    }
  },
  {
    id: "faq-46",
    category: "concessions",
    question: {
      en: "Is MetLife Stadium cash-free?",
      es: "¿El MetLife Stadium es libre de efectivo?",
      fr: "Le stade MetLife est-il sans argent liquide (cash-free)?",
      de: "Wird im MetLife Stadium bargeldlos bezahlt?",
      pt: "O MetLife Stadium aceita apenas pagamento em cartão (sem dinheiro)?"
    }
  },
  {
    id: "faq-47",
    category: "concessions",
    question: {
      en: "Where are reverse cash-to-card kiosks located?",
      es: "¿Dónde están los cajeros de efectivo a tarjeta prepago?",
      fr: "Où trouver les bornes de dépôt cash pour carte prépayée?",
      de: "Wo befinden sich Wechselautomaten für Bar- zu Kartenzahlung?",
      pt: "Onde ficam as máquinas para conversão de dinheiro em cartão pré-pago?"
    }
  },
  {
    id: "faq-48",
    category: "concessions",
    question: {
      en: "Where is the stadium Lost & Found counter?",
      es: "¿Dónde está la oficina de objetos perdidos?",
      fr: "Où se trouve le bureau des objets trouvés?",
      de: "Wo ist das Fundbüro des Stadions?",
      pt: "Onde fica o balcão de Achados e Perdidos do estádio?"
    }
  },
  {
    id: "faq-49",
    category: "concessions",
    question: {
      en: "Are there water fountains where I can fill reusable bottles?",
      es: "¿Hay fuentes de agua para rellenar botellas reutilizables?",
      fr: "Y a-t-il des fontaines à eau pour recharger les gourdes?",
      de: "Gibt es Trinkbrunnen zum Auffüllen von Mehrwegflaschen?",
      pt: "Existem bebedouros para abastecer garrafas reutilizáveis?"
    }
  },
  {
    id: "faq-50",
    category: "concessions",
    question: {
      en: "Can I order snacks directly to my seat using the app?",
      es: "¿Puedo comprar comida a mi asiento con la app?",
      fr: "Puis-je commander des snacks vers mon siège avec l'app?",
      de: "Kann ich Essen per App direkt an meinen Platz bestellen?",
      pt: "Posso pedir comida diretamente para o meu assento usando o aplicativo?"
    }
  }
];
