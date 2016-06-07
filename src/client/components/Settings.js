import React, { Component, PropTypes } from 'react';

import Subheader from 'material-ui/lib/Subheader';
import Toggle from 'material-ui/lib/toggle';
import TextField from 'material-ui/lib/text-field';
import Slider from 'material-ui/lib/slider';
import Button from 'material-ui/lib/raised-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import VideoCamIcon from 'material-ui/lib/svg-icons/av/videocam';
import PhotoCamIcon from 'material-ui/lib/svg-icons/image/photo-camera';
import SleepIcon from 'material-ui/lib/svg-icons/maps/local-hotel';
import SelectIcon from 'material-ui/lib/svg-icons/action/touch-app';
import injectTapEventPlugin from 'react-tap-event-plugin/src/injectTapEventPlugin';
injectTapEventPlugin();

export default class Settings extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      mode: []
    }
  }
  
  handleSlider(type, event, value) {
    //this.setState({[type]: value});
  }

  settingsChanged(type, event, value) {
    /*if (value === undefined) {    // slider
      value = this.state[type];
    } else {                      // toggle
      this.state[type] = value;
      //this.setState({[type]: value});
    }
    this.props.settingsSave(type, value);*/
  }

  modeChanged(i, event, index, value) {
    let newMode = this.state.mode.slice();
    newMode[i].type = value;
    this.setState({ mode: newMode });
  }

  handleTextField(i, event) {
    let newMode = this.state.mode.slice();
    if (event.target.value === '') {event.target.value = '0'}
    newMode[i].duration = parseInt(event.target.value);
    this.setState({ mode: newMode });
  }

  addOneMode(event) {
    let newMode = this.state.mode.slice();
    newMode.push({type: 'unchanged', duration: 10});
    this.setState({ mode: newMode });
  }

  copyMode(event) {
    this.setState({ mode: this.props.settingsValues.mode.slice() });
  }

  sendMode() {
    this.props.settingsSave('mode', this.state.mode);
    this.setState({ mode: [] });
  }

  timeSleepChange(mn, event) {
    /*switch(mn){
      case 3600: this.setState({timeSleepH: parseInt(event.target.value)});break;
      case 60: this.setState({timeSleepM: parseInt(event.target.value)});break;
      case 1: this.setState({timeSleepS: parseInt(event.target.value)});break;
    }*/
  }

  render() {
    const { sensorsValues, settingsValues, settingsSave } = this.props;

    return (
      <div>
        <Subheader>Settings</Subheader>
        <Paper zDepth={2} style={{width: '900px', margin: '30px', padding: '20px'}}>
          <div>
            <Button label="Photo" primary={ settingsValues.mode == 'photo' } onMouseUp={this.modeChanged.bind(this, 'photo')} icon={<PhotoCamIcon />} style={{width: '30%', margin: '10px'}} />
            <span>Прогнозируемое время работы {Math.floor(sensorsValues.ostP / 3600)}ч {Math.floor((sensorsValues.ostP % 3600) / 60)}м {(sensorsValues.ostP % 60).toFixed(1)}с</span>
          </div>
          <div>
            <Button label="Video" primary={ settingsValues.mode == 'video' } onMouseUp={this.modeChanged.bind(this, 'video')} icon={<VideoCamIcon />} style={{width: '30%', margin: '10px'}} />
            <span>Прогнозируемое время работы {Math.floor(sensorsValues.ostV / 3600)}ч {Math.floor((sensorsValues.ostV % 3600) / 60)}м {(sensorsValues.ostV % 60).toFixed(1)}с</span>
          </div>
          <div>
            <Button label="Sleep" primary={ settingsValues.mode.indexOf('sleep') === 0 } onMouseUp={this.modeChanged.bind(this, 'sleep')} icon={<SleepIcon />} style={{width: '30%', margin: '10px'}} />
            <span>Прогнозируемое время работы {Math.floor(sensorsValues.ostS / 86400)}д {Math.floor((sensorsValues.ostS % 86400) / 3600)}ч {Math.floor((sensorsValues.ostS % 3600) / 60)}м {(sensorsValues.ostS % 60).toFixed(1)}с</span>
            &emsp;&emsp;
            <TextField floatingLabelText="часов" onChange={this.timeSleepChange.bind(this, 3600)} style={{width: '30px'}} defaultValue="00" />:
            <TextField floatingLabelText="минут" onChange={this.timeSleepChange.bind(this, 60)}  style={{width: '30px'}} defaultValue="00" />:
            <TextField floatingLabelText="секунд" onChange={this.timeSleepChange.bind(this, 1)} style={{width: '30px'}} defaultValue="00" />
          </div>
          <div>
            <div style={{display: 'inline-block', margin: '50px', verticalAlign: 'top'}}>
              <List style={{width: '300px'}}>
              <Subheader>Current</Subheader>
              {
                settingsValues.mode.map((modeItem, key) => {
                  let text = '';
                  let icon = '';
                  switch (modeItem.type) {
                    case 'photo': text = 'PHOTO'; icon = <PhotoCamIcon />;break;
                    case 'video': text = 'VIDEO'; icon = <VideoCamIcon />;break;
                    case 'sleep': text = 'SLEEP'; icon = <SleepIcon />;break;
                    default: text='?'; icon = <SelectIcon />;break;
                  };
                  return (
                    <div key={key} >
                      <ListItem primaryText={`${text} (${Math.floor(modeItem.duration / 3600)}h ${Math.floor((modeItem.duration % 3600) / 60)}m ${(modeItem.duration % 60).toFixed(0)}s)`} leftIcon={icon} />
                      <Divider />
                    </div>
                  )
                }) 
              }
              </List>
            </div>
            <div style={{display: 'inline-block', margin: '50px', verticalAlign: 'top'}}>
              <List style={{width: '350px'}}>
              <Subheader>New</Subheader>
              {
                this.state.mode.map((modeItem, i) => {
                  return (
                    <div key={i}>
                      <SelectField value={modeItem.type} onChange={this.modeChanged.bind(this, i)} style={{width: 150, display: 'inline-block'}}>
                        <MenuItem disabled={true} value='unchanged' primaryText='-change-' leftIcon={<SelectIcon />} />
                        <MenuItem value='photo' primaryText='PHOTO' leftIcon={<PhotoCamIcon />} />
                        <MenuItem value='video' primaryText='VIDEO' leftIcon={<VideoCamIcon />} />
                        <MenuItem value='sleep' primaryText='SLEEP' leftIcon={<SleepIcon />} />
                      </SelectField>
                      <TextField value={modeItem.duration} onChange={this.handleTextField.bind(this, i)} style={{width: 30}} id={`tf${i}`} />sec
                    </div>
                  )
                }) 
              }
              <Button label='Add' onMouseUp={this.addOneMode.bind(this)} style={{margin: 10}} />
              <Button label='Copy' onMouseUp={this.copyMode.bind(this)} style={{margin: 10}} />
              <Button label='Send' onMouseUp={this.sendMode.bind(this)} style={{margin: 10}} />
              </List>
            </div>
          </div>
          <div style={{margin: '35px'}}>
            <span>Прогнозируемое время работы при <b>текущей</b> нагрузке {Math.floor(sensorsValues.ostC / 86400)}д {Math.floor((sensorsValues.ostC % 86400) / 3600)}ч {Math.floor((sensorsValues.ostC % 3600) / 60)}м {(sensorsValues.ostC % 60).toFixed(1)}с</span>
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