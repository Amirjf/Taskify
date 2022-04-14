import { collection, doc, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

import { db2 } from "../firebase/firebase.config";
import {
  CreateTaskCollection,
  deleteTaskDoc,
  setTaskCompleted,
} from "../firebase/firebase.utils";

export const TasksContext = createContext({
  tasks: [],
  completedTasks: [],
  addNewTask: () => {},
  removeTask: () => {},
  setTaskToCompleted: () => {},
  loading: false,
});

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [loading, setLoading] = useState(false);

  const user = localStorage.getItem("user");
  const currentUser = JSON.parse(user);

  useEffect(() => {
    const getData = async () => {
      try {
        const userRef = doc(db2, "users", currentUser.uid);
        const tasksDoc = await getDocs(collection(userRef, "tasks"));
        const data = tasksDoc.docs.map((doc) => {
          return doc.data();
        });

        data ? setLoading(true) : setLoading(false);

        setTasks(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getCompletedTasks = async () => {
      try {
        const userRef = doc(db2, "users", currentUser.uid);
        const tasksDoc = await getDocs(collection(userRef, "tasks"));
        const data = tasksDoc.docs.map((doc) => {
          return doc.data();
        });

        data ? setLoading(true) : setLoading(false);

        const filtered = data.filter((task) => task.isTaskCompleted === true);

        setCompletedTasks(filtered);
      } catch (err) {
        console.log(err);
      }
    };
    getCompletedTasks();
  }, []);

  const addNewTask = (taskToAdd) => {
    CreateTaskCollection(taskToAdd);

    const date = new Date().toDateString();
    const randomId = Math.floor(Math.random() * Date.now());
    const task = {
      ...taskToAdd,
      isTaskCompleted: false,
      taskCreatedAt: date,
      taskId: randomId,
    };
    setTasks([...tasks, task]);
  };

  const removeTask = (taskToRemove) => {
    deleteTaskDoc(currentUser, taskToRemove);
    const filtered = tasks.filter(
      (task) => task.taskId !== taskToRemove.taskId
    );
    setTasks(filtered);
  };

  const setTaskToCompleted = async (taskToComplete) => {
    taskToComplete["isTaskCompleted"] = true;
    const res = setTaskCompleted(currentUser, taskToComplete);
    setCompletedTasks([taskToComplete, ...completedTasks]);
  };

  const value = {
    tasks,
    addNewTask,
    loading,
    removeTask,
    setTaskToCompleted,
    completedTasks,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
