
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
