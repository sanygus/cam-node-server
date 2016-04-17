import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

export default class Panel extends Component {
  render () {
    const { onClick, values } = this.props;

    return (
      <div>
        <Paper zDepth={2} style={{width: '500px'}}>
          <RaisedButton label='Update' onClick={onClick} style={{margin: '0 30px'}} />
          <TextField
            value={values.lastUpd}
            floatingLabelText="Update time"
            style={{margin: '0 30px'}}
          />
          <List>
            <Subheader>FileList ({values.fileList.length})</Subheader>
            {
              values.fileList.map( (value, key) => {
                return <ListItem key={key} primaryText={value.name} />;
              })
            }
          </List>
          <List>
            <Subheader>Sensors</Subheader>
            <ListItem primaryText={`cpu temperature ${values.sensors.cputemp}`} />
            <ListItem primaryText={`ping time ${values.sensors.pingtime}`} />
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
