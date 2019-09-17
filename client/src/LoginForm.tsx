import React, { useState } from 'react';
import { User } from './types';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const { onLogin } = props;
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onLogin(user);
    setUser({
      username: '',
      password: '',
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        <label htmlFor="username">
          Username
          <input
            id="username"
            name="username"
            placeholder="John_Doe"
            type="text"
            value={user.username}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            placeholder="12345678"
            type="text"
            value={user.password}
            onChange={changeHandler}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
