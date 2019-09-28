import React from 'react';
import { connect } from 'react-redux';
import UserInfoService from './services/user_info_service'
import TopBar from './top_bar';
import { Fab, Typography, Grid } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import compose from 'recompose/compose';
import CreateToggle from './create_toggle';
import ToggleListItem from './toggle_list_item';
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
        <Grid container alignItems="center" direction="column" wrap="nowrap" style={{ marginTop: 120 }}>
          <Grid item container spacing={8} xs={8} alignItems="flex-start" direction="column" wrap="nowrap">
            <Grid item>
              <Typography variant="h6">Owned Toggles</Typography>
            </Grid>
            <Grid 
              item 
              container 
              xs={12} 
              spacing={8} 
              alignItems="center" 
              direction="column" 
              wrap="nowrap"
            >
              {this.props.user.toggles.owned.map((toggle) => {
                return (
                  <Grid item xs={12} key={toggle.id}>
                    <ToggleListItem title={toggle.title} options={toggle.options} />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
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
  connect(state => ({ user: state.user, }), { refreshToggles }),
  withTheme()
)(Dashboard);