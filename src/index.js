import 'babel-polyfill';
import { initFirebase } from './init_firebase';
import App from './components/app';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { initStore } from './store';

(async () => {
  await initFirebase();
  const store = await initStore();

  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.querySelector('#root'));
})();