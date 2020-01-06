import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { setMessagingToken, unsetMessagingToken } from '../../actions/user';

class MessageService extends React.Component {
  constructor() {
    super();
    this.unsubscribeToTokenRefresh = null;
  }

  async componentDidMount() {
    await firebase.messaging().requestPermission();
    this.updateToken();
    this.unsubscribeToTokenRefresh = 
      firebase.messaging().onTokenRefresh(this.updateToken.bind(this));
  }

  componentWillUnmount() {
    if (this.unsubscribeToTokenRefresh != null) {
      this.unsubscribeToTokenRefresh();
    }
  }

  render() {
    return null;
  }

  async updateToken() {
    const messagingToken = await firebase.messaging().getToken();

    const oldMessagingToken = this.props.user.messagingToken;
    if (oldMessagingToken && messagingToken != oldMessagingToken) {
      await this.props.unsetMessagingToken(oldMessagingToken);
    }

    this.props.setMessagingToken(messagingToken);
  }
}

export default connect(state => ({ 
  user: state.user 
}), { setMessagingToken, unsetMessagingToken })(MessageService);