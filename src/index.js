import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import state from 'state';
import App from 'modules/app';
import './styles.scss';

const rootElement = document.getElementById('app');

ReactDOM.render(
  <Provider {...state}>
    <App />
  </Provider>,
  rootElement
);
