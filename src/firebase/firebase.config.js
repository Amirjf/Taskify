import "firebase/compat/firestore";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { getDoc, getFirestore, doc, setDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC964LJ6JsnmBWpxowctCf4MTj3GydDMGc",
  authDomain: "todo-dd948.firebaseapp.com",
  projectId: "todo-dd948",
  storageBucket: "todo-dd948.appspot.com",
  messagingSenderId: "436693402449",
  appId: "1:436693402449:web:26ee5f2498b1768eb30970",
  measurementId: "G-JRWGNQ9CZQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const db = firebase.firestore();
export const db2 = getFirestore();

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});
const signInWithGoogle = async () => {
  signInWithPopup(auth, googleProvider);
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    toast.error(err.message);
  }
};

const createUserProfileDocument = async (userAuth, additionalData = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db2, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      toast.error(error.message);
    }
  }
};

const logout = async () => {
  await signOut(auth);
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export {
  auth,
  db,
  logInWithEmailAndPassword,
  createUserProfileDocument,
  signInWithGoogle,
  logout,
};
