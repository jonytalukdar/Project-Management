import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

import Temple from '../assets/temple.svg';
import Idea from '../assets/idea.png';

//styles
import './Navbar.css';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { signout, isLoading } = useLogout();
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Idea} alt="Dojo" />

          <span>Projective</span>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            <button className="btn" onClick={signout}>
              {isLoading ? 'Signout..' : 'Logout'}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
