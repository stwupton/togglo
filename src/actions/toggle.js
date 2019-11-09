import firebase from 'firebase/app';
import 'firebase/firestore';

export const ToggleActionType = {
  CREATED: 'created',
  REFRESH: 'refresh',
  UPDATE_OPTIONS: 'update_options'
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

async function fetchOwnedToggles(owner) {
  return firebase.firestore()
    .collection('toggles')
    .where('owner', '==', owner)
    .get();
}

async function fetchSubscribedToggles(owner) {
  return firebase.firestore()
    .collection('toggles')
    .where('subscribers', 'array-contains', owner)
    .get();
}

export async function refreshToggles(owner) {
  let snapshots = [];
  try {
    snapshots = await Promise.all([
      fetchOwnedToggles(owner), 
      fetchSubscribedToggles(owner)
    ]);
  } catch (error) {
    return {
      type: ToggleActionType.REFRESH,
      error: true,
      payload: error
    };
  }

  const owned = snapshots[0].docs.map((document) => ({
    id: document.id,
    ...document.data()
  }));

  const subscribed = snapshots[1].docs.map((document) => ({
    id: document.id,
    ...document.data()
  }));

  return {
    type: ToggleActionType.REFRESH,
    payload: { owned, subscribed }
  };
}

export async function updateToggleOptions(newOptions, toggleId) {
  try {
    await firebase.firestore()
      .collection('toggles')
      .doc(toggleId)
      .update({ options: newOptions });
  } catch (error) {
    return {
      type: ToggleActionType.UPDATE_OPTIONS,
      error: true,
      payload: error
    };
  }

  return {
    type: ToggleActionType.UPDATE_OPTIONS,
    payload: {
      id: toggleId,
      options: newOptions
    }
  };
}