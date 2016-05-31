import React, { Component, PropTypes } from 'react';

import Subheader from 'material-ui/lib/Subheader';
import Toggle from 'material-ui/lib/toggle';
import TextField from 'material-ui/lib/text-field';
import Slider from 'material-ui/lib/slider';
import Button from 'material-ui/lib/raised-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';
import VideoCamIcon from 'material-ui/lib/svg-icons/av/videocam';
import PhotoCamIcon from 'material-ui/lib/svg-icons/image/photo-camera';
import SleepIcon from 'material-ui/lib/svg-icons/maps/local-hotel';

export default class Settings extends Component { 
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.settingsValues);
    this.state.timeSleepH = 0;
    this.state.timeSleepM = 0;
    this.state.timeSleepS = 0;
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

  modeChanged(type) {
    let sleepTime = this.state.timeSleepH * 3600 + this.state.timeSleepM * 60 + this.state.timeSleepS;
    if(type == 'sleep') {
      if(sleepTime <= 0) {
        alert("Время сна должно быть > 0");
        return;
      } else {
        this.setState({ mode: type + ' ' + sleepTime.toString() });
        this.props.settingsSave('mode', type + ' ' + sleepTime.toString());
      }
    }
    else if ((type == 'photo')||(type == 'video'))
    {
      this.setState({ mode: type });
      this.props.settingsSave('mode', type);
    }
  }

  timeSleepChange(mn, event) {
    switch(mn){
      case 3600: this.setState({timeSleepH: parseInt(event.target.value)});break;
      case 60: this.setState({timeSleepM: parseInt(event.target.value)});break;
      case 1: this.setState({timeSleepS: parseInt(event.target.value)});break;
    }
  }

  render() {
    const { sensorsValues, settingsValues, settingsSave } = this.props;

    return (
      <div>
        <Subheader>Settings</Subheader>
        <Paper zDepth={2} style={{width: '800px', margin: '30px', padding: '20px'}}>
          <div>
            <Button label="Photo" primary={ settingsValues.mode == 'photo' } onMouseUp={this.modeChanged.bind(this, 'photo')} icon={<PhotoCamIcon />} style={{width: '30%', margin: '10px'}} />
            <span>Прогнозируемое время работы {Math.floor(sensorsValues.ostP / 3600)}ч {Math.floor((sensorsValues.ostP % 3600) / 60)}м {sensorsValues.ostP % 60}с</span>
          </div>
          <div>
            <Button label="Video" primary={ settingsValues.mode == 'video' } onMouseUp={this.modeChanged.bind(this, 'video')} icon={<VideoCamIcon />} style={{width: '30%', margin: '10px'}} />
            <span>Прогнозируемое время работы {Math.floor(sensorsValues.ostV / 3600)}ч {Math.floor((sensorsValues.ostV % 3600) / 60)}м {sensorsValues.ostV % 60}с</span>
          </div>
          <div>
            <Button label="Sleep" primary={ settingsValues.mode.indexOf('sleep') === 0 } onMouseUp={this.modeChanged.bind(this, 'sleep')} icon={<SleepIcon />} style={{width: '30%', margin: '10px'}} />
            <span>Прогнозируемое время работы {Math.floor(sensorsValues.ostS / 86400)}д {Math.floor((sensorsValues.ostS % 86400) / 3600)}ч {Math.floor((sensorsValues.ostS % 3600) / 60)}м {sensorsValues.ostS % 60}с</span>
            &emsp;&emsp;&emsp;&emsp;
            <TextField floatingLabelText="часов" onChange={this.timeSleepChange.bind(this, 3600)} style={{width: '30px'}} defaultValue="00" />:
            <TextField floatingLabelText="минут" onChange={this.timeSleepChange.bind(this, 60)}  style={{width: '30px'}} defaultValue="00" />:
            <TextField floatingLabelText="секунд" onChange={this.timeSleepChange.bind(this, 1)} style={{width: '30px'}} defaultValue="00" />
          </div>
        </Paper>
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