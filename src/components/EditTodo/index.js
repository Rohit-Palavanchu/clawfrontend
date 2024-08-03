import React, { useState, useEffect } from 'react';
import { updateTodo } from '../../api';
import Cookies from 'js-cookie';
import './index.css'; 

const EditTodo = ({ match }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const todoId = match.params.id;

  useEffect(() => {
    const fetchTodo = async () => {
      const token = Cookies.get('token');
      // Replace with your actual API call to fetch the todo details
      const response = await fetch(`/api/todos/${todoId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const todo = await response.json();
      if (response.ok) {
        setTitle(todo.title);
        setDescription(todo.description);
      } else {
        setError('Failed to fetch todo details');
      }
    };

    fetchTodo();
  }, [todoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    const response = await updateTodo(todoId, title, description, token);
    if (response.message === 'Todo updated successfully') {
      window.location.href = '/todos'; // Redirect to view todos
    } else {
      setError(response.message || 'Failed to update todo');
    }
  };

  return (
    <div className="edit-todo-container">
      <h2 className="edit-todo-title">Edit Todo</h2>
      <form className="edit-todo-form" onSubmit={handleSubmit}>
        <input
          className="edit-todo-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="edit-todo-input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="edit-todo-button" type="submit">Update Todo</button>
        {error && <p className="edit-todo-error">{error}</p>}
      </form>
    </div>
  );
};

export default EditTodo;
