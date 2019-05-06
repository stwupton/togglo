import { ThemeType } from './names';
import { settings, user } from './reducers';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import firebase from 'firebase/app';
import 'firebase/auth';

const middleware = applyMiddleware(thunk, promiseMiddleware);

function reduce(state, action) {
  return {
    ...state,
    user: user(state.user, action),
    settings: settings(state.settings, action),
  };
}

function getDefaultUserState() {
  return new Promise(resolve => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      if (user) {
        resolve({
          loggedIn: true,
          loggingIn: false,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        });
      } else {
        resolve({
          loggedIn: false,
          loggingIn: false,
          name: null,
          email: null,
          photoUrl: null,
        });
      }
    });
  });
}

async function getDefaultState() {
  return {
    user: await getDefaultUserState(),
    settings: {
      themeType: ThemeType.LIGHT,
    }
  };
};

export async function initStore() {
  return createStore(
    reduce, 
    await getDefaultState(),
    middleware
  );
}