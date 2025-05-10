
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVlmL5Xh0EEzonuKFX8ExKlsQgAyboLNs",
  authDomain: "vaccine-baby1.firebaseapp.com",
  projectId: "vaccine-baby1",
  storageBucket: "vaccine-baby1.firebasestorage.app",
  messagingSenderId: "911918646676",
  appId: "1:911918646676:web:caeebd16a2dcb20e903b81",
  measurementId: "G-185CN46JZQ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { firebaseApp, storage };
