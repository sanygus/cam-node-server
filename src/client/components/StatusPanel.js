import React, { Component, PropTypes } from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';

export default class StatusPanel extends Component {
  render () {
    const { loading, lastUpd, onClickUpdateData } = this.props;

    return (
      <div>
        <RaisedButton
          label='Update'
          onClick={onClickUpdateData}
          style={{margin: '20px'}}
        />
        <TextField
          value={lastUpd}
          floatingLabelText="Update time"
          style={{margin: '20px'}}
        />
        <RefreshIndicator top={20} left={20} status={ loading ? 'loading' : 'hide' } />
      </div>
    )
  }
}

StatusPanel.PropTypes = {
  lastUpd: PropTypes.string.isRequired,
  onClickUpdateData: PropTypes.func.isRequired,
}
