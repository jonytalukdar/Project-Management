import { useContext, useEffect, useState } from 'react';
import { app } from '../firebase/Firebase.config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';

const auth = getAuth(app);

const useSignup = () => {
  const { dispatch } = useContext(AuthContext);

  //states
  const [isCancelled, setIsCancelled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  //signup function
  const signup = async (email, password, displayName) => {
    setIsLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = response.user;

      if (!response) {
        throw new Error('Could not complete signup!');
      }

      //update display name
      await updateProfile(user, { displayName });

      //update dispatch
      dispatch({ type: 'LOGIN', payload: user });

      if (!isCancelled) {
        setIsLoading(false);
        setError('');
      }
    } catch (error) {
      if (!isCancelled) {
        setIsLoading(false);
        setError(error.code);
      }
    }
  };

  //cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isLoading };
};

export default useSignup;
