import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveSettings as saveSettinsAction } from '../actions/saveSettings';

import Subheader from 'material-ui/lib/Subheader';
import Button from 'material-ui/lib/raised-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import PhotoCamIcon from 'material-ui/lib/svg-icons/image/photo-camera';
import VideoCamIcon from 'material-ui/lib/svg-icons/av/videocam';
import SleepIcon from 'material-ui/lib/svg-icons/maps/local-hotel';
import NothingIcon from 'material-ui/lib/svg-icons/content/block';
import SelectIcon from 'material-ui/lib/svg-icons/action/touch-app';
import ArrowUpIcon from 'material-ui/lib/svg-icons/navigation/expand-less';
import ArrowDownIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import DeleteIcon from 'material-ui/lib/svg-icons/navigation/close';
import TextField from 'material-ui/lib/text-field';
import injectTapEventPlugin from 'react-tap-event-plugin/src/injectTapEventPlugin';
injectTapEventPlugin();

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      mode: [],
      selectedMode: 'nothing'
    }
  }

  selectModeHandle(event, index, value) {
    this.setState({
      selectedMode: value
    })
  }

  addOneMode() {
    let temp = [];
    const duration = parseInt(this.refs.addHour.getValue() * 3600 + this.refs.addMin.getValue() * 60 + this.refs.addSec.getValue()); 
    if (duration > 0) {
      temp = this.state.mode.slice();
      temp.push({ type: this.state.selectedMode, duration })
      this.setState({
        mode: temp,
        selectedMode: 'nothing'
      });
      this.refs.addHour.input.value = '';
      this.refs.addMin.input.value = '';
      this.refs.addSec.input.value = '';
    } else {
      alert('Duration must be > 0');
    }
  }

  moveMode(index, index2) {
    let tempMode;
    let tempElem;
    tempMode = this.state.mode.slice();
    if (index2 < 0) { index2 += tempMode.length}
    if (index2 > (tempMode.length - 1)) { index2 -= tempMode.length}
    tempElem = tempMode[index2];
    tempMode[index2] = tempMode[index];
    tempMode[index] = tempElem;
    this.setState({
      mode: tempMode
    })
  }

  deleteMode(index) {
    let tempMode;
    tempMode = this.state.mode.slice();
    tempMode.splice(index, 1);
    this.setState({
      mode: tempMode
    })
  }

  copyMode() {
    this.setState({
      mode: this.props.settings.mode.slice()
    })
  }

  clearMode() {
    this.setState({
      mode: [],
      selectedMode: 'nothing'
    })
    this.refs.addHour.input.value = '';
    this.refs.addMin.input.value = '';
    this.refs.addSec.input.value = '';
  }

  sendMode() {
    this.props.dispatch(saveSettinsAction(this.state.mode))
    this.clearMode();
  }

  modeItemRender(modeItem, key, arrowButtons = false) {
    let text = '';
    let icon = '';
    switch (modeItem.type) {
      case 'photo': text = 'PHOTO'; icon = <PhotoCamIcon />;break;
      case 'video': text = 'VIDEO'; icon = <VideoCamIcon />;break;
      case 'sleep': text = 'SLEEP'; icon = <SleepIcon />;break;
      case 'nothing': text = 'NOTHING'; icon = <NothingIcon />;break;
      default: text='?'; icon = <SelectIcon />;break;
    }; 
    return (
      <div key={key} >
        <ListItem
          primaryText={`${text} (${Math.floor(modeItem.duration / 3600)}h ${Math.floor((modeItem.duration % 3600) / 60)}m ${(modeItem.duration % 60).toFixed(0)}s)`}
          leftIcon={icon}
          rightIconButton={
            arrowButtons ? 
              <div>
                <Button onMouseUp={this.moveMode.bind(this, key, key - 1)} icon={<ArrowUpIcon />} style={{margin: 5}} />
                <Button onMouseUp={this.moveMode.bind(this, key, key + 1)} icon={<ArrowDownIcon />} style={{margin: 5}} />
                <Button onMouseUp={this.deleteMode.bind(this, key)} icon={<DeleteIcon />} style={{margin: 5}} />
              </div>
            : null 
          }
        />
        <Divider />
      </div>
    )
  }

  render() {
    const { settings, actions } = this.props;

    return (
      <div>
        <div style={{display: 'inline-block', margin: '30px', verticalAlign: 'top'}}>
          <Subheader>Current</Subheader>
          <List style={{width: '300px'}}>
          {
            settings.mode.map((modeItem, key) => (
              this.modeItemRender(modeItem, key, false)
            )) 
          }
          </List>
        </div>
        <div style={{display: 'inline-block', margin: '30px', verticalAlign: 'top'}}>
          <Subheader>New</Subheader>
          <List style={{width: '530px'}}>
            {
              this.state.mode.map((modeItem, key) => (
                this.modeItemRender(modeItem, key, true)
              )) 
            }
          </List>
          <div>
            <SelectField value={this.state.selectedMode} onChange={this.selectModeHandle.bind(this)} style={{width: 150, display: 'inline-block'}}>
              <MenuItem value='nothing' primaryText='nothing' leftIcon={<NothingIcon />} />
              <MenuItem value='photo' primaryText='PHOTO' leftIcon={<PhotoCamIcon />} />
              <MenuItem value='video' primaryText='VIDEO' leftIcon={<VideoCamIcon />} />
              <MenuItem value='sleep' primaryText='SLEEP' leftIcon={<SleepIcon />} />
            </SelectField>&emsp;
            <TextField style={{width: 30}} ref='addHour' id='addHourName' floatingLabelText='hour' />&emsp;:&emsp;
            <TextField style={{width: 30}} ref='addMin' id='addMinName' floatingLabelText='Min' />&emsp;:&emsp;
            <TextField style={{width: 30}} ref='addSec' id='addSecName' floatingLabelText='sec' />
            <Button label='Add' onMouseUp={this.addOneMode.bind(this)} style={{margin: 10}} />
          </div>
          <div>
            <Button label='Send' onMouseUp={this.sendMode.bind(this)} disabled={this.state.mode.length === 0} primary={this.state.mode.length > 0} style={{margin: 10}} />
            <Button label='Copy' onMouseUp={this.copyMode.bind(this)} disabled={settings.mode.length === 0} style={{margin: 10}} />
            <Button label='Clear' onMouseUp={this.clearMode.bind(this)} style={{margin: 10}} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ settings: state.settings })
)(Settings)
