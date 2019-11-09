export const SnackbarActionType = {
  CLOSE: 'close',
  CLEAR: 'clear',
  OPEN: 'open',
};

export function closeSnackbar() {
  return { type: SnackbarActionType.CLOSE };
}

export function clearSnackbar() {
  return { type: SnackbarActionType.CLEAR };
}

export function openSnackbar(type, message, autoHideDuration = 6000) {
  return { 
    type: SnackbarActionType.OPEN,
    payload: { type, message, autoHideDuration }
  };
}