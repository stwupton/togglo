const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.subscribeToToggle = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError('unauthenticated', 'Cannot perform operation with unauthenticated user.');
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
    console.log(error);
    throw new functions.https.HttpsError('internal', error);
  }
});