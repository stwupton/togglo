import firebase from 'firebase/app';
import 'firebase/messaging';  

const firebaseConfig = {
  apiKey: "AIzaSyCPvOMEVTZWOLqHBYow2vxQTQspeSW0Hek",
  authDomain: "togglo.firebaseapp.com",
  databaseURL: "https://togglo.firebaseio.com",
  projectId: "togglo",
  storageBucket: "togglo.appspot.com",
  messagingSenderId: "143868880864",
  appId: "1:143868880864:web:786ef97667b88a33"
};

firebase.initializeApp(firebaseConfig);
firebase.messaging();