import { useContext } from 'react';
import { useState } from 'react';
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

import useCollection from '../../hooks/useCollection';
import { AuthContext } from '../../context/AuthContext';

//style
import './Dashboard.css';

const Dashboard = () => {
  const { documents, error, isLoading } = useCollection('projects');
  const { user } = useContext(AuthContext);

  //states
  const [currentFilter, setCurrentFilter] = useState('all');

  const changeFilter = (newFilter) => {
    console.log(newFilter);
    setCurrentFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case 'all':
            return true;

          case 'mine':
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;

          case 'development':
          case 'design':
          case 'sales':
          case 'marketing':
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
