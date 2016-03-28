'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

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
          date: Date.now(),
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
        Files ({this.props.list.length})
        <ul>{
          this.props.list.map( (file, index) => {
            return <li key={file.name}>{index+1}. <a href={'/files/'+file.name}>{file.name}</a> ({file.size} Kb)</li>;
          })
        }</ul>
      </div>
    );
  },
});

const Sensors = React.createClass({
  render: function() {
    return (
      <div className='sensors'>
        Sensors values
        <li>date: {this.props.sensors.date}</li>
        <li>cputemp: {this.props.sensors.cputemp}</li>
        <li>pingtime: {this.props.sensors.pingtime}</li>
      </div>
    );
  },
});

ReactDOM.render(
  <Data />,
  document.getElementById('main')
);

/*ReactDOM.render(
  <AppBar
            title="Super Secret Password"
          />,
  document.getElementById('main')
);*/
/*
setTimeout(() => {
  request.get('/data').end((err, res) => {
    alert(err);
    console.log(res);
    ReactDOM.render(
      React.createElement('h1', null, 'HI1'),
      document.getElementById('main')
    );
  });
}, 2000);*/
