import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import state from 'state';
import App from 'modules/app';
import './styles.scss';

useStrict(true);
const rootElement = document.getElementById('app');

ReactDOM.render(
  <Provider {...state}>
    <App />
  </Provider>,
  rootElement
);
