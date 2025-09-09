// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBZpga1ViSzsFu8gnqG_HZSorlCeC7iYzw",
    authDomain: "mika-pulmad.firebaseapp.com",
    projectId: "mika-pulmad",
    storageBucket: "mika-pulmad.firebasestorage.app",
    messagingSenderId: "364184995765",
    appId: "1:364184995765:web:11076da3513649d9e13bfc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;