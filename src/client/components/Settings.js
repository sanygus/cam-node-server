import React, { Component, PropTypes } from 'react';

import Subheader from 'material-ui/lib/Subheader';
import Toggle from 'material-ui/lib/toggle';
import Slider from 'material-ui/lib/slider';

export default class Settings extends Component { 
  constructor(props) {
    super(props);
    this.state = {qualityPhoto: this.props.settingsValues.qualityPhoto};
  }
  
  handleSlider(event, value) {
    this.state.qualityPhoto = value;
  }

  handleSliderDragStop() {
    this.props.settingsSave('qualityPhoto', this.state.qualityPhoto);
  }

  render() {
    const { settingsValues, settingsSave } = this.props;

    return (
      <div>
        <Subheader>Settings</Subheader>
        <Toggle
          disabled={settingsValues.blocked}
          toggled={settingsValues.enablePhoto}
          onToggle={settingsSave.bind(this, 'enablePhoto', !settingsValues.enablePhoto)}
          label='Enable photo'
          style={{width: '200px', margin: '30px'}}
        />
        <Slider
          min={0}
          max={100}
          step={1}
          defaultValue={this.state.qualityPhoto}
          onChange={this.handleSlider.bind(this)}
          onDragStop={this.handleSliderDragStop.bind(this)}
        />
        <Toggle
          disabled={settingsValues.blocked}
          toggled={settingsValues.enableVideo}
          onToggle={settingsSave.bind(this, 'enableVideo', !settingsValues.enableVideo)}
          label='Enable video'
          style={{width: '200px', margin: '30px'}}
        />
      </div>
    )
  }
}

Settings.PropTypes = {
  settingsValues: PropTypes.object.isRequired,
  settingsSave: PropTypes.func.isRequired,
}