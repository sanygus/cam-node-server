import React, { Component, PropTypes } from 'react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';

export default class Sensors extends Component {
  render () {
    const { sensorsValues } = this.props;

    return (
      <List>
        <Subheader>Sensors</Subheader>
        <ListItem primaryText={`cpu temperature: ${sensorsValues.cputemp}`} />
        <ListItem primaryText={`ping time: ${sensorsValues.pingtime} ms`} />
      </List>
    )
  }
}

Sensors.PropTypes = {
  sensorsValues: PropTypes.object.isRequired,
}
