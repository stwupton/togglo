import { connect } from "react-redux";
import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

class ToggleListItem extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">{this.props.title}</Typography>
        </CardContent>
      </Card>
    )
  }
}

export default connect(state => ({}), { /*updateToggleStatus*/ })(ToggleListItem);