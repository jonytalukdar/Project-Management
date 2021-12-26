import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { AuthContext } from '../../context/AuthContext';
import useFireStore from '../../hooks/useFireStore';

const ProjectSummary = ({ project }) => {
  const { user } = useContext(AuthContext);
  const { deleteDocument, response } = useFireStore('projects');

  const navigate = useNavigate();

  const handleDelete = async (e) => {
    await deleteDocument(project.id);

    navigate('/', { replace: true });
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p> By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due date: {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project assigned by:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => {
            return (
              <div key={user.id}>
                <Avatar src={user.photoURL} />
              </div>
            );
          })}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleDelete}>
          {response.isLoading ? 'Deleting..' : 'Mark As Complete'}
        </button>
      )}
    </div>
  );
};

export default ProjectSummary;
