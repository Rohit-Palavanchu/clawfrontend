import React, { useState } from 'react';
import { createTodo } from '../../api';
import Cookies from 'js-cookie';
import './index.css';  // Import the CSS file

const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    const response = await createTodo(title, description, token);
    if (response.id) {
      window.location.href = '/todos'; // Redirect to view todos
    } else {
      setError(response.message || 'Failed to create todo');
    }
  };

  return (
    <div className="create-todo-container">
      <h2 className="create-todo-title">Create Todo</h2>
      <form className="create-todo-form" onSubmit={handleSubmit}>
        <input
          className="create-todo-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="create-todo-input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="create-todo-button" type="submit">Create Todo</button>
        {error && <p className="create-todo-error">{error}</p>}
      </form>
    </div>
  );
};

export default CreateTodo;
