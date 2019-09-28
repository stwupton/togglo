import React from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, TextField, Typography, withTheme } from '@material-ui/core';
import { compose } from 'recompose';
import { createToggle } from '../actions/toggle';

class CreateToggle extends React.Component {
  get canCreateToggle() {
    function stringIsValid(value) {
      return value != null && value.replace(/\s/g, '') != '';
    }

    if (!stringIsValid(this.state.title)) {
      return false;
    }

    const validOptions = this.state.options.filter(stringIsValid);
    if (validOptions.length < 2) {
      return false;
    }

    return true;
  }

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      options: [],
    }
  }

  onClose() {
    this.props.onClose();
    this.setState({ title: null, options: [] });
  }

  onCreateClicked() {
    if (this.canCreateToggle) {
      this.props.createToggle(this.state.title, this.state.options, this.props.user.uid);
      this.props.onClose();
      this.resetState();
    }
  }

  onKeyDown(event) {
    if (event.key == "Enter") {
      event.target.blur();
    }
  }

  onOptionInputFactory(index) {
    return (event) => {
      const value = event.target.value;
      this.setState((state) => {
        const options = [...state.options];
        options[index] = value;
        return { options };
      });
    };
  }

  onTitleInput(event) {
    this.setState({ title: event.target.value });
  }

  resetState() {
    this.setState(() => ({
      title: null,
      options: [],
    }));
  }

  render() {
    return (
      <Dialog 
        open={this.props.open} 
        onClose={this.onClose.bind(this)} 
        TransitionComponent={Slide} 
        TransitionProps={{ direction: 'up' }}
      >
        <DialogTitle>Create Toggle</DialogTitle>
        <DialogContent>
          <TextField 
            required 
            fullWidth 
            label="Title" 
            value={this.state.title || ''} 
            onChange={this.onTitleInput.bind(this)}
            onKeyDown={this.onKeyDown.bind(this)}
          />
          {[1, 2, 3, 4].map((value, index) => {
            const title = `Option ${value}`;
            return <TextField 
            fullWidth
            key={title}
            label={title}
            value={this.state.options[index] || ''} 
            onChange={this.onOptionInputFactory(index).bind(this)}
            onKeyDown={this.onKeyDown.bind(this)}
            style={{ marginTop: this.props.theme.spacing.unit }}
            />
          })}
          <Typography 
            variant="caption" 
            style={{ marginTop: this.props.theme.spacing.unit * 4 }}
          >* At least two options are required to create a toggle.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose.bind(this)} color="secondary">Cancel</Button>
          <Button 
            onClick={this.onCreateClicked.bind(this)} 
            color="secondary" 
            disabled={!this.canCreateToggle}
          >Create</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default compose(
  connect(state => ({ user: state.user }), { createToggle }),
  withTheme(),
)(CreateToggle);