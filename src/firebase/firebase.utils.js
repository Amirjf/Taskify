import {
  collection,
  getDocs,
  doc,
  writeBatch,
  query,
  getDoc,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db2, db, auth } from "./firebase.config";

export const GetTaskDocCollection = async (userAuth) => {
  const userRef = doc(db2, "users", userAuth.uid);
  const tasksDoc = await getDocs(collection(userRef, "tasks"));
  const res = tasksDoc.docs.map((doc) => {
    return doc.data();
  });

  return res;
};

export const setTaskCompleted = async (user, item) => {
  db.collection("users")
    .doc(user.uid)
    .collection("tasks")
    .where("taskId", "==", item.taskId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs[0].ref.update({ isTaskCompleted: true });
    });

  // const q = query(tasksRef, where("taskId", "==", item.taskId));
  // const unsubscribe = onSnapshot(q, (snapshot) => {
  //   console.log("task:");
  //   snapshot.forEach((userSnapshot) => {
  //     console.log(userSnapshot.data());
  //   });
  // });
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
