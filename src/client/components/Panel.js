import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';
import StatusPanel from './StatusPanel.js'
import FileList from './FileList.js';
import Sensors from './Sensors.js';
import Settings from './Settings';

export default class Panel extends Component {
  render () {
    const { values, updateData, saveSettngs } = this.props;

    return (
        <Paper zDepth={2} style={{width: '1000px'}}>
          <StatusPanel statusCam={values.statusCam} loading={values.loading} lastUpd={values.lastUpd} updateData={updateData} />
          <Divider />
          <Sensors sensorsValues={values.sensors} />
          <Divider />
          <Settings sensorsValues={values.sensors} settingsValues={values.settings} settingsSave={saveSettngs} />
          <Divider />
          <FileList files={values.fileList} />
          <Divider />
        </Paper>
    );
  }
}

Panel.PropTypes = {
  values: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
};
