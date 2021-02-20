import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import LoginForm from './LoginForm';
import UserList from './UserList';
import { User } from './types';

const App: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/restricted/users',
          {
            withCredentials: true,
          }
        );
        setUsers(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const onLogin = async (user: User): Promise<void> => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        user,
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <LoginForm onLogin={onLogin} />
      <UserList users={users} />
    </div>
  );
};

export default App;
