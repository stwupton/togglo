import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/messaging';

class MessageService extends React.Component {
  async componentDidMount() {
    await firebase.messaging().requestPermission();
    const messageToken = await firebase.messaging().getToken();
  }

  render() {
    return null;
  }
}

export default connect(state => ({}), {})(MessageService);