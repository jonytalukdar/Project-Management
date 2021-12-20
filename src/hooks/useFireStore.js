import { useEffect, useReducer, useState } from 'react';
import { app } from '../firebase/Firebase.config';
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
} from 'firebase/firestore/lite';

const db = getFirestore(app);
const timestamp = Timestamp;

//initialState
let initialState = {
  document: null,
  isLoading: false,
  error: null,
  success: null,
};

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOADING': {
      return { document: null, isLoading: true, error: null, success: false };
    }

    case 'SUCCESS': {
      return {
        document: action.payload,
        isLoading: false,
        error: null,
        success: true,
      };
    }

    case 'DELETED_DOCUMENT': {
      return {
        document: null,
        isLoading: false,
        error: null,
        success: true,
      };
    }

    case 'ERROR': {
      return {
        document: null,
        isLoading: false,
        success: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

const useFireStore = () => {
  ///states
  const [response, dispatch] = useReducer(reducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  console.log(response.user);

  //add document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_LOADING' });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const response = await addDoc(collection(db, 'transactions'), {
        ...doc,
        createdAt,
      });

      if (!isCancelled) {
        dispatch({ type: 'SUCCESS', payload: response });
      }
    } catch (error) {
      if (!isCancelled) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    }
  };

  //delete document

  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_LOADING' });

    try {
      await deleteDoc(doc(db, 'transactions', id));
      if (!isCancelled) {
        dispatch({ type: 'DELETED_DOCUMENT' });
      }
    } catch (error) {
      if (!isCancelled) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    }
  };

  //cleanup function

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument, deleteDocument };
};

export default useFireStore;
