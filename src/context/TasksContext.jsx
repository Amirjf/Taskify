import { collection, doc, getDocs } from 'firebase/firestore';
import { createContext, useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import { db2 } from '../firebase/firebase.config';
import {
  CreateTaskCollection,
  deleteTaskDoc,
  setTaskCompleted,
} from '../firebase/firebase.utils';

export const TasksContext = createContext({
  tasks: [],
  completedTasks: [],
  addNewTask: () => {},
  removeTask: () => {},
  removeCompletedTask: () => {},
  setTaskToCompleted: () => {},
  loading: false,
  openTasksCount: 0,
  completedTasksCount: 0,
});

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [openTasksCount, setOpenTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  const [loading, setLoading] = useState(false);

  const user = localStorage.getItem('user');
  const currentUser = JSON.parse(user);

  useEffect(() => {
    const newOpenTasksCount = tasks.filter(
      (task) => task.isTaskCompleted !== true
    ).length;
    setOpenTasksCount(newOpenTasksCount);
  }, [tasks, completedTasks]);

  useEffect(() => {
    const newCompletedTasksCount = tasks.filter(
      (task) => task.isTaskCompleted === true
    ).length;
    setCompletedTasksCount(newCompletedTasksCount);
  }, [completedTasks, tasks]);

  useEffect(() => {
    const getData = async () => {
      try {
        const userRef = doc(db2, 'users', currentUser.uid);
        const tasksDoc = await getDocs(collection(userRef, 'tasks'));
        const data = tasksDoc.docs.map((doc) => {
          return doc.data();
        });

        data ? setLoading(true) : setLoading(false);

        setTasks(data);
      } catch (err) {
        if (currentUser === null) {
          return;
        }
        toast.error(err.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getCompletedTasks = async () => {
      try {
        const userRef = doc(db2, 'users', currentUser.uid);
        const tasksDoc = await getDocs(collection(userRef, 'tasks'));
        const data = tasksDoc.docs.map((doc) => {
          return doc.data();
        });

        data ? setLoading(true) : setLoading(false);

        const filtered = data.filter((task) => task.isTaskCompleted === true);

        setCompletedTasks(filtered);
      } catch (err) {
        if (currentUser === null) {
          return;
        }
        toast.error(err.message);
      }
    };
    getCompletedTasks();
  }, []);

  const addNewTask = (taskToAdd) => {
    try {
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
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeTask = (taskToRemove) => {
    try {
      deleteTaskDoc(currentUser, taskToRemove);
      const filtered = tasks.filter(
        (task) => task.taskId !== taskToRemove.taskId
      );
      setTasks(filtered);
    } catch (err) {
      console.log(err);
    }
  };
  const removeCompletedTask = (taskToRemove) => {
    try {
      deleteTaskDoc(currentUser, taskToRemove);
      const filtered = completedTasks.filter(
        (task) => task.taskId !== taskToRemove.taskId
      );
      setCompletedTasks(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  const setTaskToCompleted = useCallback(
    (taskToComplete) => {
      try {
        taskToComplete['isTaskCompleted'] = true;
        setTaskCompleted(currentUser, taskToComplete);

        setCompletedTasks([taskToComplete, ...completedTasks]);
      } catch (err) {
        console.log(err);
      }
    },
    [completedTasks]
  );

  // const setTaskToCompleted = (taskToComplete) => {
  //   try {
  //     taskToComplete["isTaskCompleted"] = true;
  //     setTaskCompleted(currentUser, taskToComplete);

  //     setCompletedTasks([taskToComplete, ...completedTasks]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const value = {
    tasks,
    addNewTask,
    loading,
    removeTask,
    removeCompletedTask,
    setTaskToCompleted,
    completedTasks,
    openTasksCount,
    completedTasksCount,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
