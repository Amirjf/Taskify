import React, { useEffect } from "react";
import Button from "../button/Button";
import { motion } from "framer-motion";
import Logo from "../../assets/images/mylogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
} from "../../firebase/firebase.config";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import "./_signup.scss";
import Input from "../input/Input";

const SignUn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

  const onSubmit = (data) => {
    const { email, password, displayName } = data;
    registerWithEmailAndPassword(displayName, email, password);
  };

  return (
    <motion.div layout className="sign-up-container">
      <div className="logo-container">
        <img src={Logo} alt="logo" />
      </div>
      <h1>Register an account</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Full Name"
          registerLabel="displayName"
          errors={errors}
          register={register}
          required
          placeholder="Example : Amirmasoud Jafari"
        />
        <Input
          label="Email"
          registerLabel="email"
          errors={errors}
          register={register}
          required
          placeholder="Example : Amirmasoud@gmail.com"
        />
        <Input
          type="password"
          label="Password"
          registerLabel="password"
          register={register}
          errors={errors}
          required
          placeholder="type a password"
        />
        <Button block>Sign Up Now !</Button>
      </form>
    </motion.div>
  );
};

export default SignUn;
