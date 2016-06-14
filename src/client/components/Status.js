import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import Paper from 'material-ui/lib/paper';

class Status extends Component {
  render() {
    const { status, actions } = this.props;

    return (
      <div>
        <RefreshIndicator top={35} left={20} status={ status.loading ? 'loading' : 'hide' } />
        <Paper zDepth={2} style={{width: 260, height: 170, margin: 30, padding: 10}}>
          <p>Camera status: </p>
          <Toggle toggled={status.statusCam.online} style={{color: 'red'}} />
          <p>{status.statusCam.online ? 'Camera connected' : 'Camera NOT connected'} {status.statusCam.onlineDate ? `since ${status.statusCam.onlineDate}` : ''}</p>
        </Paper>
      </div>
    )
  }
}

export default connect(
  state => ({ status: state.status })
)(Status)
