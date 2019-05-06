import { switchTheme } from '../actions/settings';
import { AppBar, Toolbar, IconButton, Grid } from '@material-ui/core';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { ThemeType } from '../names';

class TopBar extends React.Component {
  render() {
    return (
      <AppBar>
        <Toolbar variant="regular">
          <Grid container alignItems="center" justify="space-between">
            <Typography variant="h5">Togglo</Typography>
            <IconButton color="secondary" onClick={this.props.switchTheme}>
              <BrightnessMediumIcon />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default connect((state) => ({
  settings: state.settings
}), { switchTheme })(TopBar);