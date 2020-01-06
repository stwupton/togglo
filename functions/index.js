const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.onToggleUpdate = functions.firestore
  .document('toggles/{toggleId}')
  .onUpdate(async (change, context) => {
    const toggle = change.after.data();
    const activeOption = toggle.options.filter(option => option.active)[0];
    const title = 'Toggle Updated';
    const body = `${toggle.title}: ${activeOption.name}`;
    const notification = { title, body };

    const sendToSubscribers = toggle.subscribers.map(subscriber => 
      admin.messaging().sendToTopic(subscriber, { notification }));

    await Promise.all(sendToSubscribers);
  });

exports.setUserMessagingToken = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError('unauthenticated', 'Cannot perform operation with unauthenticated user.');
  }

  if (!data.token) {
    throw new functions.https.HttpsError('aborted', 'Data properties are not valid.');
  }

  try {
    await admin.messaging().subscribeToTopic(data.token, context.auth.uid);
  } catch (error) {
    throw new functions.https.HttpsError('internal', error);
  }
});

exports.subscribeToToggle = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError('unauthenticated', 'Cannot perform operation with unauthenticated user.');
  }

  if (!data.toggleId) {
    throw new functions.https.HttpsError('aborted', 'Data properties are not valid.');
  }

  const doc = admin.firestore().collection('toggles').doc(data.toggleId);
  const snapshot = await doc.get();
  if (!snapshot.exists) {
    throw new functions.https.HttpsError('not-found', 'Toggle does not exist in the database.');
  }

  try {
    await doc.update({ 
      subscribers: admin.firestore.FieldValue.arrayUnion(context.auth.uid) 
    });
  } catch (error) {
    throw new functions.https.HttpsError('internal', error);
  }
});

exports.unsetUserMessagingToken = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError('unauthenticated', 'Cannot perform operation with unauthenticated user.');
  }

  if (!data.token) {
    throw new functions.https.HttpsError('aborted', 'Data properties are not valid.');
  }

  try {
    await admin.messaging().unsubscribeFromTopic(data.token, context.auth.uid);
  } catch (error) {
    throw new functions.https.HttpsError('internal', error);
  }
});