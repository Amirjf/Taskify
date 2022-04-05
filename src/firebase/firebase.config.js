// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users", where("uid", "==", user.uid)));
    const docs = await getDocs(q);
    if (docs.docs.collection === 0) {
      await addDoc(
        collection(db, "users", {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        })
      );
    }
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
