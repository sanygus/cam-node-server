'use strict';

import React from 'react';
import 'isomorphic-fetch';
// UI
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';
import ContentArchiveIcon from 'material-ui/lib/svg-icons/content/archive';

export class UI extends React.Component {
  static propTypes: {
    filesList: React.PropTypes.array,
    sensors: React.PropTypes.object,
    date: React.PropTypes.any,
  }
  static defaultProps: {
    filesList: [],
    sensors: {},
    date: null,
  }
  constructor(props) {
    super();
    this.timer = setInterval(this.update, 1000);
  }
  render() {
    return (
      <div>
        Update time {this.state.data.date}
        <FileList list={this.state.data.filesList} />
        <Sensors sensors={this.state.data.sensors} />
      </div>
    );
  }

  /*componentWillUnmount: function() {
    clearInterval(this.timer);
  },*/
  update() {
    fetch('/data')
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            filesList: data.filesList,
            sensors: data.sensors,
            date: (new Date).toISOString(),
          });
        });
      }, (err) => { 
        console.log(err);
      }
    )
  }
}
/*
class FileList = React.createClass({
  render: function() {
    return (
      <div className='fileList'>
        <Paper zDepth={2} style={{width: '500px'}}>
          <List>
            <Subheader>Files ({this.props.list.length})</Subheader>
            {
              this.props.list.map( (file, index) => {
                return <ListItem
                  key={file.name}
                  primaryText={`${index+1}. ${file.name} (${file.size} Kb)`}
                  rightIcon={<ContentArchiveIcon />} 
                />;
              })
            }
          </List>
        </Paper>
      </div>
    );
  },
});

const Sensors = React.createClass({
  render: function() {
    return (
      <div className='sensors'>
        <Paper zDepth={2} style={{width: '500px'}}>
          <List>
            <Subheader>Sensors values (last)</Subheader>
            <ListItem primaryText={`date: ${this.props.sensors.date}`} />
            <ListItem primaryText={`cputemp: ${this.props.sensors.cputemp}`} />
            <ListItem primaryText={`pingtime: ${this.props.sensors.pingtime}`} />
          </List>
        </Paper>
      </div>
    );
  },
});
*/