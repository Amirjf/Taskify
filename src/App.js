import React from "react";
import MainContent from "./components/MainContent/MainContent";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import HomePage from "./pages/homepage/HomePage";
import { ToastContainer } from "react-toastify";
import ToggleSidebar from "./components/toggle-sidebar/ToggleSidebar";
import TasksPage from "./pages/tasks/TasksPage";

const App = () => {
  return (
    <div>
      <ToggleSidebar />
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </MainContent>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </div>
  );
};

export default App;
