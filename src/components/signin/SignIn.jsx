import React, { useEffect } from "react";
import Button from "../button/Button";
import Logo from "../../assets/images/mylogo.png";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/firebase.config";
import "./_signin.scss";
import { useForm } from "react-hook-form";
import Form from "../form/Form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      <h1 className="texh-white">Loading ...</h1>;
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  const onSubmit = (data) => {
    const { email, password } = data;
    logInWithEmailAndPassword(email, password);
  };

  return (
    <motion.div layout className="sign-in-container">
      <div className="logo-container">
        <img src={Logo} alt="logo" />
      </div>
      <h1>Login to your account</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          {...register("email")}
          placeholder="Example : Amirmasoud@gmail.com"
        />
        <label>Password</label>
        <input
          type="password"
          {...register("password")}
          name="password"
          placeholder="type a password"
        />
        <Button block>Sign in</Button>
      </Form>
      <Button block icon="google" isGoogle onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
    </motion.div>
  );
};

export default SignIn;
