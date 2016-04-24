import React, { Component, PropTypes } from 'react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';
import Avatar from 'material-ui/lib/avatar';
import FlatButton from 'material-ui/lib/flat-button';
import IconFileDownload from 'material-ui/lib/svg-icons/file/file-download';

export default class FileList extends Component {
  render () {
    const { files } = this.props;

    return (
      <List>
        <Subheader>FileList ({files.length})</Subheader>
        {
          files.map( (value, key) => {
            return <ListItem
              key={key}
              leftAvatar={<Avatar src={`/files/${value.name}`} />}
              rightIconButton={
                <FlatButton
                  linkButton={true}
                  href={`/files/${value.name}`}
                  icon={<IconFileDownload />}
                />
              }
              primaryText={value.name}
              secondaryText={`${value.size} KB`}
            />;
          })
        }
      </List>
    )
  }
}

FileList.PropTypes = {
  files: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}
