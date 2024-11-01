import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// also, we may hide apiKey within .env, but it's a test project 
const firebaseConfig = {
  apiKey: "AIzaSyDBXfORj2pyp4VAt903Pv4Kzo_g4XoZyyw",
  authDomain: "solva-test.firebaseapp.com",
  projectId: "solva-test",
  storageBucket: "solva-test.appspot.com",
  messagingSenderId: "178614383657",
  appId: "1:178614383657:web:d86f183021bdbabd109838"
};
// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
// if (window.location.hostname === 'localhost') {
//   connectAuthEmulator(auth, 'http://127.0.0.1:9099');
// }
export {
  auth,
  firebaseConfig,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged
};