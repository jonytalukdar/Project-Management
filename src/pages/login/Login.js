import React, { useState } from 'react';

import useLogin from '../../hooks/useLogin';

//styles
import '../signup/Signup.css';

const Login = () => {
  const { signin, isLoading, error } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>

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

      {error && <div className="error">{error}</div>}
      <button type="submit" className="btn">
        {isLoading ? 'Loading' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
