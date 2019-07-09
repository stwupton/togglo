import React from 'react';
import { connect } from 'react-redux';
import { updateInfo, signOut } from '../../actions/user';
import firebase from 'firebase/app';
import 'firebase/auth';

class UserInfoService extends React.Component {
  constructor() {
    super();
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.signOut();
      } else {
        this.props.updateInfo(user);
      }
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

export default connect(() => ({}), { updateInfo, signOut })(UserInfoService);