import { ToggleActionType } from "../actions/toggle";

export function toggles(state, action) {
  if (action.error) {
    return state;
  }
  
  state = refreshToggles(state, action);

  return {
    owned: owned(state.owned, action),
    subscribed: subscribed(state.subscribed, action),
  };
}

function owned(state, action) {
  state = state.map(toggle => ({
    ...toggle,
    ...updateOptions(toggle, action),
  }));

  return [
    ...state,   
    ...createToggle(state, action),
  ];
}

function subscribed(state, action) {
  const newState = [...state];
  return newState;
}

function createToggle(state, action) {
  if (action.type == ToggleActionType.CREATED) {
    return [action.payload];
  }
  return [];
}

function refreshToggles(state, action) {
  if (action.type == ToggleActionType.REFRESH) {
    return {
      owned: action.payload.owned,
      subscribed: action.payload.subscribed,
    };
  }
  return state;
}

function updateOptions(state, action) {
  if (
    action.type == ToggleActionType.UPDATE_OPTIONS && 
    state.id == action.payload.id
  ) {
    return { options: action.payload.options };
  }
}