import React, { useEffect } from 'react';
import MainContent from './components/MainContent/MainContent';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import HomePage from './pages/homepage/HomePage';
import { ToastContainer } from 'react-toastify';
import ToggleSidebar from './components/toggle-sidebar/ToggleSidebar';
import TasksPage from './pages/tasks/TasksPage';
import CalendarColumn from './components/calendar/Calendar';
import ToggleMenuMobile from './components/toggle-menu-mobile/ToggleMenuMobile';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase.config';

const App = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div>
      <ToggleSidebar />
      <ToggleMenuMobile />
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <CalendarColumn />
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
