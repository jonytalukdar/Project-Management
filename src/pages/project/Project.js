import React from 'react';

import { useParams } from 'react-router-dom';
import useDocument from '../../hooks/useDocument';
import ProjectSummary from './ProjectSummary';

import './Project.css';

const Project = () => {
  const { id } = useParams();

  const { document, error, isLoading } = useDocument('projects', id);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isLoading) {
    return <h2>loading..</h2>;
  }

  return (
    <div className="project-details">
      {document && <ProjectSummary project={document} />}
    </div>
  );
};

export default Project;
