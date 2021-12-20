import { useContext, useEffect, useState } from 'react';
import { app } from '../firebase/Firebase.config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { AuthContext } from '../context/AuthContext';

const auth = getAuth(app);
const storage = getStorage(app);

const useSignup = () => {
  const { dispatch } = useContext(AuthContext);

  //states
  const [isCancelled, setIsCancelled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  //signup function
  const signup = async (email, password, displayName, thumbnail) => {
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

      //upload user profile photo

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, `images/${user.uid}` + thumbnail.name);
      const uploadTask = uploadBytesResumable(
        storageRef,
        thumbnail,
        'image/jpeg'
      );

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateProfile(user, { photoURL: downloadURL });
          });
        }
      );

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
