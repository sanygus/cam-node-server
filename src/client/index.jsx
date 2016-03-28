'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
// UI
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';
import ContentArchiveIcon from 'material-ui/lib/svg-icons/content/archive';

const Data = React.createClass({
  getInitialState: function() {
    return {
      data: {
        filesList: [],
        sensors: {},
        date: null,
      }
    };
  },
  componentDidMount: function() {
    this.timer = setInterval(this.update, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.timer);
  },
  update: function() {
    request.get('/data').end((err, res) => {
      console.log(res);
      this.setState({
        data: {
          filesList: res.body.filesList,
          sensors: res.body.sensors,
          date: (new Date).toISOString(),
        }
      });
    });
  },
  render: function() {
    return (
      <div>
        Update time {this.state.data.date}
        <FileList list={this.state.data.filesList} />
        <Sensors sensors={this.state.data.sensors} />
      </div>
    );
  },
});

const FileList = React.createClass({
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

ReactDOM.render(
  <Data />,
  document.getElementById('main')
);
