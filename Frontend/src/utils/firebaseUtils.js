import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

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
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadImageToFirebase = async (file) => {
  try {
    // Create a unique filename
    const filename = `baby-profiles/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, filename);
    
    // Upload the file
    await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}; 