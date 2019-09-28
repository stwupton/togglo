import { ToggleActionType } from "../actions/toggle";

export function toggles(state, action) {
  return {
    owned: owned(state.owned, action),
    subscribed: subscribed(state.subscribed, action),
  };
}

function owned(state, action) {
  const newState = [...state];
  createToggle(newState, action);
  refreshToggles(newState, action);
  return newState;
}

function subscribed(state, action) {
  const newState = [...state];
  return newState;
}

function createToggle(newState, action) {
  if (action.type == ToggleActionType.CREATED) {
    newState.push(action.payload);
  }
}

function refreshToggles(newState, action) {
  if (action.type == ToggleActionType.REFRESH) {
    newState.splice(0, newState.length, ...action.payload);
  }
}