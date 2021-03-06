import { AuthService } from '../names';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';

const authProviders = {
  [AuthService.GOOGLE]: new firebase.auth.GoogleAuthProvider(),
  [AuthService.FACEBOOK]: new firebase.auth.FacebookAuthProvider()
};

export const UserActionType = {
  SIGNING_IN: 'signing_in',
  SIGNED_IN: 'signed_in',
  SIGNED_OUT: 'signed_out',
  UPDATE_INFO: 'update_info',
  SET_MESSAGING_TOKEN: 'set_messaging_token',
  UNSET_MESSAGING_TOKEN: 'unset_messaging_token',
};

export async function setMessagingToken(token) {
  try {
    const setUserMessagingToken = 
      firebase.functions().httpsCallable('setUserMessagingToken');
    await setUserMessagingToken({ token });
  } catch (e) {
    return {};
  }

  return {
    type: UserActionType.SET_MESSAGING_TOKEN,
    payload: token,
  };
}

async function signInWithService(service) { 
  const provider = authProviders[service];
  const result = await firebase.auth().signInWithPopup(provider);
  return {
    name: result.user.displayName,
    email: result.user.email,
    photoUrl: result.user.photoURL,
    uid: result.user.uid,
  };
}

export function signIn(service) {
  if (service == null || authProviders[service] == null) {
    throw 'Login service not specified or not recognised.';
  }

  return dispatch => {
    dispatch({ type: UserActionType.SIGNING_IN });
    dispatch({ 
      type: UserActionType.SIGNED_IN, 
      payload: signInWithService(service) 
    });
  }
}

export async function signOut() {
  await firebase.auth().signOut();
  return { type: UserActionType.SIGNED_OUT };
}

export function updateInfo(firebaseUser) {
  return {
    type: UserActionType.UPDATE_INFO,
    payload: {
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      photoUrl: firebaseUser.photoURL,
      uid: firebaseUser.uid
    }
  };
}

export async function unsetMessagingToken(token) {
  try {
    const unsetUserMessagingToken = 
      firebase.functions().httpsCallable('unsetUserMessagingToken');
    await unsetUserMessagingToken({ token });
  } catch (e) {
    return {};
  }

  return {
    type: UserActionType.UNSET_MESSAGING_TOKEN,
    payload: token,
  };
}