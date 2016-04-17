import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { update } from './actionCreators';

import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';
import RaisedButton from 'material-ui/lib/raised-button';
/*
const mapStateToProps = (state, ownProps) => {
  return {
    values:
  }
}

const MainPanel = connect(

)(Panel)

export default MainPanel
*/

export default class MainPanel extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());// ?
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render () {
    const { store } = this.context;
    const values = store.getState();

    return (
      <div>
        <Paper zDepth={2} style={{width: '500px'}}>
          <RaisedButton label='Update' onClick={
              () => store.dispatch(update())
            }
          />
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

MainPanel.contextTypes = {
  store: PropTypes.object.isRequired
};
