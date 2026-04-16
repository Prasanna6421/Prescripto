import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9o7icqZdRH6S0uZGyJgCtM4tUNMmzO8M",
  authDomain: "myreactauth-db1ef.firebaseapp.com",
  projectId: "myreactauth-db1ef",
  storageBucket: "myreactauth-db1ef.firebasestorage.app",
  messagingSenderId: "165791901654",
  appId: "1:165791901654:web:3db9227baec2e596a6a677"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  return signOut(auth);
};

export { auth };