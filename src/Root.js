import React from 'react';

import { Provider } from 'mobx-react';

import './styles/Root.scss';
import stores from './stores';

import App from './App';

const Root = () => (
  <Provider {...stores}>
    <App />
  </Provider>
);

export default Root;
