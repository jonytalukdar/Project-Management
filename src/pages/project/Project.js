import React from 'react';

import { useParams } from 'react-router-dom';
import useDocument from '../../hooks/useDocument';
import ProjectSummary from './ProjectSummary';

import './Project.css';
import ProjectComments from './ProjectComments';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const Project = () => {
  const { id } = useParams();

  const { document, error, isLoading } = useDocument('projects', id);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="project-details">
      {document && <ProjectSummary project={document} />}
      {document && <ProjectComments project={document} />}
    </div>
  );
};

export default Project;
