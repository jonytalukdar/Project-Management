import React, { useState } from 'react';

//styles
import './Create.css';

const Create = () => {
  //states
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [categoy, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);

  //submit Handler
  const submitHandler = (e) => {
    e.preventDefault();

    console.log(name, details, dueDate);
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

        <button className="btn">Create</button>
      </form>
    </div>
  );
};

export default Create;
