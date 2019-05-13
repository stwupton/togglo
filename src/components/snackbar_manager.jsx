import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from 'react';
import { connect } from 'react-redux';
import { closeSnackbar, clearSnackbar } from '../actions/snackbar';
import { SnackbarMessageType } from '../names';

const SnackbarIcons = {
  [SnackbarMessageType.ERROR]: ErrorIcon,
  [SnackbarMessageType.WARNING]: WarningIcon,
  [SnackbarMessageType.INFO]: InfoIcon,
  [SnackbarMessageType.SUCCESS]: CheckCircleIcon,
};

class SnackbarManager extends React.Component {
  constructor(props) {
    super(props);
  }

  onClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.props.closeSnackbar();
  }

  onExited(event) {
    this.props.clearSnackbar();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.snackbars.map(snackbar => {
          let icon;
          if (snackbar.type !== SnackbarMessageType.REGULAR) {
            const MessageIcon = SnackbarIcons[snackbar.type];
            icon = <MessageIcon style={{ marginRight: 8 }} />;
          }

          return <Snackbar
            key={snackbar.key}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={snackbar.open}
            autoHideDuration={snackbar.autoHideDuration}
            onClose={this.onClose.bind(this)}
            onExited={this.onExited.bind(this)}
            message={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {icon}
                {snackbar.message}
              </span>
            }
            action={
              <IconButton onClick={this.onClose.bind(this)} color="inherit">
                <CloseIcon />
              </IconButton>
            }
          />
        })}
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  snackbars: state.snackbars
}), { closeSnackbar, clearSnackbar })(SnackbarManager);