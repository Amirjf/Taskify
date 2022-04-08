import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, GetTaskDocCollection } from "../../firebase/firebase.config";
export const TaskItemsContext = React.createContext();

export const TaskItemsProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const userRef = db.collection("users").doc(user.uid);
      const tasksRef = collection(userRef, "tasks");
      const tasksDoc = await getDocs(collection(userRef, "tasks"));
      const res = tasksDoc.docs.map((doc) => {
        return doc.data();
      });
      setData(res);
    };
    getData();
  }, []);

  return (
    <TaskItemsContext.Provider value={{ data }}>
      {children}
    </TaskItemsContext.Provider>
  );
};

export default TaskItemsProvider;

export function useTaskItems() {
  const context = useContext(TaskItemsContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
