import { Routes, Route, Navigate } from 'react-router-dom';

//styles
import './App.css';

//pages and components
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user, authIsReady } = useContext(AuthContext);

  return (
    <div className="App">
      {user && <Sidebar />}
      <div className="container">
        <Navbar />
        {authIsReady && (
          <Routes>
            <Route
              path="/"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />

            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />

            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/login" />}
            />

            <Route
              path="/project/:id"
              element={user ? <Project /> : <Navigate to="/login" />}
            />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
