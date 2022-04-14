import React, { useState, useContext } from "react";
import SectionHeading from "../section-heading/SectionHeading";
import TasksItems from "../tasks-items/TaskItems";
import Input from "../input/Input";
import { useForm } from "react-hook-form";
import Button from "../button/Button";
import "./_tasks.scss";
import Select from "../select/Select";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../loading/Loading";
import { TasksContext } from "../../context/TasksContext";

const Tasks = () => {
  const { tasks, loading, addNewTask } = useContext(TasksContext);

  const [showTaskForm, setShowTaskForm] = useState(false);

  const user = localStorage.getItem("user");
  const currentUser = JSON.parse(user);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskTitle: "",
      taskCategory: "",
      taskColor: "",
      taskStatus: "",
    },
  });

  const onSubmit = (data) => {
    addNewTask(data);
    toggle();
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
              tasks
                .filter((task) => task.isTaskCompleted === false)
                .map((item) => <TasksItems key={item.taskId} item={item} />)
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
