// src/shared/config/firebase.js

// Đổi từ CDN sang npm package imports
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions'; 

const firebaseConfig = {
  apiKey: "AIzaSyBt5Z1kzemrD8pZC99bRUXH2O8F26qbsZY",
  authDomain: "kiadstarstool.firebaseapp.com",
  projectId: "kiadstarstool",
  storageBucket: "kiadstarstool.firebasestorage.app",
  messagingSenderId: "864386972880",
  appId: "1:864386972880:web:264cfe8cb790d5f1ba32d5",
  measurementId: "G-MG7WGHFD44"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

export { app, auth, db, storage, functions };
export default { app, auth, db, storage, functions };