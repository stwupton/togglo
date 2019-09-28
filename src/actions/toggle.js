import firebase from 'firebase/app';
import 'firebase/firestore';

export const ToggleActionType = {
  CREATED: 'created',
  REFRESH: 'refresh',
};

export async function createToggle(title, options, owner) {
  // Set the active flag to true for the first element in the options by default.
  options = options.map((value, index) => ({
    name: value,
    active: index == 0,
  }));

  const toggle = { title, owner, subscribers: [], options };

  let reference;
  try {
    reference = await firebase.firestore()
      .collection('toggles')
      .add(toggle);
  } catch (error) {
    return {
      type: ToggleActionType.CREATED,
      error: true,
      payload: error
    };
  }

  return {
    type: ToggleActionType.CREATED,
    payload: { id: reference.id, ...toggle }
  };
}

export async function refreshToggles(owner) {
  let snapshot;
  try {
    snapshot = await firebase.firestore()
      .collection('toggles')
      .where('owner', '==', owner)
      .get();
  } catch (error) {
    return {
      type: ToggleActionType.REFRESH,
      error: true,
      payload: error
    };
  }

  const toggles = snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data()
  }));

  return {
    type: ToggleActionType.REFRESH,
    payload: toggles
  };
}