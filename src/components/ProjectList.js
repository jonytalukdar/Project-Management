import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';

//styles
import './ProjectList.css';

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No Projects Added Yet!</p>}
      {projects.map((project) => {
        return (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <h4>{project.name}</h4>
            <p>Due to {project.dueDate.toDate().toDateString()}</p>
            <div className="assigned-to">
              <ul>
                {project.assignedUsersList.map((user) => {
                  return (
                    <li key={user.photoURL}>
                      <Avatar src={user.photoURL} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectList;
