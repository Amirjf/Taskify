import React, { useState, useEffect } from "react";
import SectionHeading from "../section-heading/SectionHeading";
import TasksItems from "../tasks-items/TaskItems";
import Input from "../input/Input";
import { useForm } from "react-hook-form";
import {
  auth,
  CreateTaskCollection,
  GetTaskDocCollection,
} from "../../firebase/firebase.config";
import Button from "../button/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import "./_tasks.scss";
import Select from "../select/Select";

const Tasks = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthState(auth);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const toggle = () => setShowTaskForm(!showTaskForm);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // const removeItem = (remove) => {
  //   const filteredItems = items.filter((e) => e !== remove);
  //   setItems(filteredItems);
  // };

  const onSubmit = (data) => {
    CreateTaskCollection(data);
  };

  useEffect(() => {
    const getTasks = async () => {
      const data = await GetTaskDocCollection();

      setItems(...items, data);

      setLoading(true);
    };
    getTasks();
  }, [user]);

  return (
    <>
      <Button onClick={() => toggle()} type="button">
        Add new Task
      </Button>
      <div className={`add-task-form shadow ${showTaskForm ? "show" : ""}`}>
        <div className="close-form" onClick={() => toggle()}>
          <i className="gg-close"></i>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Task Title"
            registerLabel="task"
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
                {...register("color")}
                type="radio"
                value="#c8f7dc"
                id="color1"
              />
              <label for="color1"></label>
              <span className="color-filled"></span>
            </div>
            <div className="radio-container">
              <input
                {...register("color")}
                type="radio"
                value="#fee4cb"
                id="color2"
              />
              <label for="color2"></label>
              <span className="color-filled"></span>
            </div>
            <div className="radio-container">
              <input
                {...register("color")}
                type="radio"
                value="#e9e7fd"
                id="color3"
              />
              <label for="color3"></label>
              <span className="color-filled"></span>
            </div>
            <div className="radio-container">
              <input
                {...register("color")}
                type="radio"
                value="#d5deff"
                id="color4"
              />
              <label for="color4"></label>
              <span className="color-filled"></span>
            </div>
            <div className="radio-container">
              <input
                {...register("color")}
                type="radio"
                value="#dbf6fd"
                id="color5"
              />
              <label for="color5"></label>
              <span className="color-filled"></span>
            </div>
          </div>
          <Select
            label="Status"
            registerLabel="status"
            {...register("status")}
            required
          >
            <option value="urgent">Urgent</option>
            <option value="working">Working on it</option>
            <option value="notImportant">Not very important</option>
          </Select>
          <Button icon="add">ADD</Button>
        </form>
      </div>

      <SectionHeading title="Your latest tasks : " />

      <div className="project-boxes">
        {loading &&
          items.map((item, id) => <TasksItems key={id} item={item} />)}
      </div>
    </>
  );
};
export default Tasks;
// items={items} onRemoveItem={removeItem
