import { collection, doc, getDocs } from "firebase/firestore";
import React, { createContext, useEffect, useState, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, GetTaskDocCollection, db2 } from "../firebase/firebase.config";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
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

        const filteredData = data
          .filter((task) => task.isTaskCompleted === false)
          .map((task) => task);

        setTasks(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const value = { tasks, setTasks, loading };
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  // get the context
  const context = useContext(TasksContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};
