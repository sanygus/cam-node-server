import React, { Component } from 'react';
import { connect } from 'react-redux';

import { update as updateAction } from './actions/update';
import Status from './components/Status';
import Sensors from './components/Sensors';
import Settings from './components/Settings';
import FileList from './components/FileList';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(updateAction());
  }
  render() {
    return (
      <Paper zDepth={2} style={{width: 960, margin: '0 auto'}}>
        <Status />
        <Divider />
        <Sensors />
        <Divider />
        <Settings />
        <Divider />
        <FileList />
      </Paper>
    )
  }
}

export default connect()(App)
