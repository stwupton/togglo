const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.subscribeToToggle = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError('unauthenticated', 'Cannot perform operation with unauthenticated user.');
  }

  if (!data.toggleId || !data.messagingToken) {
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
    await admin.messaging().subscribeToTopic(data.messagingToken, data.toggleId);
    console.log('Subscribed to: ', data.toggleId, 'with token: ', data.messagingToken);
  } catch (error) {
    throw new functions.https.HttpsError('internal', error);
  }
});

exports.onToggleUpdate = functions.firestore
  .document('toggles/{toggleId}')
  .onUpdate(async (change, context) => {
    const toggle = change.after.data();
    const activeOption = toggle.options.filter(option => option.active)[0];
    const title = 'Toggle Updated';
    const body = activeOption.name;
    const notification = { title, body };
    await admin.messaging().sendToTopic(context.params.toggleId, { notification });
    console.log('Sent notification to:', context.params.toggleId, ' with: ', { notification });
  });