// Import the functions you need from the SDKs you need

import "firebase/compat/firestore";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { collection, addDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
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
const auth = firebase.auth();
const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const signInWithGoogle = async () => {
  const res = await auth.signInWithPopup(provider);
  const user = res.user;
  console.log(user);
  const userRef = db.doc(`users/${user.uid}`);
  const snapShot = await userRef.get();
  const { displayName, email } = user;
  if (!snapShot.exists) {
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  }
  console.log("snapShot", snapShot);
};

// const signInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     const user = res.user;
//     const q = doc(collection(db, "users", where("uid", "==", user.uid)));
//     const docs = await getDocs(q);
//     console.log(docs);
//     const createdAt = new Date();
//     const userRef = collection(db, "users");
//     docs.forEach((doc) => {
//       setDoc(doc.ref, {
//         name: "prueba",
//         uid: "sdfsdfsdf",
//         projectId: "sdfsdfds",
//       });
//     });

// const taskQuery = doc(collection(db, "categorias"), where("uid", "==", currentUser))
// const taskDocs = await getDocs(taskQuery)
// taskDocs.forEach((taskDoc) => {
//   await setDoc(taskDoc.ref, {
//     name: 'prueba',
//     uid: currentUser,
//     projectId: newDocRef.id
//   })
// })
//   } catch (err) {
//     alert(err.message);
//   }
// };

export const testCreateCollection = async () => {};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    toast.error(err.message);
  }
};

const registerWithEmailAndPassword = async (displayName, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const date = new Date();
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email,
      displayName,
      authProvider: "local",
      createdAt: date,
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
