import React, { useState } from "react";
import SignIn from "../../components/signin/SignIn";
import SignUp from "../../components/sign-up/SignUp";
import Button from "../../components/button/Button";

const AuthPage = () => {
  const [authPage, setAthPage] = useState("signin");
  return (
    <div className="auth-container">
      <div className="nav-buttons">
        <button onClick={() => setAthPage("signin")}>Sign In</button>
        <button onClick={() => setAthPage("signup")}>Sign Up</button>
        {authPage === "signin" ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default AuthPage;
