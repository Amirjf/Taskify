import React, { useState, useEffect } from "react";
import SectionHeading from "../section-heading/SectionHeading";
import TasksItems from "../tasks-items/TaskItems";
import Input from "../input/Input";
import { useForm } from "react-hook-form";
import {
  auth,
  CreateTaskCollection,
  deleteTaskDoc,
  GetTaskDocCollection,
} from "../../firebase/firebase.config";
import Button from "../button/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import "./_tasks.scss";
import Select from "../select/Select";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";

const Tasks = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user] = useAuthState(auth);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const toggle = () => {
    setShowTaskForm(!showTaskForm);
  };

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      taskTitle: "",
      taskCategory: "",
      taskColor: "",
      taskStatus: "",
    },
  });

  const removeItem = (itemToRemove) => {
    deleteTaskDoc(user, itemToRemove);
    const filteredItems = items.filter((e) => e !== itemToRemove);
    setItems(filteredItems);
  };

  const editItem = (itemToEdit) => {
    toggle();
    setIsEditing(!isEditing);
    for (var key in itemToEdit) {
      if (itemToEdit.hasOwnProperty(key)) {
        setValue(`${key}`, itemToEdit[key]);
      }
    }
  };

  const onSubmit = (data) => {
    try {
      CreateTaskCollection(data);
      toggle();
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      const data = await GetTaskDocCollection(user);
      setLoading(true);
      setItems(...items, data);
    };
    getTasks();
  }, [user]);

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

          {isEditing ? (
            <Button icon="add">Edit TASK</Button>
          ) : (
            <Button icon="add">Add Task</Button>
          )}
        </form>
      </div>

      <SectionHeading title="Your latest tasks : " />

      {items.length === 0 ? (
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
              items.map((item) => (
                <TasksItems
                  key={item.taskId}
                  onEditItem={editItem}
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
