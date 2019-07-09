import { ThemeType } from './names';
import { settings, user } from './reducers';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import 'firebase/auth';
import { snackbars } from './reducers/snackbar';
import { get, set, Store } from 'idb-keyval';

const middleware = applyMiddleware(thunk, promiseMiddleware);
const backupStore = new Store('togglo', 'backup');

function reduce(state, action) {
  return {
    ...state,
    user: user(state.user, action),
    settings: settings(state.settings, action),
    snackbars: snackbars(state.snackbars, action),
  };
}

async function getDefaultUserState() {
  const user = await get('user', backupStore);
  return {
    loggedIn: user && user.loggedIn || false,
    loggingIn: false,
    name: user && user.name,
    email: user && user.email,
    photoUrl: user && user.photoUrl,
    toggles: user && user.toggles || { owned: null, subscribed: null },
  };
}

async function getDefaultSettings() {
  const settings = await get('settings', backupStore);
  return {
    themeType: settings && settings.themeType || ThemeType.LIGHT
  };
}

async function getDefaultState() {
  return {
    user: await getDefaultUserState(),
    settings: await getDefaultSettings(),
    snackbars: [],
  };
}

function onStoreUpdate(state) {
  set('user', state.user, backupStore);
  set('settings', state.settings, backupStore);
}

export async function initStore() {
  const defaultState = await getDefaultState();
  const store = createStore(reduce, defaultState, middleware);
  store.subscribe(() => onStoreUpdate(store.getState()));
  return store;
}