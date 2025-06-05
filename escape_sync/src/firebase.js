//
// Firebase Setup for EscapeSync (Reusable Utility)
// ================================================
//
// This file sets up the Firebase JS SDK, initializes the app, and provides
// simple helper methods for chat integration using Firestore.
//
// ----- HOW TO USE / SECURELY MANAGE CONFIG -----
// 1. For real deployments, never commit raw API keys to public repos. Move your
//    config object (see FIREBASE_CONFIG below) to a .env file or environment
//    variables management.
// 2. For local/test/demo, an example/mock config is shown below.
// 3. Most Firebase API keys are "public", but protect non-public service
//    credentials and restrict in your Firebase Console UI.
//
// -----------------------------------------------

import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";

// ---- MOCK/EXAMPLE CONFIG: REPLACE BEFORE DEPLOYMENT ----
// Instructions:
// * Go to your Firebase Console > Project Settings > Web App > Firebase SDK snippet
// * Replace the values below with your project's config.
// * For local, you can use a .env.local file and process.env.REACT_APP_FIREBASE_API_KEY, etc.
const FIREBASE_CONFIG = {
  apiKey: "FAKE-EXAMPLE_KEY-XXXXXXXX",
  authDomain: "your-app-id.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app-id.appspot.com",
  messagingSenderId: "1234560789",
  appId: "1:1234560789:web:abc123456def",
  // measurementId: "G-XXXXXX" // optional
};

// Initialize Firebase (Singleton pattern enforced by Firebase)
const firebaseApp = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(firebaseApp);

// PUBLIC_INTERFACE
/**
 * Subscribe to team chat messages in real-time (example)
 * @param {function} onMsg - callback([{ player, text, time }]) called with message list on update
 * @returns {function} Unsubscribe function
 */
export function subscribeToChat(onMsg) {
  // Reference to "chat" collection, ordered by Firestore's server timestamp
  const q = query(collection(db, "chat"), orderBy("timestamp", "asc"));
  // Listen for real-time updates
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => doc.data());
    onMsg(messages);
  });
  return unsubscribe;
}

// PUBLIC_INTERFACE
/**
 * Send a chat message (adds to Firestore "chat" collection)
 * @param {{player: number|string, text: string, time: string}} msg
 * @returns {Promise} Promise from Firebase
 */
export function sendChatMessage(msg) {
  // Adds a message with player ID, text, and display time.
  return addDoc(collection(db, "chat"), {
    ...msg,
    timestamp: serverTimestamp() // order messages by server time
  });
}

// For advanced: You may export more helpers (auth, other collections, etc.)

// ------------------------
// BEST PRACTICES (comment only):
// - Do not commit production API keys or service credentials; use environment variables.
// - Instruct users/contributors to provide their own config via .env or a secure mechanism.
// - Lock down database rules in Firebase Console to prevent unauthorized writes.
