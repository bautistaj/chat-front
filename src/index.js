import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

const initialState = {
  currentUser: undefined,
  users: [],
  messages: [],
  message: undefined,
  currentChatId: undefined,
  loading: true,
  error: false,
};

const store  = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
document.getElementById('app'));