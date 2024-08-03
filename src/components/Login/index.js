import React, { useState } from 'react';
import { login } from '../../api';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import './index.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const jwtToken = Cookies.get('token');

  if (jwtToken !== undefined) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(username, password);
    if (response.token) {
      Cookies.set('token', response.token);
      window.location.href = '/'; // Redirect to home or another page
    } else {
      setError(response.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">Login</button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
