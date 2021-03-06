import LoginScreen from './login_screen';
import Dashboard from './dashboard';
import { createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import SnackbarManager from './snackbar_manager';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CSSBaseline from '@material-ui/core/CssBaseline';
import { Route } from 'react-router-dom';
import TopBar from './top_bar';

class App extends React.Component {
  get loginOrDashboard() {
    if (this.props.user.loggedIn) {
      return <Dashboard />;
    } else {
      return <LoginScreen />;
    }
  }

  get muiTheme() {
    return createMuiTheme({
      palette: {
        type: this.props.settings.themeType,
        primary: { 
          main: '#bdbdbd',
          light: '#efefef',
          dark: '#8d8d8d'
        },
        secondary: { 
          main: '#546e7a',
          light: '#819ca8',
          dark: '#29434e'
        }
      },
      typography: {
        useNextVariants: true
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={this.muiTheme}>
        <CSSBaseline />
        <div className="App">
          {this.loginOrDashboard}
          <SnackbarManager />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect((state) => ({
  settings: state.settings,
  user: state.user
}), {})(App);
