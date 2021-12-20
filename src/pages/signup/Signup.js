import React, { useState } from 'react';
import useSignup from '../../hooks/useSignup';

//styles
import './Signup.css';

const Signup = () => {
  const { signup, isLoading, error } = useSignup();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  //file upload

  const handleFileUpload = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError('Please selec a file!');
      return;
    }

    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image!');
      return;
    }

    if (selected.size > 100000) {
      setThumbnailError('Selected image size must be less than 100kb');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, displayName, thumbnail);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <label>
        <span>Email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <label>
        <span>Name:</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
      </label>

      <label>
        <span>Profile Picture:</span>
        <input type="file" required onChange={handleFileUpload} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>

      {error && <div className="error">{error}</div>}
      <button type="submit" className="btn">
        {isLoading ? 'Loading' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Signup;
