import "firebase/compat/firestore";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import {
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  getFirestore,
  doc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithRedirect,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
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
const db2 = getFirestore();

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});
const signInWithGoogle = async () => {
  signInWithPopup(auth, googleProvider);
};

export const GetTaskDocCollection = async (userAuth) => {
  const userRef = doc(db2, "users", userAuth.uid);
  const tasksDoc = await getDocs(collection(userRef, "tasks"));
  const res = tasksDoc.docs.map((doc) => {
    return doc.data();
  });

  return res;
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

export const CreateTaskCollection = async (data) => {
  const { taskTitle, taskStatus, taskCategory, taskColor } = data;
  const batch = writeBatch(db2);
  const userRef = doc(db2, "users", auth.currentUser.uid);
  const taskRef = doc(collection(userRef, "tasks"));
  const date = new Date().toDateString();
  const randomId = Math.floor(Math.random() * Date.now());
  batch.set(taskRef, {
    taskId: randomId,
    taskTitle: taskTitle,
    taskStatus: taskStatus,
    taskCategory: taskCategory,
    taskCreatedAt: date,
    taskColor: taskColor,
    isTaskCompleted: false,
  });

  await batch.commit();
};

export const deleteTaskDoc = (userAuth, task) => {
  db.collection("users")
    .doc(userAuth.uid)
    .collection("tasks")
    .where("taskId", "==", task.taskId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs[0].ref.delete();
    });
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  createUserProfileDocument,
  signInWithGoogle,
  logout,
};
