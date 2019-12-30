import React from 'react';
import { connect } from 'react-redux';
import UserInfoService from './services/user_info_service'
import TopBar from './top_bar';
import { Fab, Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container'
import { withTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import compose from 'recompose/compose';
import CreateToggle from './create_toggle';
import ToggleList from './toggle_list';
import { refreshToggles } from '../actions/toggle';
import { Route, withRouter } from 'react-router-dom';
import SubscribePopup from './subscribe_popup';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createToggleDialogOpen: false,
    };
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
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <ToggleList 
                title="Owned Toggles" 
                toggles={this.props.user.toggles.owned} 
                optionsDisabled={false} 
              />
            </Grid>
            <Grid item>
              <ToggleList 
                title="Subscribed Toggles" 
                toggles={this.props.user.toggles.subscribed} 
                optionsDisabled={true} 
              />
            </Grid>
          </Grid>
        </Container>
        <Route path="/:toggleId" render={(routeProps) => {
          return (
            <SubscribePopup {...routeProps} onExited={() => this.props.history.push("/")} />
          );
        }} />
        <CreateToggle 
          open={this.state.createToggleDialogOpen} 
          onClose={this.closeCreateToggleDialog.bind(this)} 
        />
        <Fab onClick={this.openCreateToggleDialog.bind(this)} color="secondary" style={{
          position: 'fixed',
          bottom: this.props.theme.spacing(2),
          right: this.props.theme.spacing(2)
        }}><AddIcon /></Fab>
      </React.Fragment>
    );
  }
}

export default compose(
  connect(state => ({ user: state.user, }), { refreshToggles }),
  withTheme,
  withRouter
)(Dashboard);