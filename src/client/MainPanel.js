import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';
import RaisedButton from 'material-ui/lib/raised-button';

export default class MainPanel extends Component {
  render () {
    const { values, onUpdate } = this.props;

    return (
      <div>
        <Paper zDepth={2} style={{width: '500px'}}>
          <RaisedButton label='Update' onClick={onUpdate} />
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

MainPanel.propTypes = {
  values: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
