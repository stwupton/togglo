import React from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogActions, DialogTitle, Slide, Button } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/functions';
import { openSnackbar } from '../actions/snackbar';
import { refreshToggles } from '../actions/toggle';
import { SnackbarMessageType } from '../names';

class SubscribePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: true,
      subscribing: false,
    };
  }

  onClose() {
    if (!this.state.subscribing) {
      this.setState({ open: false });
    }
  }

  onSubscribeClicked() {
    this.setState({ subscribing: true });

    const toggleId = this.props.match.params.toggleId;
    const messagingToken = this.props.user.messagingToken;
    const subscribe = firebase.functions().httpsCallable('subscribeToToggle');
    subscribe({ toggleId, messagingToken }).then(() => {
      this.props.openSnackbar(SnackbarMessageType.REGULAR, 'Subscribed to toggle!');
      this.props.refreshToggles(this.props.user.uid);
      this.setState({ open: false, subscribing: false });
    }).catch(() => {
      this.props.openSnackbar(SnackbarMessageType.ERROR, 'Could not subscribe to toggle.');
      this.setState({ subscribing: false });
    });
  }

  render() {
    return (
      <Dialog
        open={this.state.open}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' }}
        onClose={this.onClose.bind(this)}
        onExited={this.props.onExited}
      >
        <DialogTitle>Subscribe to this toggle?</DialogTitle>
        <DialogActions>
          <Button 
            disabled={this.state.subscribing}
            onClick={this.onClose.bind(this)} 
            color="secondary"
          >Cancel</Button>
          <Button
            disabled={this.state.subscribing}
            onClick={this.onSubscribeClicked.bind(this)}
            color="secondary"
          >Subscribe</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(state => ({ 
  user: state.user 
}), { openSnackbar, refreshToggles })(SubscribePopup);