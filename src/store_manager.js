import { ThemeType } from './names';
import { settings, user } from './reducers';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import 'firebase/auth';
import { snackbars } from './reducers/snackbar';
import { get, set, Store } from 'idb-keyval';
import { composeWithDevTools } from 'redux-devtools-extension';

class StoreManager {
  constructor() {
    this.store = null;
    this.middleware = applyMiddleware(thunk, promiseMiddleware);
    this.backupStore = new Store('togglo', 'backup');
  }

  async init() {
    const defaultState = await this.getDefaultState();
    this.store = createStore(this.reduce, defaultState, this.middleware);

    // Debug
    // const devtools = composeWithDevTools({ trace: true, traceLimit: 25 });
    // this.store = createStore(this.reduce, defaultState, devtools(this.middleware));

    this.store.subscribe(() => this.onStoreUpdate(this.store.getState()));
  }

  async getDefaultUserState() {
    const user = await get('user', this.backupStore);
    return {
      loggedIn: user && user.loggedIn || false,
      loggingIn: false,
      name: user && user.name,
      email: user && user.email,
      photoUrl: user && user.photoUrl,
      uid: user && user.uid,
      toggles: user && user.toggles || { owned: [], subscribed: [] },
    };
  }

  async getDefaultSettings() {
    const settings = await get('settings', this.backupStore);
    return {
      themeType: settings && settings.themeType || ThemeType.LIGHT
    };
  }

  async getDefaultState() {
    return {
      user: await this.getDefaultUserState(),
      settings: await this.getDefaultSettings(),
      snackbars: [],
    };
  }

  onStoreUpdate(state) {
    set('user', state.user, this.backupStore);
    set('settings', state.settings, this.backupStore);
  }

  reduce(state, action) {
    return {
      ...state,
      user: user(state.user, action),
      settings: settings(state.settings, action),
      snackbars: snackbars(state.snackbars, action),
    };
  }
}

export default new StoreManager();