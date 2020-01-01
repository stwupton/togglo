import 'babel-polyfill';
import 'typeface-roboto';
import { initFirebase } from './init_firebase';
import App from './components/app';
import React from 'react';
import ReactDOM from 'react-dom';
import storeManager from './store_manager';
import serviceWorkerManager from './service_worker_manager';
import { Providers } from './components/util/providers';

(async () => {
  serviceWorkerManager.init();
  await initFirebase();
  await storeManager.init();

  ReactDOM.render((
    <Providers store={storeManager.store}>
      <App />
    </Providers>
  ), document.querySelector('#root'));
})();