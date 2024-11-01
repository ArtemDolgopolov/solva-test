/* eslint-disable @typescript-eslint/no-unused-vars */

import classes from './SignupForm.module.scss'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import {
  auth,
  firebaseConfig,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from '../../services/firebaseAuth'
import { useState } from 'react'

export default function SignupForm() {
  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm();
  const [errors, setErrors] = useState<Error[]>([]);
  const onSubmit = async (formData: FieldValues) => {
    const { email, password } = formData;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Successfully registered!');
      setErrors([]);
    } catch (e) {
      if (e instanceof Error) {
        setErrors((previousErrors) => [...previousErrors, e as Error]);
      }
    }
  };
  if (auth.currentUser) {
    return <div>Logged In</div>;
  }
  return (
    <form action="submit" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classes.fieldset}>
        <legend>Register Form</legend>
        <label htmlFor="email">Email</label>
        <input
          {...register('email')}
          name="email"
          id="email"
          placeholder="email"
        />
        <label htmlFor="password">Password</label>
        <input
          {...register('password')}
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">Submit</button>
        {errors.map((error, i) => (
          <div key={i}> {error.message}</div>
        ))}
      </fieldset>
    </form>
  );
}