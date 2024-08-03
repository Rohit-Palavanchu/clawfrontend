import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CreateTodo from './components/CreateTodo';
import ViewTodos from './components/ViewTodos';
import EditTodo from './components/EditTodo';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute exact path="/create-todo" component={CreateTodo} />
          <ProtectedRoute path="/todos" component={ViewTodos} />
          <ProtectedRoute path="/edit-todo/:id" component={EditTodo} />
          <ProtectedRoute path="/" exact component={ViewTodos} /> {/* Default route */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
