import React, { useContext, useEffect, useState } from 'react';

import { Timestamp } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';

//react select
import Select from 'react-select';

import useCollection from '../../hooks/useCollection';
import useFireStore from '../../hooks/useFireStore';

//styles
import './Create.css';
import { useNavigate } from 'react-router-dom';

const timestamp = Timestamp;

//categories
const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

const Create = () => {
  const { user } = useContext(AuthContext);
  const { documents } = useCollection('users');
  const { addDocument, response } = useFireStore('projects');
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  //states
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [categoy, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  //fetch user for options
  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { label: user.displayName, value: user };
      });
      setUsers(options);
    }
  }, [documents]);

  //submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!categoy) {
      setFormError('Plase select the category!');
      return;
    }

    if (assignedUsers.length === 0) {
      setFormError('Please select a project to at least one user!');
      return;
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const project = {
      name,
      details,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      categoy: categoy.value,
      createdBy,
      comments: [],
      assignedUsersList,
    };

    await addDocument(project);
    if (!response.error) {
      navigate('/');
    }
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Add Project</h2>

      <form onSubmit={submitHandler}>
        <label>
          <span>Name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Details:</span>
          <textarea
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            rows="2"
          ></textarea>
        </label>

        <label>
          <span>Date:</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Categories:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>

        <label>
          <span>Assigned User:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        {formError && <div className="error">{formError}</div>}
        {response.error && <div className="error">{response.error}</div>}

        <button className="btn">
          {response.isLoading ? 'Loading' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default Create;
