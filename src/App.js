import { Routes, Route } from 'react-router-dom';

import './App.css';
import Create from './pages/create/Create';

//components
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/project/:id" element={<Project />} />
      </Routes>
    </div>
  );
}

export default App;
