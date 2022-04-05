import React from "react";
import MainContent from "./components/MainContent/MainContent";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import HomePage from "./pages/homepage/HomePage";
import TodoPage from "./pages/todo/TodoPage";

const App = () => {
  return (
    <div>
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </MainContent>
    </div>
  );
};

export default App;
