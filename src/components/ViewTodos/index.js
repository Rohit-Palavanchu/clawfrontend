import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import Cookies from 'js-cookie';
import './index.css';  

const ViewTodos = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const token = Cookies.get('token');
      const response = await getTodos(token);
      if (response.length) {
        setTodos(response);
      } else {
        setError('Failed to load todos');
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="view-todos-container">
      <h2 className="view-todos-title">View Todos</h2>
      {error && <p className="view-todos-error">{error}</p>}
      <ul className="view-todos-list">
        {todos.map(todo => (
          <li className="view-todos-item" key={todo.id}>
            <h3 className="view-todos-item-title">{todo.title}</h3>
            <p className="view-todos-item-description">{todo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTodos;
