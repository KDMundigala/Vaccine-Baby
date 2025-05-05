
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFCotQnxYDTyIGkuxmhu1VTJM4i8z0F7I",
  authDomain: "project4-555f1.firebaseapp.com",
  projectId: "project4-555f1",
  storageBucket: "project4-555f1.firebasestorage.app",
  messagingSenderId: "502947732437",
  appId: "1:502947732437:web:53d281af63d2cf43a7fb5c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { firebaseApp, storage };
