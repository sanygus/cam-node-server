import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import Toggle from 'material-ui/lib/toggle';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';

class Status extends Component {
  render() {
    const { status, actions } = this.props;

    return (
      <div>
        <RefreshIndicator top={35} left={20} status={ status.loading ? 'loading' : 'hide' } />
        <Paper zDepth={2} style={{width: 260,  margin: '15px 30px', padding: 20}}>
          <Toggle toggled={status.statusCam.online} elementStyle={{color: 'red'}} label='Computer status:' />
          <p>{status.statusCam.online ? 'Computer connected' : 'Computer NOT connected'} {status.statusCam.onlineDate ? `since ${status.statusCam.onlineDate}` : ''}</p>
          <Divider style={{marginBottom: 16}}/>
          <Toggle toggled={status.statusCam.RTVstatus} label='RTV status' />
        </Paper>
      </div>
    )
  }
}

export default connect(
  state => ({ status: state.status })
)(Status)
