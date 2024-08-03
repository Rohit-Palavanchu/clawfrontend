import React, { useState } from 'react';
import { register } from '../../api';
import './index.css'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(username, password);
    if (response.message === 'User registered successfully') {
      window.location.href = '/login'; // Redirect to login page
    } else {
      setError(response.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="register-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-button" type="submit">Register</button>
        {error && <p className="register-error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
