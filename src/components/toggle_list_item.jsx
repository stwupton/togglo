import { connect } from "react-redux";
import React from 'react';
import { Card, CardContent, Typography, FormControl, Radio, FormControlLabel, RadioGroup, Grid, Divider, withTheme } from '@material-ui/core';
import { compose } from "redux";

class ToggleListItem extends React.Component {
  render() {
    const activeOption = this.props.toggle.options.find(option => option.active);

    return (
      <Card>
        <CardContent>
          <Grid container alignItems="center" justify="flex-start" direction="row">
            <Grid item xs={3}>
              <Typography variant="body1">{this.props.toggle.title}</Typography>
            </Grid>
            <Divider 
              orientation="vertical" 
              style={{ height: 80 }}
            />
            <Grid item xs={8}>
              <FormControl component="fieldset">
                <RadioGroup 
                  aria-label="position" 
                  name="position" 
                  value={activeOption.name} 
                  row
                >
                  {this.props.toggle.options.map((option, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={option.name}
                        control={<Radio color="secondary" />}
                        label={option.name}
                        labelPlacement="top"
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}

export default compose(
  withTheme,
  connect(state => ({}), { /*updateToggleStatus*/ }),
)(ToggleListItem);