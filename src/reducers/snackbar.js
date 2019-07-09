import { UserActionType } from '../actions/user';
import { SnackbarActionType } from '../actions/snackbar';
import { SnackbarMessageType } from '../names';

function baseSnackbar() {
  return {
    key: generateKey(),
    type: SnackbarMessageType.REGULAR,
    message: 'Default message. You shouldn\'t be seeing this.',
    autoHideDuration: 6000,
    open: true,
  };
}

export function snackbars(state, action) {
  let newState = [...state];
  close(newState, action);
  clear(newState, action);
  loginErrors(newState, action);
  return newState;
}

function clear(state, action) {
  if (action.type === SnackbarActionType.CLEAR) {
    let i = state.length;
    while (i--) {
      if (!state[i].open) state.splice(i, 1);
    }
  }
}

function close(state, action) {
  if (action.type === SnackbarActionType.CLOSE) {
    for (const snackbar of state) {
      snackbar.open = false;
    }
  }
}

function loginErrors(state, action) {
  if (action.type === UserActionType.SIGNED_IN && action.error) {
    close(state, { type: SnackbarActionType.CLOSE });

    let snackbarData = {};
    switch (action.payload.code) {
      case 'auth/account-exists-with-different-credential':
        snackbarData = {
          type: SnackbarMessageType.ERROR,
          message: 'An account with that email already exists.'
        };
        break;
      case 'auth/popup-closed-by-user':
        return;
      default:
        snackbarData = {
          type: SnackbarMessageType.ERROR,
          message: 'Could not sign into account.'
        };
    }

    state.push({ ...baseSnackbar(), ...snackbarData });
  }
}

function generateKey() {
  return Math.random().toString(36).substr(2, 5);
}