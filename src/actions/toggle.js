import firebase from 'firebase/app';
import 'firebase/firestore';

export const ToggleActionType = {
  CREATED: 'created',
};

export async function createToggle(title, options, owner) {
  // Set the active flag to true for the first element in the options by default.
  options = options.map((value, index) => ({
    name: value,
    active: index == 0,
  }));

  const toggle = { title, owner, subscribers: [], options };

  let ref;
  try {
    ref = await firebase.firestore()
      .collection('toggles')
      .add(toggle);
  } catch (error) {
    console.log(error);
    return {
      type: ToggleActionType.CREATED,
      error: true,
      payload: error
    };
  }

  return {
    type: ToggleActionType.CREATED,
    payload: toggle
  };
}