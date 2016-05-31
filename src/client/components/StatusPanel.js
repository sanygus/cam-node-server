import React, { Component, PropTypes } from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import Paper from 'material-ui/lib/paper';

export default class StatusPanel extends Component {

  componentDidMount() {
    const { updateData } = this.props;
    setInterval(updateData, 1000);
  }

  render () {
    const { statusCam, loading, lastUpd, online, lastChange } = this.props;

    return (
      <div style={{height: '230px'}}>
        <RefreshIndicator top={35} left={20} status={ loading ? 'loading' : 'hide' } />
        <TextField
          value={lastUpd}
          floatingLabelText="Update time"
          style={{margin: '20px', marginTop: '60px', width: '200px'}}
        />
        <Paper zDepth={2} style={{width: '260px', margin: '30px', padding: '10px', position: 'absolute', top: '-20px', left: '670px'}}>
          <p>Camera status: </p>
          <Toggle toggled={statusCam.online} style={{color: 'red'}} />
          <p>{statusCam.online ? 'Camera connected' : 'Camera NOT connected'}</p>
          <p>lastChange: {statusCam.onlineDate}</p>
        </Paper>
      </div>
    )
  }
}

StatusPanel.PropTypes = {
  lastUpd: PropTypes.string.isRequired,
  onClickUpdateData: PropTypes.func.isRequired,
}
