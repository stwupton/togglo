import React from 'react';
import ToggleListItem from './toggle_list_item';
import { Typography, Grid } from '@material-ui/core';

class ToggleList extends React.Component {
  render() {
    return (
      <Grid 
        container 
        alignItems="center" 
        direction="column" 
        wrap="nowrap" 
        spacing={4} 
        style={{ overflow: 'hidden' }}
      >
        <Grid 
          container 
          item
          alignItems="flex-start" 
          direction="column" 
          wrap="nowrap" 
          spacing={1} 
          xs={12} md={10} lg={8}
        >
          <Grid item>
            <Typography variant="h6">{this.props.title}</Typography>
          </Grid>
          <Grid 
            item 
            container 
            spacing={8} 
            alignItems="stretch" 
            direction="column" 
            wrap="nowrap"
          >
            {this.props.toggles.map((toggle) => {
              return (
                <Grid item key={toggle.id}>
                  <ToggleListItem 
                    toggle={toggle}
                    optionsDisabled={this.props.optionsDisabled} 
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default ToggleList;