import { createStore } from 'redux';

export const store = createStore((state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: ++state.count };
    default:
      return state;
  }
}, { count: 0 });