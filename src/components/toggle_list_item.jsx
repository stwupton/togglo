import { connect } from 'react-redux';
import React from 'react';
import { Card, CardContent, Typography, FormControl, Grid, Select, MenuItem, CardActions, Button, IconButton } from '@material-ui/core';
import { updateToggleOptions } from '../actions/toggle';
import ShareIcon from '@material-ui/icons/Share';
import clipboardCopy from 'clipboard-copy';
import { openSnackbar } from '../actions/snackbar';
import { SnackbarMessageType } from '../names';

class ToggleListItem extends React.Component {
  onOptionChanged(e) {
    const newOptions = this.props.toggle.options.map((option, index) => ({
      ...option,
      active: e.target.value == index
    }));

    this.props.updateToggleOptions(newOptions, this.props.toggle.id);
  }

  onShareButtonClicked() {
    clipboardCopy(`${window.location.origin}/${this.props.toggle.id}`).then(() => {
      this.props.openSnackbar(
        SnackbarMessageType.REGULAR, 
        'Link was copied to your cliploard!'
      );
    });
  }

  render() {
    const activeOption = this.props.toggle.options.find(option => option.active);

    return (
      <Card>
        <CardContent>
          <Grid container justify="space-between" alignItems="center" direction="row">
            <Grid item>
              <Typography variant="body1">{this.props.toggle.title}</Typography>
            </Grid>
            <Grid 
              container 
              item 
              justify="flex-end" 
              direction="row" 
              alignItems="center" 
              spacing={2} 
              xs={4} 
              wrap="nowrap"
            >
              <Grid item>
                <FormControl component="fieldset">
                  <Select
                    value={this.props.toggle.options.indexOf(activeOption)}
                    onChange={this.onOptionChanged.bind(this)}
                    disabled={this.props.optionsDisabled}
                  >
                    {this.props.toggle.options.map((option, index) => {
                      return (
                        <MenuItem key={index} value={index}>{option.name}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <IconButton onClick={this.onShareButtonClicked.bind(this)}>
                  <ShareIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}



export default connect(state => ({}), { 
  updateToggleOptions,
  openSnackbar
})(ToggleListItem);