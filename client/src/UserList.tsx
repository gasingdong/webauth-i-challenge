import React from 'react';
import { User } from './types';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = (props: UserListProps) => {
  const { users } = props;
  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.username} className="user">
          <h1>{user.username}</h1>
        </div>
      ))}
    </div>
  );
};

export default UserList;
