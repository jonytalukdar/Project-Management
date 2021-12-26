import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { Timestamp } from 'firebase/firestore';
import useFireStore from '../../hooks/useFireStore';
import Avatar from '../../components/Avatar';

const timestamp = Timestamp;

const ProjectComments = ({ project, id }) => {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const { updateDocument, response } = useFireStore('projects');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: comment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    await updateDocument(id, [...project.comments, newComment]);

    if (!response.error) {
      setComment('');
    }
  };

  return (
    <div className="project-comments">
      <h4>Project Comment</h4>

      {/* comments list */}
      <ul>
        {project.comments.length > 0 &&
          project.comments.map((com) => {
            return (
              <li key={com.id}>
                <div className="comment-author">
                  <Avatar src={com.photoURL} />
                  <p>{com.displayName}</p>
                </div>
                <div className="comment-date">
                  <p>date here</p>
                </div>
                <div className="comment-content">
                  <p>{com.content}</p>
                </div>
              </li>
            );
          })}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add New Comment:</span>
          <textarea
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </label>

        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
};

export default ProjectComments;
