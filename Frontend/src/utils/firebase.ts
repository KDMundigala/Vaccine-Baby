
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Upload file to Firebase Storage
export const uploadFile = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Upload profile picture
export const uploadProfilePicture = async (file: File, userId: string): Promise<string> => {
  const fileExtension = file.name.split('.').pop();
  const fileName = `${userId}_${Date.now()}.${fileExtension}`;
  const filePath = `profile_pictures/${fileName}`;
  return uploadFile(file, filePath);
};

export { app, storage };
