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
  existingEmailLoginError(newState, action);
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

function existingEmailLoginError(state, action) {
  if (
    action.type === UserActionType.LOGGED_IN && 
    action.error && 
    action.payload.code === 'auth/account-exists-with-different-credential'
  ) {
    close(state, { type: SnackbarActionType.CLOSE });

    state.push({
      ...baseSnackbar(),
      type: SnackbarMessageType.ERROR,
      message: 'An account with that email already exists.'
    });
  }
}

function generateKey() {
  return Math.random().toString(36).substr(2, 5);
}