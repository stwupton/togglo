export const SnackbarActionType = {
  CLOSE: 'close',
  CLEAR: 'clear',
};

export function closeSnackbar() {
  return { type: SnackbarActionType.CLOSE };
}

export function clearSnackbar() {
  return { type: SnackbarActionType.CLEAR };
}