import React from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogActions, DialogTitle, Slide, Button } from '@material-ui/core';
import { subscribeToToggle } from '../actions/toggle';

class SubscribePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: true,
      subscribing: false,
    };
  }

  onClose() {
    this.setState({ subscribing: true, open: false });
  }

  onSubscribeClicked() {
    this.setState({ subscribing: true, open: false });

    const toggleId = this.props.match.params.toggleId;
    const uid = this.props.user.uid;
    this.props.subscribeToToggle(toggleId, uid);
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
}), { subscribeToToggle })(SubscribePopup);