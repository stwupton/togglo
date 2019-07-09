import { signIn } from '../actions/user';
import { Grid, Typography, Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';  
import { AuthService } from '../names';

class LoginScreen extends React.Component {
  render() { 
    return (
      <div style={{ overflow: 'hidden', padding: 20 }}>
        <Typography style={{ margin: 50 }} align="center" variant="h1">Togglo</Typography>
        <Grid container alignItems="center" direction="column" spacing={16}>
          <Grid item>
            <Button 
              style={{ backgroundColor: '#4285F4', color: 'white' }} 
              variant="contained" 
              disabled={this.props.user.loggingIn}
              onClick={() => this.props.signIn(AuthService.GOOGLE)}
            >
              <div>
                <FontAwesomeIcon style={{ margin: '0 10px 0 0' }} icon={faGoogle} /> 
                sign in with google
              </div>
            </Button>
          </Grid>
          <Grid item>
            <Button 
              style={{ backgroundColor: '#4267B2', color: 'white' }} 
              variant="contained"
              disabled={this.props.user.loggingIn}
              onClick={() => this.props.signIn(AuthService.FACEBOOK)}
            >
              <div>
                <FontAwesomeIcon style={{ margin: '0 10px 0 0' }} icon={faFacebook} /> 
                sign in with facebook
              </div>
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect((state) => ({
  user: state.user
}), { signIn })(LoginScreen);