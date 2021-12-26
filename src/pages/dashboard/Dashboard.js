import { useContext } from 'react';
import { useState } from 'react';
import ProjectList from '../../components/ProjectList';

import useCollection from '../../hooks/useCollection';
import { AuthContext } from '../../context/AuthContext';

//style
import './Dashboard.css';
import ProjectFilter from './ProjectFilter';

const Dashboard = () => {
  const { documents, error } = useCollection('projects');
  const { user } = useContext(AuthContext);
  //states
  const [currentFilter, setCurrentFilter] = useState('all');

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case 'all': {
            return true;
          }

          case 'mine': {
            let assignedToMe;
            document.assignedUsersList.forEach((u) => {
              if (user.uid === u.id) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          }

          case 'development':
          case 'design':
          case 'marketing':
          case 'sales':
            console.log(currentFilter, document);
            return document.category === currentFilter;

          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <div className="error">{error}</div>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {documents && <ProjectList projects={projects} />}
    </div>
  );
};

export default Dashboard;
