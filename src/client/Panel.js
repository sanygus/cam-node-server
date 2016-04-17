import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';
import RaisedButton from 'material-ui/lib/raised-button';

export default class Panel extends Component {
  render () {
    const { onClick, values } = this.props;

    return (
      <div>
        <Paper zDepth={2} style={{width: '500px'}}>
          <RaisedButton label='Update' onClick={onClick} />
          <List>
            <Subheader>FileList ({values.fileList.length})</Subheader>
            {
              values.fileList.map( (value, key) => {
                return <ListItem key={key} primaryText={value} />;
              })
            }
          </List>
          <List>
            <Subheader>Sensors</Subheader>
            <ListItem primaryText={`cpu temperature ${values.sensors.cpuTemp}`} />
            <ListItem primaryText={`ping time ${values.sensors.pingTime}`} />
          </List>
        </Paper>
      </div>
    );
  }
}

Panel.PropTypes = {
  onClick: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};
