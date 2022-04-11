import "firebase/compat/firestore";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { collection, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
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
  try {
    const res = await auth.signInWithPopup(provider);
    const user = res.user;
    const userRef = db.doc(`users/${user.uid}`);
    const snapShot = await userRef.get();
    const { displayName, email } = user;
    if (!snapShot.exists) {
      const createdAt = new Date();
      await userRef.set({
        displayName,
        email,
        createdAt,
      });
    }
  } catch (error) {
    console.log("error", error.message);
  }
};

export const CreateTaskCollection = async (data) => {
  let batch = db.batch();
  const { taskColor, taskStatus, taskTitle, taskCategory } = data;

  const subCollectionDocRef = db
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("tasks")
    .doc();
  const date = new Date().toDateString();
  const randomId = Math.floor(Math.random() * Date.now());

  batch.set(subCollectionDocRef, {
    taskId: randomId,
    taskTitle: taskTitle,
    taskStatus: taskStatus,
    taskCategory: taskCategory,
    taskCreatedAt: date,
    taskColor: taskColor,
  });

  await batch.commit();
};

export const GetTaskDocCollection = async (userAuth) => {
  const userRef = db.collection("users").doc(userAuth.uid);

  const tasksDoc = await getDocs(collection(userRef, "tasks"));
  const res = tasksDoc.docs.map((doc) => {
    return doc.data();
  });

  return res;
};

//todo
export const deleteTaskDoc = (userAuth, task) => {
  // const res = await db
  //   .collection("users")
  //   .doc(userAuth.uid)
  //   .collection("tasks")
  //   .doc();
  console.log(userAuth);

  db.collection("users")
    .doc(userAuth.uid)
    .collection("tasks")
    .where("taskId", "==", task.taskId)
    .get()
    .then((querySnapshot) => {
      // querySnapshot.docs[0].ref.delete();
      console.log(querySnapshot.docs[0].ref.delete());
    });

  // const res = await deleteDoc(taskRef);
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    toast.error(err.message);
  }
};

const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = db.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return userRef;
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
  createUserProfileDocument,
  signInWithGoogle,
  sendPasswordReset,
  logout,
};
