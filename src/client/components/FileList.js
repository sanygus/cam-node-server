import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';
import Avatar from 'material-ui/lib/avatar';
import FlatButton from 'material-ui/lib/flat-button';
import IconFileDownload from 'material-ui/lib/svg-icons/file/file-download';

class FileList extends Component {
  render () {
    const { files, actions } = this.props;
    //console.log(files, actions);
    /*setTimeout(() => {
      actions.updateFiles([{name: 'file1', size: 1}, {name: 'file2', size: 2}]);
    }, 1000);*/

    return (
      <List>
        <Subheader>FileList ({files.length})</Subheader>
        {
          files.map( (value, key) => {
            return (
              <FlatButton
                key={key}
                linkButton={true}
                href={`/files/${value.name}`} >
                <ListItem
                  leftAvatar={<Avatar src={`/files/${value.name}`} />}
                  primaryText={value.name}
                  secondaryText={`${value.size} KB`} />
              </FlatButton>
            )
          })
        }
      </List>
    )
  }
}

FileList.PropTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
  })).isRequired
}

export default connect(
  state => ({ files: state.files })
  //dispatch => ({ actions: bindActionCreators(filesActions, dispatch) })
)(FileList)
