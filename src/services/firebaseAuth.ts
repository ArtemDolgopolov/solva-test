import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'

// also, we may hide apiKey within .env, but it's a test project 
const firebaseConfig = {
  apiKey: "AIzaSyDBXfORj2pyp4VAt903Pv4Kzo_g4XoZyyw",
  authDomain: "solva-test.firebaseapp.com",
  projectId: "solva-test",
  storageBucket: "solva-test.appspot.com",
  messagingSenderId: "178614383657",
  appId: "1:178614383657:web:d86f183021bdbabd109838"
};

initializeApp(firebaseConfig);
const auth = getAuth();

export {
  auth,
  firebaseConfig,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    setPersistence(auth, browserLocalPersistence);
  }
});
