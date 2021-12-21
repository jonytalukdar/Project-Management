import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

import Temple from '../assets/temple.svg';

//styles
import './Navbar.css';

const Navbar = () => {
  const { signout, isLoading } = useLogout();
  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="Dojo" />
          <span>The Dojo</span>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <button className="btn" onClick={signout}>
            {isLoading ? 'Signout..' : 'Logout'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
