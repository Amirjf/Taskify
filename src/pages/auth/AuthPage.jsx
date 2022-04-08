import React, { useState, useEffect } from "react";
import SignIn from "../../components/signin/SignIn";
import SignUp from "../../components/sign-up/SignUp";
import "./_auth.scss";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import CalendarColumn from "../../components/calendar/Calendar";

const AuthPage = () => {
  const [authPage, setAuthPage] = useState("signin");
  return (
    <>
      <Sidebar />
      <Header />
      <CalendarColumn />
      <div className="auth-container">
        <div className="nav-buttons">
          <button
            className={`sign-in-nav ${authPage === "signin" ? "active" : ""}`}
            onClick={() => setAuthPage("signin")}
          >
            Sign In
          </button>
          <button
            className={`sign-up-nav ${authPage === "signup" ? "active" : ""}`}
            onClick={() => setAuthPage("signup")}
          >
            Sign Up
          </button>
        </div>

        {authPage === "signin" ? <SignIn /> : <SignUp />}
      </div>
    </>
  );
};

export default AuthPage;
