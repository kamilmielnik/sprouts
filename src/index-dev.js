import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import state from 'state';
import App from 'modules/app';
import './styles.scss';

const rootElement = document.getElementById('app');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider {...state}>
        <Component />
      </Provider>
    </AppContainer>,
    rootElement
  );
};

if (module.hot) {
  module.hot.accept('modules/app', () => render(App));
}

render(App);
