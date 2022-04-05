import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Todo from "../../components/todo/ToDo";

const TodoPage = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Todo />;
    </>
  );
};

export default TodoPage;
