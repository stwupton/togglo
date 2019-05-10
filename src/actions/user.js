import { LoginService } from '../names';
import firebase from 'firebase/app';
import 'firebase/auth';

const loginMethods = {
  [LoginService.GOOGLE]: googleLogin
};

export const UserActionType = {
  LOGGING_IN: 'logging_in',
  LOGGED_IN: 'logged_in',
  LOGGED_OUT: 'logged_out',
};

async function googleLogin() { 
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
  return {
    name: result.user.displayName,
    email: result.user.email,
    photoUrl: result.user.photoURL
  };
}

export function login(service) {
  if (service == null || loginMethods[service] == null) {
    throw 'Login service not specified or not recognised.';
  }

  return dispatch => {
    dispatch({ type: UserActionType.LOGGING_IN });
    dispatch({ 
      type: UserActionType.LOGGED_IN, 
      payload: loginMethods[service]() 
    });
  }
}

export async function logout() {
  await firebase.auth().signOut();
  return { type: UserActionType.LOGGED_OUT };
}