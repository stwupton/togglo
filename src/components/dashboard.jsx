import React from 'react';
import { connect } from 'react-redux';
import UserInfoService from './services/user_info_service'
import TopBar from './top_bar';
import { Fab } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import compose from 'recompose/compose';
import CreateToggle from './create_toggle';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createToggleDialogOpen: false,
    }
  }

  closeCreateToggleDialog() {
    this.setState({ createToggleDialogOpen: false });
  }

  openCreateToggleDialog() {
    this.setState({ createToggleDialogOpen: true });
  }

  render() {
    return (
      <React.Fragment>
        <UserInfoService />
        <TopBar />
        <CreateToggle 
          open={this.state.createToggleDialogOpen} 
          onClose={this.closeCreateToggleDialog.bind(this)} 
        />
        <Fab onClick={this.openCreateToggleDialog.bind(this)} color="secondary" style={{
          position: 'absolute',
          bottom: this.props.theme.spacing.unit * 2,
          right: this.props.theme.spacing.unit * 2
        }}><AddIcon /></Fab>
      </React.Fragment>
    );
  }
}

export default compose(
  connect(state => ({ user: state.user, }), {}),
  withTheme()
)(Dashboard);