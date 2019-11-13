import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home';
import NotFound from '../containers/NotFound';
import Login from '../containers/Login';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/App.scss'

const App = () => (
  <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route component={NotFound} />
      </Switch>
  </BrowserRouter>
);

export default App;