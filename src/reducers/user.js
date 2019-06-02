import { UserActionType } from '../actions/user';

export function user(state, action) {
  return {
    ...state,
    ...loggedIn(state, action),
    ...loggedOut(state, action),
    ...updateInfo(state, action),
    loggingIn: loggingIn(state.loggingIn, action)
  };
}

function loggingIn(state, action) {
  switch (action.type) {
    case UserActionType.LOGGING_IN:
      return true;
    case UserActionType.LOGGED_IN:
    case UserActionType.LOGGED_OUT:
      return false;
    default:
      return state;
  }
}

function loggedIn(state, action) {
  if (action.type === UserActionType.LOGGED_IN) {
    if (action.error) {
      return { 
        loggedIn: false, 
        name: null, 
        email: null, 
        photoUrl: null,
      };
    }

    return {
      loggedIn: true,
      ...action.payload,
    };
  }
}

function loggedOut(state, action) {
  if (action.type === UserActionType.LOGGED_OUT) {
    return {
      loggedIn: false,
      name: null,
      email: null,
      photoUrl: null,
    };
  }
}

function updateInfo(state, action) {
  if (action.type === UserActionType.UPDATE_INFO) {console.log('updates info', action);
    return {
      loggedIn: true,
      ...action.payload
    };
  }
}