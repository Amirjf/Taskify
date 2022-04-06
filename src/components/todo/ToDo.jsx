import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../section-heading/SectionHeading";
import ToDoItems from "../todo-items/ToDoItems";
import Input from "../input/Input";
import Button from "../button/Button";

const Todo = () => {
  const [term, setTerm] = useState("");
  const [items, setItems] = useState([]);

  const removeItem = (remove) => {
    const filteredItems = items.filter((e) => e !== remove);
    setItems(filteredItems);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setTerm(value);
  };
  const onAlert = () => {
    return alert("DUDE! Fill the input ... ! ");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (term === "") {
      onAlert();
    } else {
      setItems([...items, term]);
      setTerm("");
    }
  };

  return (
    <>
      <SectionHeading title="ToDo List ... " />
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          name="todo"
          placeholder="Task"
          value={term}
          onChange={handleChange}
        />
        <Button icon="add" type="submit">
          ADD
        </Button>
      </form>
      <ToDoItems items={items} onRemoveItem={removeItem} />
    </>
  );
};

export default Todo;
