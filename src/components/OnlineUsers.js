import React from 'react';

import Avatar from './Avatar';
import LoadingSpinner from './UI/LoadingSpinner';
import useCollection from '../hooks/useCollection';

//styles
import './OnlineUsers.css';

const OnlineUsers = () => {
  const { documents, error, isLoading } = useCollection('users');

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div>{error}</div>}
      {documents &&
        documents.map((user) => {
          return (
            <div key={user.id} className="user-list-item">
              {user.online && <span className="online-user"></span>}
              <span>{user.displayName}</span>
              <Avatar src={user.photoURL} />
            </div>
          );
        })}
    </div>
  );
};

export default OnlineUsers;
