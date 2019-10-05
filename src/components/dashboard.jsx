import React from 'react';
import { connect } from 'react-redux';
import UserInfoService from './services/user_info_service'
import TopBar from './top_bar';
import { Fab } from '@material-ui/core';
import Container from '@material-ui/core/Container'
import { withTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import compose from 'recompose/compose';
import CreateToggle from './create_toggle';
import ToggleList from './toggle_list';
import { refreshToggles } from '../actions/toggle';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createToggleDialogOpen: false,
    }
  }

  componentDidMount() {
    this.props.refreshToggles(this.props.user.uid);
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
        <Container maxWidth="lg" style={{ marginTop: 100 }}>
          <ToggleList 
            title="Owned Toggles" 
            toggles={this.props.user.toggles.owned} 
            optionsDisabled={false} 
          />
        </Container>
        <CreateToggle 
          open={this.state.createToggleDialogOpen} 
          onClose={this.closeCreateToggleDialog.bind(this)} 
        />
        <Fab onClick={this.openCreateToggleDialog.bind(this)} color="secondary" style={{
          position: 'absolute',
          bottom: this.props.theme.spacing(2),
          right: this.props.theme.spacing(2)
        }}><AddIcon /></Fab>
      </React.Fragment>
    );
  }
}

export default compose(
  connect(state => ({ user: state.user, }), { refreshToggles }),
  withTheme
)(Dashboard);