import React, { useEffect } from "react";
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
    if (user) {
      toast.success(`Sign in was Succussfull`);
      navigate("/");
    }
  }, [user, loading]);

  const onSubmit = (data) => {
    const { email, password, displayName } = data;
    logInWithEmailAndPassword(email, password, displayName);
  };
  return (
    <div className="sign-in-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          registerLabel="email"
          errors={errors}
          register={register}
          required
          placeholder="Example : Amirmasoud@gmail.com"
        />

        <Input
          label="Password"
          type="password"
          registerLabel="password"
          errors={errors}
          register={register}
          required
          placeholder="type a password"
        />
        <div className="sign-in-button-container">
          <Button type="submit" block>
            Sign in
          </Button>
        </div>
      </form>
      <Button block icon="google" isGoogle onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
    </div>
  );
};

export default SignIn;
