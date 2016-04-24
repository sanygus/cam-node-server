import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';
import StatusPanel from './StatusPanel.js'
import FileList from './FileList.js';
import Sensors from './Sensors.js'

export default class Panel extends Component {
  render () {
    const { values, updateData } = this.props;

    return (
      <Paper zDepth={2} style={{width: '500px'}}>
        <StatusPanel lastUpd={values.lastUpd} onClickUpdateData={updateData} />
        <Divider />
        <FileList files={values.fileList} />
        <Divider />
        <Sensors sensorsValues={values.sensors} />
      </Paper>
    );
  }
}

Panel.PropTypes = {
  values: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
};
