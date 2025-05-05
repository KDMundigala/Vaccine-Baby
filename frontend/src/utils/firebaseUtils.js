import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCFCotQnxYDTyIGkuxmhu1VTJM4i8z0F7I",
  authDomain: "project4-555f1.firebaseapp.com",
  projectId: "project4-555f1",
  storageBucket: "project4-555f1.firebasestorage.app",
  messagingSenderId: "502947732437",
  appId: "1:502947732437:web:53d281af63d2cf43a7fb5c"
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