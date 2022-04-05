import React, { useState } from "react";
import SignIn from "../../components/signin/SignIn";
import SignUp from "../../components/sign-up/SignUp";
import { motion } from "framer-motion";
import "./_auth.scss";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [authPage, setAthPage] = useState("signin");
  return (
    <>
      <div className="back-to-home">
        <Link to="/">
          <Button icon="home">Home</Button>
        </Link>
      </div>
      <div className="auth-container">
        <div className="nav-buttons">
          <button
            className={`sign-in-nav ${authPage === "signin" ? "active" : ""}`}
            onClick={() => setAthPage("signin")}
          >
            Sign In
          </button>
          <button
            className={`sign-up-nav ${authPage === "signup" ? "active" : ""}`}
            onClick={() => setAthPage("signup")}
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
