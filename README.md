[README.md](https://github.com/user-attachments/files/30127054/README.md)
# ⚽ StadiumMind AI

### **AI-Powered Smart Stadium Intelligence Platform for the FIFA World Cup 2026**

[![GitHub license](https://img.shields.io/github/license/AnishCodes-99/fifastadium-ai?style=for-the-badge&color=orange)](https://github.com/AnishCodes-99/fifastadium-ai/blob/master/LICENSE)
[![React Version](https://img.shields.io/badge/react-v18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-v5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-v5.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/firebase-v10.12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-v3.4-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-blueviolet?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/)

---

## 📖 Executive Summary & About the Project

**StadiumMind AI** is an enterprise-grade, hackathon-winning Smart Stadium Intelligence Platform designed specifically for the **FIFA World Cup 2026** at MetLife Stadium (New York/New Jersey).

Managing stadium logistics during global sporting events presents monumental challenges, including massive crowd sizes, accessibility issues, language barriers, public transit delays, and emergency response times. StadiumMind AI bridges the gap between stadium operations and fan experience by integrating **Google Gemini AI**, interactive **Leaflet mapping**, and **real-time IoT telemetry** into a unified, responsive dashboard wrapped in a premium dark glassmorphism user interface.

Whether you are a fan navigating concessions, a medic responding to an SOS alert, or an administrator overriding gate locks, StadiumMind AI provides instantaneous, localized intelligence to ensure safety, efficiency, and sustainability.

---

## 🌟 Project Vision

The vision of StadiumMind AI is to establish a new global standard for sports venue orchestration. By leveraging context-aware artificial intelligence, edge-computed maps, and real-time data streaming, the platform aims to:
* **Elevate Fan Experience**: Dispel stadium friction by providing real-time food queue telemetry, step-free navigation, and instant multilingual assistance.
* **Streamline Venue Security**: Empower rapid-response units with computer vision threat overlays, live logs, and active incident mapping.
* **Drive Global Sustainability**: Engage fans in reducing event carbon footprints through gamified public transit incentives and interactive waste recycling.
* **Unify Smart Infrastructure**: Provide a single operational console (Digital Twin Concept) for matching stadium-wide telemetry to active incident dispatches.

---

## ⚠️ Problem Statement

Modern stadiums face critical structural bottlenecks during events with 80,000+ attendees:
1. **Crowd Congestion & Ingress Bottlenecks**: Long security gate lines leave thousands stranded outside during kickoff.
2. **Navigation Complexity**: Stadium concourses are difficult to navigate for international fans.
3. **Emergency Dispatch Latency**: Traditional radio alerts delay responder dispatch to fans in medical distress.
4. **Accessibility Barriers**: Wheelchair users lack clear, live, step-free navigation paths.
5. **Transit Delays & Commuter Panic**: Commuters lack real-time bus/train occupancy indexes, leading to overcrowding.
6. **Multilingual Friction**: Language differences block international spectators from accessing safety directions.
7. **Waste & Energy Management**: Stadiums consume immense energy and create tons of plastic waste with minimal fan engagement.

---

## 💡 The Solution

StadiumMind AI resolves these challenges through a modular, intelligent architecture:

| Problem Area | StadiumMind AI Feature | Under-the-Hood Technology |
| :--- | :--- | :--- |
| **Ingress Queues** | Live Gate Telemetry & Smart Ingress Suggestions | IoT simulator + React state tracking |
| **Concourse Navigation** | Dynamic Navigation & Focal Point Tracking | OpenStreetMap API + Leaflet.js |
| **Emergency Incidents** | SOS Distress Beacon & CommandCenter Dispatch | Real-time Firestore sync & dispatch handlers |
| **Accessibility Barriers** | ADA Step-Free Routing Option | Custom Coordinate Route Generators |
| **Transit Confusion** | Departure Transit Guide & Occupancy Tracker | Real-time train/shuttle occupancy tickers |
| **Language Barriers** | Dynamic Full-Screen Locale Translators | LanguageProvider Context Engine |
| **Waste & Carbon Draw** | Eco Challenges, Solar Yields, & Points System | Recharts graphs + Gamification hooks |
| **General Questions** | Open-Ended Google Gemini Assistant | Google Generative AI API (Gemini 1.5 Flash) |

---

## ⚡ Major Features

### 🤖 AI Stadium Assistant (`AIAssistant.tsx`)
* **Purpose**: Provides instant answers regarding stadium queries, concession wait times, and emergency alerts.
* **Benefits**: Removes language friction; provides voice assistant compatibility and text-to-speech for impaired fans.
* **How it Works**: Connects to the **Google Gemini 1.5 Flash API**. If the prompt contains mapping targets (e.g., "Where is the nearest medical center?"), the AI appends an action code `[ACTION_ROUTE: med-west, standard]`, which automatically draws the navigation path on the map.
* **User Experience**: Chat history styled with premium orange user speech bubbles, interactive typing indicators, and a floating FAQ menu.

### 🗺️ Interactive Map (`StadiumMap.tsx`)
* **Purpose**: Visualizes MetLife Stadium gates, food courts, restrooms, parking lots, medical tents, and exits.
* **Benefits**: Displays wait-times and capacity status dynamically.
* **How it Works**: Renders OpenStreetMap tiles with Leaflet.js. Includes interactive filters to show only Gates, Restrooms, Safety Exits, etc.
* **User Experience**: Smooth zooming and custom-colored pulsing marker bubbles indicating queue congestion (Green = Open, Orange = Congested, Red = Closed/Alarm).

### 🚨 Emergency SOS System (`AlertBanner.tsx`)
* **Purpose**: High-speed distress channel for fans in medical or security crises.
* **Benefits**: Bypasses phone lines; broadcasts location coordinates directly to the security dispatch board.
* **How it Works**: Pressing the SOS trigger pinpoints user location, opens an emergency incident in Firestore, and lights up the global Red Evacuation banner across all screens.
* **User Experience**: Pulsing sirens and high-contrast alert bars guide the user to the nearest open safety gates.

### 🛡️ CommandCenter Surveillance Panel (`CommandCenter.tsx`)
* **Purpose**: Security dashboard for stadium staff.
* **Benefits**: Centralizes surveillance, gate control overrides, and responder dispatching.
* **How it Works**: Displays a 2x2 grid of canvas-rendered CCTV streams with simulated computer vision bounding boxes (object threat detection). Allows staff to lock/unlock gates with one-click IoT toggles.
* **User Experience**: Dark console style with green scanlines and warning tickers.

### ♻️ Sustainability Dashboard (`SustainabilityDashboard.tsx`)
* **Purpose**: Encourages fans to participate in green initiatives.
* **Benefits**: Gamifies environmental sustainability.
* **How it Works**: Tacks user completion of challenges (e.g., riding the transit train, dropping plastic in Reverse Vending Machines). Integrates Recharts area and bar charts tracking solar canopy offsets.
* **User Experience**: Eco-Points counter with a leaderboard ranking top fans.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18.3 (TypeScript) | Core SPA architecture, type safety, modular structures |
| **Build Tool** | Vite 5.4 | Ultra-fast bundling, hot module reloading (HMR) |
| **Styling** | Tailwind CSS 3.4 | Utility-first styling, glassmorphism UI layouts |
| **State Management** | React Context API | Global states for Auth, Language Locales, and Map routes |
| **Maps Engine** | Leaflet.js & OpenStreetMap | Mapping, geocodes, custom SVG marker renderers |
| **AI Processing** | Google Gemini API SDK | Natural language comprehension, query translation |
| **Database & Sync** | Cloud Firestore | Real-time sync for dispatch logs, user profiles, and alerts |
| **Authentication** | Firebase Authentication | Secure login, role-based checks (Fan/Staff/Admin) |
| **Charts** | Recharts 2.15 | Solar canopy yields, occupancy curves, waste analysis |
| **Animations** | Framer Motion 10.16 | Fade-ins, slide navigation drawers, card popups |
| **Icons** | Lucide React | High-quality SVG icons |

---

## 🏗️ Architecture Diagrams

### 1. Overall System Architecture
```mermaid
graph TD
  User[User / Fan / Admin] -->|HTTPS| WebClient[React 18 SPA]
  WebClient -->|Hash Router| UI[Views & Dashboards]
  WebClient -->|API Requests| Gemini[Google Gemini API]
  WebClient -->|Auth / Sync| Firebase[Firebase SDK]
  Firebase -->|Auth Service| FirebaseAuth[Firebase Auth]
  Firebase -->|Realtime database| Firestore[Cloud Firestore]
  Firestore -->|Events Telemetry| Mocks[Mock Nodes & Cloud Functions]
```

### 2. Frontend Navigation Flow
```mermaid
graph TD
  Start([Start]) --> Landing[Landing Page]
  Landing -->|Select Role / Login| Auth{Auth Checks}
  Auth -->|Failed| Login[LoginPage]
  Auth -->|Success / Bypass| Layout[App Shell Layout]
  Layout --> Dashboard[Smart Dashboard]
  Layout --> Map[Interactive Leaflet Map]
  Layout --> AI[Gemini AI Assistant]
  Layout --> CommandCenter[Command Center]
  Layout --> Sustainability[Sustainability Panel]
  Layout --> Admin[Admin Override Panel]
```

### 3. Real-Time Emergency Flow
```mermaid
graph TD
  FanSOS[Fan presses SOS] -->|Write Event| Firestore[(Cloud Firestore)]
  Firestore -->|Real-time Sync| Dispatcher[Command Center Alarm Board]
  Dispatcher -->|Deploy Responder| Medic[Paramedic Team dispatched]
  FanSOS -->|Broadcase Alert| Banner[Evacuation Banner displayed to all users]
  Banner -->|Draw Path| Route[ADA Step-Free Route calculated to nearest Gate]
```

### 4. Interactive Navigation Intelligence
```mermaid
graph TD
  Map[Map Interface] --> Click[Click Landmark]
  Click --> Compute{Route Type}
  Compute -->|Standard| Direct[Calculate Direct Path - 410m, 5 mins]
  Compute -->|ADA Wheelchair| ADA[Calculate Step-Free Route - 620m, 9 mins]
  Direct --> Draw[Draw Polyline on Leaflet]
  ADA --> Draw
```

### 5. Google Gemini AI Query Flow
```mermaid
graph TD
  Input[User Prompt] --> Validate{Check API Key}
  Validate -->|Configured| GeminiCall[Query Gemini 1.5 API]
  Validate -->|Missing| MockFallback[Smart Offline Fallback]
  GeminiCall --> Parse[Extract Action Tags]
  MockFallback --> Parse
  Parse -->|Focus Action| ZoomMap[Focus Map on Landmark]
  Parse -->|Route Action| DrawRoute[Draw Route on Map]
  Parse --> Output[Display Text Answer]
```

---

## 📁 Folder Structure

```
fifastadium-ai/
├── public/                 # Static public resources
├── src/
│   ├── components/         # Modular presentation pages & widgets
│   │   ├── Admin/          # AdminPanel.tsx (Telemetry controls)
│   │   ├── AI/             # AIAssistant.tsx (Gemini chat window)
│   │   ├── Auth/           # LoginPage.tsx (Bypass routes)
│   │   ├── CommandCenter/  # CommandCenter.tsx (CCTV CV & alarm board)
│   │   ├── Dashboard/      # SmartDashboard.tsx (Recharts telemetry widgets)
│   │   ├── Landing/        # LandingPage.tsx (Intro view)
│   │   ├── Map/            # StadiumMap.tsx (Leaflet interactive controller)
│   │   ├── Shared/         # Layout.tsx (Sidebar navigation, Anish Wani card)
│   │   │                   # AlertBanner.tsx (SIREN alerts)
│   │   └── Sustainability/ # SustainabilityDashboard.tsx (Eco rewards)
│   ├── context/            # Global state context hooks
│   │   ├── AuthContext.tsx
│   │   ├── LanguageContext.tsx
│   │   ├── RouterContext.tsx
│   │   └── StadiumStateContext.tsx
│   ├── services/           # External API endpoints
│   │   ├── firebase.ts     # Firebase Config
│   │   └── gemini.ts       # Google Gemini Core
│   ├── types/              # TypeScript models
│   │   └── stadium.ts      
│   ├── utils/              # Hardcoded data & lists
│   │   └── faqs.ts         # 50 FAQs translated
│   ├── App.tsx             # Application router controller
│   ├── index.css           # Global CSS & overrides
│   ├── main.tsx            # DOM node mount
│   └── vite-env.d.ts       # Global typings & asset declaration
├── package.json            # NPM scripts & dependencies
├── postcss.config.js       # Styles processing
├── tailwind.config.js      # Styling design system settings
└── tsconfig.json           # TS configurations
```

---

## 🔄 User Flow Step-by-Step

1. **Landing Page**: Fans are greeted with modern, glowing animations highlighting tournament stats. Click **Launch Dashboard**.
2. **Authentication**: Sign in securely, or use the **Developer Bypass buttons** (Fan / Staff / Admin) to simulate different security clearance roles.
3. **Smart Dashboard**: Instantly view the score of the live match (USA vs. Mexico), average wait-times at gates, wind/canopy status, and current attendance.
4. **Interactive Map**: Filter landmarks on the map. Select any gate, food court, or medical tent to view queue stats, and click **Direct Path** or **ADA Route** to render the path on the map.
5. **AI Assistant**: Open the chat window. Ask any question or choose one of the 50 suggestions from the **Suggested FAQs Guide** to get localized answers.
6. **Sustainability**: Review active eco-challenges, mark them complete, and claim Eco-Points to claim concession voucher rewards.
7. **Command Center** *(Staff/Admin clearance)*: Monitor live CCTV video streams, dispatch paramedics, or lock/unlock stadium gates.
8. **Admin Override** *(Admin clearance)*: Increment match scores, adjust sensor heartbeat intervals, or trigger emergency drills.
9. **Emergency SOS**: Press the SOS trigger. Watch the global alert banner display, the map focus on medical teams, and the safe exit routes compute.
10. **Log Out**: Securely sign out.

---

## 🖥️ UI Pages Detail

### 1. Landing Page
* Renders a premium, futuristic hero banner with deep space styling.
* Displays live metric tickers: **82.5K Fans**, **4.8m Queue Wait**, **<1.2s API Latency**, and **100% ADA Compliance**.

### 2. Smart Dashboard
* Real-time match scoring component (USA vs. Mexico).
* Congestion warning cards.
* Meteorological data showing canopy position (OPEN/CLOSED) and precipitation chance.
* Stadium Ingress Area Chart displaying the accumulation rate of fans over time.

### 3. AI Assistant
* Full-height conversation panel featuring custom avatar bubbles.
* **Suggested FAQs Selector**: Dropdown showing the 50 FAQs. Clicking a question automatically fires a request.
* **Voice Synthesis Toggles**: Allows fans to listen to the AI's response via voice output.

### 4. Interactive Map
* Embedded Leaflet map centered on MetLife Stadium coordinates.
* Category filtering pills at the top.
* Interactive routing sidebar display showing calculated route travel times.

### 5. Command Center
* 2x2 grid of simulated black security feeds overlaying bounding boxes around targets.
* Incident dispatch logs with dispatcher dispatch controls (e.g. `Dispatch Team`, `Confirm On-Scene`, `Mark Resolved`).

### 6. Admin Panel
* Manual match score editors.
* System state controls for triggering simulated emergency drills.
* Heartbeat speed configuration slider (controls IoT sensor interval).

### 7. Sustainability Dashboard
* Eco points summary widget.
* Bar charts mapping recycled vs. general trash tons over matches.
* Challenge claim cards.

---

## 🤖 AI Engineering Deep-Dive

### Live Gemini Integration
StadiumMind AI utilizes the `@google/generative-ai` package to initialize the model client:
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
```

### Action Parsing
The system prompt teaches the AI model to output specialized command triggers at the end of its response:
`"To find the medical center, go to Gate D. [ACTION_ROUTE: med-west, standard]"`
The React app parses these codes using regex filters:
```typescript
const routeMatch = responseText.match(/\[ACTION_ROUTE:\s*([\w-]+)\s*,\s*(\w+)\]/);
if (routeMatch) {
  // Triggers map calculation dynamically
}
```

### Smart Offline Fallback
To ensure a robust user experience, the helper automatically switches to a keyword-matching lookup engine if the API key is not configured, matching questions to pre-defined answers in all 5 languages, and supporting open-ended topics with conversational general fallbacks:
```typescript
const generalResponses = {
  en: `Regarding "${query}", that is an interesting topic! As an AI assistant, I can help you with anything...`
};
```

---

## 🔒 Security & Role Clearance

StadiumMind AI enforces strict client-side and database-level security protocols:

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only logged-in users can write security alarms
    match /incidents/{incidentId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    // Only administrators can edit facilities/gate configurations
    match /facilities/{facilityId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == 'admin';
    }
  }
}
```

### Role-Based Access Controls (RBAC)
User roles are mapped via Context API and gate page access:
* **Fan**: Access to Dashboard, Map, AI Assistant, and Sustainability.
* **Staff**: Access to all Fan views + CCTV CommandCenter to dispatch paramedics.
* **Admin**: Unrestricted access + Admin Override Panel.

---

## 🚀 Installation & Setup Guide

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/AnishCodes-99/fifastadium-ai.git
cd fifastadium-ai
```

### 2. Install Dependencies
```bash
npm install --no-audit --no-fund --prefer-offline
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```bash
copy .env.example .env
```
Fill in your Google Gemini API key:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:3001`** in your browser.

### 5. Build for Production
```bash
npm run build
```
Vite will compile the code to the `/dist` directory.

### 6. Preview the Build
```bash
npm run preview
```

---

## ⚙️ Environment Variables

| Variable | Description | Default Value | Required |
| :--- | :--- | :--- | :--- |
| `VITE_GEMINI_API_KEY` | Google Generative AI API Key | *(None)* | Yes (for AI features) |
| `VITE_FIREBASE_API_KEY` | Firebase API Client Key | *(None)* | Optional (Bypasses to offline) |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project Identifier | *(None)* | Optional (Bypasses to offline) |

---

## 📦 Deployment

### Firebase Hosting
1. Install the Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in and initialize the project:
   ```bash
   firebase login
   ```
3. Deploy the build directory:
   ```bash
   firebase deploy
   ```

---

## 🌙 Offline Mode & Mock Telemetry

If no Firebase credentials are found, StadiumMind AI boots into **Offline Mock Mode**:
* **Local Storage Persistence**: Persists user profiles and sustainability points inside the browser.
* **Mock Heartbeat Ticker**: The context fires background tickers that periodically update gate wait-times, simulate medical alerts, and add logs to the Command Center dashboard.
* **OpenStreetMap Sandbox**: Maps load via public CDNs.

---

## ⚡ Performance Optimizations

1. **Dynamic Code Splitting**: Charts and Maps (Leaflet/Recharts) are heavy modules. They are loaded dynamically using React's Code Splitting to optimize first-contentful-paint (FCP).
2. **WebGL Rendering**: Leaflet uses canvas markers, avoiding DOM bloat when rendering 100+ coordinates.
3. **Framer Motion Layout Isolation**: Animations use `transform` instead of layout changes (such as width/height), preventing page reflows.
4. **Memoized Calculations**: Route metrics are memoized to avoid recalculating coordinate lists during renders.

---

## ♿ Accessibility Standard (ADA Compliance)

* **Semantic HTML**: Form inputs include associated labels, and SVGs include descriptive titles.
* **ARIA Attributes**: Dropdowns and tabs feature `aria-expanded` and role assignments.
* **Color Contrast**: Main color tokens exceed WCAG AA contrast standards.
* **Accessible Shuttles**: Navigation routes calculate step-free paths, prioritizing wheelchair lifts and avoiding staircases.

---

## ♻️ Sustainability & Carbon Offsets

* **Solar Telemetry**: Shows active solar yield offsets.
* **Eco-Points Challenge System**: Rewards fans for taking green transit (e.g. Meadowlands Rail) or dropping plastic bottles into vending machines.
* **Points Redemption**: Earned points can be exchanged for concession vouchers, reducing paper printouts.

---

## 🔮 Future Scope

1. **Direct IoT Hardware Integrations**: Connect real Bluetooth beacons to track gate queues.
2. **Computer Vision CCTV Feeds**: Hook actual RTSP security streams into threat detection modules.
3. **Augmented Reality (AR) HUD**: Guide fans inside the stadium via AR paths on their cameras.
4. **Predictive Crowding AI**: Train models to predict crowd congestion 30 minutes in advance.
5. **3D Digital Twin**: Build a complete 3D WebGL model of MetLife Stadium.
6. **Smart Parking Ticket Scanner**: Validate QR codes and assign closest parking bays.
7. **Wearable IoT Device Sync**: Connect smart wristbands for location tracking.
8. **Drone Security Monitoring**: Coordinate security drones to locate distress beacons.
9. **Automated Fire Sprinkler Toggles**: Trigger sprinklers directly from the CommandCenter.
10. **Biometric Face-ID Gate Entry**: Facilitate rapid entry via face scanners.
11. **Direct Food Pre-Ordering**: Let fans order food directly from map concession stands.
12. **Acoustic Noise Tickers**: Monitor sensor decibel levels to alert security of crowd unrest.
13. **5G Ultra-Wideband Routing**: Deploy Edge AI microservices over high-speed networks.
14. **In-Seat Delivery Coordinates**: Calculate routes for concessions staff to deliver food to seats.
15. **Sensory Friendly Space Mappers**: Guide neurodivergent fans to quiet zones.
16. **Dynamic Ticket Reselling**: Sync seat maps with official resellers.
17. **Automated Parking Shuttle Dispatch**: Adjust shuttle frequencies based on parking lot arrivals.
18. **Telemetry-Driven Light Dimmers**: Dim stadium lights depending on daylight levels.
19. **Smart Rainwater Catchment Monitors**: Track rainwater reserve levels.
20. **Self-Healing Firestore Sync**: Re-sync offline edits once connectivity is restored.
21. **NFC-Enabled Access Badging**: Allow fans to unlock gates using their phone's NFC chips.
22. **Interactive Trivia Quizzes**: Engage waiting fans with World Cup trivia.
23. **Intelligent Weather Predictions**: Predict sudden weather changes and close canopy roofs.
24. **Multi-Agent Simulation**: Model fan evacuations to optimize exit designs.
25. **Decentralized Carbon Offsets**: Record sustainability points on a ledger.

---

## 🧩 Challenges & Solutions

### 1. Leaflet Container CSS Height Glitch
* **Challenge**: Leaflet maps would render as 0px height or collapse if the container was inside hidden flex tabs.
* **Solution**: Implemented a map resizing observer hook and wrapped Leaflet in a custom wrapper component that recalculates the viewport on tab changes.

### 2. Rollup ESM Path Resolution Error
* **Challenge**: Rollup failed to build `framer-motion` package scripts due to a bug in version 11's ESM imports on Windows.
* **Solution**: Downgraded to version `10.16.4`, which uses a stable module system that compiles cleanly.

### 3. Firestore Heartbeat Throttling
* **Challenge**: Telemetry updates from mock IoT nodes caused high write costs when syncing to Firestore.
* **Solution**: Added a telemetry heartbeat frequency range slider in the Admin Panel to control state updates.

---

## 🎓 Learning Outcomes

Building StadiumMind AI provided deep insights into:
* **Generative AI Orchestration**: Feeding context prompts to LLMs to generate text answers and action codes.
* **Geographical Vector Calculators**: Custom calculations to plot accessible routes.
* **Real-Time Data Tickers**: State synchronization across multiple devices.
* **Glassmorphism Design Systems**: Building premium dark interfaces with Tailwind CSS.

---

## 🤝 Contributing

We welcome contributions to StadiumMind AI!
1. Fork the Project.
2. Create a Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](https://github.com/AnishCodes-99/fifastadium-ai/blob/master/LICENSE) for more information.

---

## 👤 Author

**Anish Sunil Wani**
* **Role**: IT Engineering Student | AI Enthusiast | Full Stack Developer | Content Creator | Digital Marketer
* **Social Channels**:
  * [YouTube](https://www.youtube.com/@AnishWani_Ai)
  * [Instagram](https://www.instagram.com/anish_inspires)
  * [LinkedIn](https://www.linkedin.com/in/anish-wani-091071374)
  * [GitHub](https://github.com/AnishCodes-99)
* **Email**: wanianish88@gmail.com

---

## 🙏 Acknowledgements

* [React](https://reactjs.org/)
* [Firebase](https://firebase.google.com/)
* [Google Gemini AI](https://deepmind.google/technologies/gemini/)
* [Leaflet.js](https://leafletjs.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Framer Motion](https://www.framer.com/motion/)
* [Recharts](https://recharts.org/)
* [Lucide Icons](https://lucide.dev/)
* [OpenStreetMap](https://www.openstreetmap.org/)


## 🧪 Testing Suite & Quality Assurance

To maximize code reliability, prevent regressions, and ensure premium QA standards, StadiumMind AI features a complete, custom-mocked unit and integration testing suite. The suite executes offline in a sandboxed DOM environment, bypassing network dependencies.

### 🛠️ Test Stack Configuration
* **Runner & Framework**: [Vitest](https://vitest.dev/) (Vite-native testing framework)
* **DOM Environment**: `jsdom` (Simulating browser window/document behavior)
* **Assertions & Rendering**: `@testing-library/react` & `@testing-library/jest-dom`

---

### 📦 Implemented Mocks & Sandbox Stubs (`setup.tsx` / `firebaseMock.ts`)
To prevent test timeouts and execution failures due to missing browser APIs, the setup file implements these custom mocks:
* **Firebase SDK Resolver**: Redirects imports of `firebase/app`, `firebase/auth`, `firebase/firestore`, `firebase/storage`, and `firebase/functions` to a local stub file, bypassing external database hits.
* **Framer Motion Observer**: Mocks browser `IntersectionObserver` to support exit/entry scroll animations without node reference errors in Node.js.
* **HTML Element Layout API**: Mocks `Element.prototype.scrollIntoView` which is used in the AI chat stream to automatically focus on new messages.
* **Speech Synthesis SDK**: Stubs `window.speechSynthesis` and `SpeechSynthesisUtterance` to test audio guide triggering buttons.
* **Recharts Responsive Container**: Intercepts charts and immediately renders widgets at a mock size of `800x600px` to bypass parent layout checks in JSDOM.
* **Leaflet Maps wrapper**: Substitutes dynamic WebGL maps with container `div` placeholders (`mock-map-container`, `mock-polyline`, etc.) allowing component validation without loading Leaflet layout vectors.

---

### 🔍 Detailed Test Cases (17 Tests Configured)

#### 1. Context Providers (`src/test/Contexts.test.tsx`)
* **`LanguageContext`**: Verifies dynamic translation lookup and ensures full-screen language toggle propagates to Spanish, French, German, and Portuguese dictionaries.
* **`AuthContext`**: Tests login flow bypass triggers for Fan, Staff, and Admin roles and verifies user profile initialization.
* **`RouterContext`**: Asserts path updates and browser hash history changes when navigating dashboards.
* **`StadiumStateContext`**: Validates match score increments, evacuation broadcast triggers, and live alarm logging.

#### 2. Core UI Components (`src/test/Components.test.tsx`)
* **`LandingPage`**: Verifies animated hero headers, call-to-actions, and main entry metrics.
* **`SmartDashboard`**: Validates telemetry widgets, meteorological stats, and ingress occupancy curves.
* **`AIAssistant`**: Asserts dynamic chatbot FAQ guide selection dropdown updates, and verifies simulated message dispatch.
* **`StadiumMap`**: Confirms responsive Leaflet container rendering and focal target indicators.
* **`CommandCenter`**: Validates surveillance feed grids, simulated threat logs, and paramedic dispatch handlers.
* **`SustainabilityDashboard`**: Checks carbon offset widgets, solar yield curves, and claims eco score rewards.
* **`AdminPanel`**: Asserts manual score overrides and emergency drill toggles.
* **`Layout & Sidebar`**: Validates developer contact badge, social links redirects (YouTube, Instagram, LinkedIn, GitHub), and sidebar menu clearances.

#### 3. Utilities & AI Services (`src/test/Utilities.test.ts`)
* **AI Fallback Queries**: Evaluates offline AI text replies, location routing coordinates `[ACTION_ROUTE: med-west, standard]`, and ADA wheelchair coordinates mapping.
* **FAQ Dictionary Data Structure**: Enforces that the localization database holds exactly **50 distinct FAQs**, structured with localized language key-value pairs (`en`, `es`, `fr`, `de`, `pt`).

---

### 🚀 Running the Test Suite Locally

1. **Install Dependencies**:
   ```bash
   npm install
