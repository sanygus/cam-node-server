import React, { Component, PropTypes } from 'react';

import Subheader from 'material-ui/lib/Subheader';
import Toggle from 'material-ui/lib/toggle';
import TextField from 'material-ui/lib/TextField';
import Slider from 'material-ui/lib/slider';

export default class Settings extends Component { 
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.settingsValues);
  }
  
  handleSlider(type, event, value) {
    this.setState({[type]: value});
  }

  settingsChanged(type, event, value) {
    if (value === undefined) {    // slider
      value = this.state[type];
    } else {                      // toggle
      this.state[type] = value;
      //this.setState({[type]: value});
    }
    this.props.settingsSave(type, value);
  }

  render() {
    const { settingsValues, settingsSave } = this.props;

    return (
      <div>
        <Subheader>Settings</Subheader>
        <Toggle
          disabled={settingsValues.blocked}
          defaultToggled={settingsValues.enablePhoto}
          onToggle={this.settingsChanged.bind(this, 'enablePhoto')}
          label='Enable photo'
          style={{width: '200px', margin: '30px'}}
        />
        <span style={{width: '200px', margin: '30px'}}>Photo quality ({this.state.qualityPhoto})</span>
        <Slider
          disabled={settingsValues.blocked}
          min={0}
          max={100}
          step={1}
          defaultValue={this.state.qualityPhoto}
          onChange={this.handleSlider.bind(this, 'qualityPhoto')}
          onDragStop={this.settingsChanged.bind(this, 'qualityPhoto')}
        />
        <Toggle
          disabled={settingsValues.blocked}
          toggled={settingsValues.enableVideo}
          onToggle={this.settingsChanged.bind(this, 'enableVideo')}
          label='Enable video'
          style={{width: '200px', margin: '30px'}}
        />
        <span style={{width: '200px', margin: '30px'}}>Video quality ({this.state.qualityVideo})</span>
        <Slider
          disabled={settingsValues.blocked}
          min={0}
          max={100}
          step={1}
          defaultValue={this.state.qualityVideo}
          onChange={this.handleSlider.bind(this, 'qualityVideo')}
          onDragStop={this.settingsChanged.bind(this, 'qualityVideo')}
        />
      </div>
    )
  }
}

Settings.PropTypes = {
  settingsValues: PropTypes.object.isRequired,
  settingsSave: PropTypes.func.isRequired,
}