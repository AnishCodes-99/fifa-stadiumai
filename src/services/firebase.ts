import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY_HERE' &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== 'YOUR_FIREBASE_PROJECT_ID_HERE';

let app;
let auth: any = null;
let db: any = null;
let storage: any = null;
let functions: any = null;
let firebaseEnabled = false;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    functions = getFunctions(app);
    firebaseEnabled = true;
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.warn("Failed to initialize Firebase SDK, falling back to mock mode:", error);
  }
} else {
  console.log("Firebase credentials missing in .env. Running in offline mockup mode.");
}

export { auth, db, storage, functions, firebaseEnabled };
