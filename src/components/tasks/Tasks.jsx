import React, { useState, useEffect, useContext } from "react";
import SectionHeading from "../section-heading/SectionHeading";
import TasksItems from "../tasks-items/TaskItems";
import Input from "../input/Input";
import { useForm } from "react-hook-form";
import {
  CreateTaskCollection,
  deleteTaskDoc,
  setTaskCompleted,
} from "../../firebase/firebase.utils";
import Button from "../button/Button";
import "./_tasks.scss";
import Select from "../select/Select";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../loading/Loading";
import { db2 } from "../../firebase/firebase.config";
import { collection, doc, getDocs } from "firebase/firestore";

const Tasks = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = localStorage.getItem("user");
  const currentUser = JSON.parse(user);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      taskTitle: "",
      taskCategory: "",
      taskColor: "",
      taskStatus: "",
    },
  });

  const taskCompleted = async (item) => {
    item["isTaskCompleted"] = true;

    await setTaskCompleted(currentUser, item);
    const filteredData = tasks
      .filter((task) => task.isTaskCompleted === false)
      .map((task) => task);

    setTasks(filteredData);
  };

  const removeItem = (taskToRemove) => {
    deleteTaskDoc(currentUser, taskToRemove);
    const filtered = tasks.filter((e) => e !== taskToRemove);
    setTasks(filtered);
  };

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
  }, [isSubmitted]);

  const onSubmit = (data) => {
    CreateTaskCollection(data);
    toggle();
    // setItems((prevState) => [...prevState, data]);
  };

  const toggle = () => {
    setShowTaskForm(!showTaskForm);
  };

  return (
    <>
      <Button
        block
        onClick={() => {
          toggle();
        }}
        type="button"
      >
        Add new Task
      </Button>
      <div className={`add-task-form shadow ${showTaskForm ? "show" : ""}`}>
        <div
          className="close-form"
          onClick={() => {
            toggle();
          }}
        >
          <i className="gg-close"></i>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Task Title"
            registerLabel="taskTitle"
            errors={errors}
            register={register}
            required
            placeholder="task item"
          />
          <Input
            label="Task Category"
            registerLabel="taskCategory"
            errors={errors}
            register={register}
            required
            placeholder="Task Category"
          />
          <div className="colors-container">
            <div className="radio-container">
              <input
                {...register("taskColor")}
                type="radio"
                value="#c8f7dc"
                id="color1"
              />
              <label htmlFor="color1"></label>
              <span className="color-filled"></span>
            </div>
            <div className="radio-container">
              <input
                {...register("taskColor")}
                type="radio"
                value="#fee4cb"
                id="color2"
              />
              <label htmlFor="color2"></label>
              <span className="color-filled"></span>
            </div>
            <div className="radio-container">
              <input
                {...register("taskColor")}
                type="radio"
                value="#e9e7fd"
                id="color3"
              />
              <label htmlFor="color3"></label>
              <span className="color-filled"></span>
            </div>
            <div className="radio-container">
              <input
                {...register("taskColor")}
                type="radio"
                value="#d5deff"
                id="color4"
              />
              <label htmlFor="color4"></label>
              <span className="color-filled"></span>
            </div>
            <div className="radio-container">
              <input
                {...register("taskColor")}
                type="radio"
                value="#dbf6fd"
                id="color5"
              />
              <label htmlFor="color5"></label>
              <span className="color-filled"></span>
            </div>
          </div>
          <Select
            label="Status"
            {...register("taskStatus")}
            required
            options={[
              { value: "urgent", label: "Urgent" },
              { value: "working", label: "Working" },
              { value: "notImportant", label: "Not very important" },
            ]}
          />

          <Button icon="add">Add Task</Button>
        </form>
      </div>

      <SectionHeading title="Your latest tasks : " />

      {tasks.length === 0 && loading == true ? (
        <>
          <SectionHeading
            center
            textColor="#ffc149"
            title="You dont have any tasks yet ! "
          />
          <SectionHeading
            center
            textColor="#ffc149"
            title="Maybe start adding some ?  "
          />
        </>
      ) : (
        <motion.div className="project-boxes">
          <AnimatePresence>
            {loading ? (
              tasks.map((item) => (
                <TasksItems
                  key={item.taskId}
                  onTaskCompleted={taskCompleted}
                  onRemoveItem={removeItem}
                  item={item}
                />
              ))
            ) : (
              <Loading />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
};
export default Tasks;
