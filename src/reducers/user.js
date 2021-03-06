import { UserActionType } from '../actions/user';
import { toggles } from './toggles'

export function user(state, action) {
  return {
    ...state,
    ...loggedIn(state, action),
    ...loggedOut(state, action),
    ...updateInfo(state, action),
    loggingIn: loggingIn(state.loggingIn, action),
    toggles: toggles(state.toggles, action),
    messagingToken: messagingToken(state.messagingToken, action),
  };
}

function loggingIn(state, action) {
  switch (action.type) {
    case UserActionType.SIGNING_IN:
      return true;
    case UserActionType.SIGNED_IN:
    case UserActionType.SIGNED_OUT:
      return false;
    default:
      return state;
  }
}

function loggedIn(state, action) {
  if (action.type === UserActionType.SIGNED_IN) {
    if (action.error) {
      return { 
        loggedIn: false, 
        name: null, 
        email: null, 
        photoUrl: null,
        uid: null,
        toggles: { owned: [], subscribed: [] },
        messagingToken: null,
      };
    }

    return {
      loggedIn: true,
      ...action.payload,
    };
  }
}

function loggedOut(state, action) {
  if (action.type === UserActionType.SIGNED_OUT) {
    return {
      loggedIn: false,
      name: null,
      email: null,
      photoUrl: null,
      uid: null,
      toggles: { owned: [], subscribed: [] },
      messagingToken: null,
    };
  }
}

function messagingToken(state, action) {
  if (action.type === UserActionType.SET_MESSAGING_TOKEN) {
    return action.payload;
  }

  if (action.type === UserActionType.UNSET_MESSAGING_TOKEN) {
    if (state == action.payload) return null;
  }

  return state;
}

function updateInfo(state, action) {
  if (action.type === UserActionType.UPDATE_INFO) {
    return {
      loggedIn: true,
      ...action.payload
    };
  }
}