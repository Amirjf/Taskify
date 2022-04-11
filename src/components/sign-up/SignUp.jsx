import React, { useEffect } from "react";
import Button from "../button/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  createUserProfileDocument,
} from "../../firebase/firebase.config";
import { useForm } from "react-hook-form";
import Input from "../input/Input";
import { toast } from "react-toastify";
import { createAuthUserWithEmailAndPassword } from "../../firebase/firebase.auth";

const SignUn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

  const onSubmit = async (data) => {
    const { email, password, displayName } = data;

    try {
      // const { user } = await auth.createUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      // await createUserProfileDocument(user, { displayName });
      await createAuthUserWithEmailAndPassword(email, password);
      createAuthUserWithEmailAndPassword(email, password);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <motion.div layout className="sign-up-container">
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
