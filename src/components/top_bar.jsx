import { switchTheme } from '../actions/settings';
import { logout } from '../actions/user';
import { AppBar, Avatar, Toolbar, IconButton, Grid, Menu, MenuItem, ListItemIcon } from '@material-ui/core';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMenu: {
        open: false,
        anchor: null,
      }
    };
  }

  onAvatarClicked(e) {
    this.setState({
      userMenu: {
        open: true,
        anchor: e.currentTarget,
      }
    });
  }

  onUserMenuClosed() {
    this.setState({
      userMenu: {
        open: false,
        anchor: null,
      }
    });
  }

  render() {
    return (
      <AppBar>
        <Toolbar variant="regular">
          <Grid container alignItems="center" direction="row" wrap="nowrap">
            <Grid item xs={10}>
              <Typography variant="h5" style={{ color: '#000000' }}>Togglo</Typography>
            </Grid>
            <Grid 
              item 
              container 
              xs={2} 
              justify="flex-end" 
              alignItems="center" 
              direction="row" 
              wrap="nowrap"
              spacing={8}
            >
              <Grid item>
                <IconButton color="secondary" onClick={this.props.switchTheme}>
                  <BrightnessMediumIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Avatar src={this.props.user.photoUrl} onClick={this.onAvatarClicked.bind(this)} />
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
        <Menu 
          open={this.state.userMenu.open} 
          anchorEl={this.state.userMenu.anchor} 
          onClose={this.onUserMenuClosed.bind(this)}
        >
          <MenuItem onClick={this.props.logout}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
    );
  }
}

export default connect((state) => ({
  user: state.user
}), { switchTheme, logout })(TopBar);