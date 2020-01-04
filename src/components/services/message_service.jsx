import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { setMessagingToken } from '../../actions/user';

class MessageService extends React.Component {
  constructor() {
    super();
    this.unsubscribe = null;
  }

  async componentDidMount() {
    await firebase.messaging().requestPermission();
    const messagingToken = await firebase.messaging().getToken();
    this.props.setMessagingToken(messagingToken);

    this.unsubscribe = firebase.messaging().onTokenRefresh(async () => {
      const messagingToken = await firebase.messaging().getToken();
      this.props.setMessagingToken(messagingToken);
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe != null) {
      this.unsubscribe();
    }
  }

  render() {
    return null;
  }
}

export default connect(state => ({}), { setMessagingToken })(MessageService);