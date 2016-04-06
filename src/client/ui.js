'use strict';

import React from 'react';
import 'isomorphic-fetch';
// UI
/*import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';
import ContentArchiveIcon from 'material-ui/lib/svg-icons/content/archive';
*/
export class UI extends React.Component {
  static propTypes: {
    filesList: React.PropTypes.array,
    sensors: React.PropTypes.object,
    date: React.PropTypes.any, //?
  };
  static defaultProps = {
    initFilesList: [],
    initSensors: {},
    initDate: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      filesList: props.initFilesList,
      sensors: props.initSensors,
      date: props.initDate,
    };
    this.timer = setInterval(this.update, 1000);
  }
  render() {
    return (
      <div>
        Update time {this.state.date}

      </div>
    );
  }
        //<FileList list={this.state.filesList} />
        //<Sensors sensors={this.state.sensors} />
  /*componentWillUnmount: function() {
    clearInterval(this.timer);
  },*/
  update() {
    fetch('/data')
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          console.log(this);
          this.parent().setState({ //this-? state - Redux?
            filesList: data.filesList,
            sensors: data.sensors,
            date: (new Date).toISOString(),
          });
        });
      }, (err) => { 
        console.log(err);
      });
  }
}

class FileList extends React.Component {
  static propTypes: {
    list: React.PropTypes.array
  };
  /*static defaultProps = {
    initList: [],
  };*/
  /*constructor(props) {
    super(props);
    this.state = {
      list: props.list,
    };
  }*/
  render() {
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
  }
}
/*
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