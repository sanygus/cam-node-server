import React, { Component, PropTypes } from 'react';

import Toggle from 'material-ui/lib/toggle';

export default class Settings extends Component {
  render() {
    const { settingsValues, settingsSave } = this.props;

    return (
      <div>
        <Toggle
          disabled={settingsValues.blocked}
          toggled={settingsValues.enablePhoto}
          onToggle={settingsSave.bind(this, 'enablePhoto', !settingsValues.enablePhoto)}
          label='Enable photo'
          style={{width: '200px', margin: '30px'}}
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