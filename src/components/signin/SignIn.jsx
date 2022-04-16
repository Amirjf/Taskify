import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/firebase.config";
import { useForm } from "react-hook-form";
import Input from "../input/Input";

const SignIn = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [user, loading, error] = useAuthState(auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      <h1 className="texh-white">Loading ...</h1>;
      return;
    }
    if (user) {
      toast.success(`Sign in was Succussfull`);
      navigate("/");
    }
  }, [user, loading]);

  // const onSubmit = (data) => {
  //   const { email, password, displayName } = data;
  //   logInWithEmailAndPassword(email, password, displayName);
  // };

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
  };

  const handleSignInWithEmailAndPassword = async () => {
    const { email, password } = formValues;
    logInWithEmailAndPassword(email, password);
    console.log(formValues);
  };

  const { email, password } = formValues;

  return (
    <div className="sign-in-container">
      <div>
        <input
          label="Email"
          name="email"
          onChange={handleChange}
          value={email}
          required
          placeholder="Example : Amirmasoud@gmail.com"
        />

        <input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
          placeholder="type a password"
        />
        <div className="sign-in-button-container">
          <Button onClick={handleSignInWithEmailAndPassword}>Sign in</Button>
        </div>
        <Button
          type="button"
          icon="google"
          isGoogle
          onClick={handleSignInWithGoogle}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
