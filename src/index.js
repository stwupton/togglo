import 'babel-polyfill';
import { initFirebase } from './init_firebase';
import App from './components/app';
import React from 'react';
import ReactDOM from 'react-dom';
import storeManager from './store_manager';
import { Providers } from './components/util/providers';

(async () => {
  await initFirebase();
  await storeManager.init();

  ReactDOM.render((
    <Providers store={storeManager.store}>
      <App />
    </Providers>
  ), document.querySelector('#root'));
})();