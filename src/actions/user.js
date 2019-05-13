import { LoginService } from '../names';
import firebase from 'firebase/app';
import 'firebase/auth';

const authProviders = {
  [LoginService.GOOGLE]: new firebase.auth.GoogleAuthProvider(),
  [LoginService.FACEBOOK]: new firebase.auth.FacebookAuthProvider()
};

export const UserActionType = {
  LOGGING_IN: 'logging_in',
  LOGGED_IN: 'logged_in',
  LOGGED_OUT: 'logged_out',
};

async function loginWithService(service) { 
  const provider = authProviders[service];
  const result = await firebase.auth().signInWithPopup(provider);
  return {
    name: result.user.displayName,
    email: result.user.email,
    photoUrl: result.user.photoURL
  };
}

export function login(service) {
  if (service == null || authProviders[service] == null) {
    throw 'Login service not specified or not recognised.';
  }

  return dispatch => {
    dispatch({ type: UserActionType.LOGGING_IN });
    dispatch({ 
      type: UserActionType.LOGGED_IN, 
      payload: loginWithService(service) 
    });
  }
}

export async function logout() {
  await firebase.auth().signOut();
  return { type: UserActionType.LOGGED_OUT };
}