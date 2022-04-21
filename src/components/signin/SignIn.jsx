import React, { useEffect, useState } from 'react';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebase/firebase.config';

const SignIn = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
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
      navigate('/');
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
  };

  const { email, password } = formValues;

  return (
    <div className="sign-in-container">
      <div>
        <div className="input-container">
          <label>Email</label>
          <input
            name="email"
            onChange={handleChange}
            value={email}
            required
            placeholder="Example : Amirmasoud@gmail.com"
          />
        </div>
        <div className="input-container">
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            placeholder="type a password"
          />
        </div>

        <div className="sign-in-button-container">
          <Button onClick={handleSignInWithEmailAndPassword}>Sign in</Button>
        </div>

        <div className="sign-in-with-google-btn">
          <h3 className="google-sign-in-text">Or Sign in with Google </h3>
          <Button icon="google" isGoogle onClick={handleSignInWithGoogle}>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
