import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FileViewer from './FileViewer.js';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';
import Avatar from 'material-ui/lib/avatar';
import FlatButton from 'material-ui/lib/flat-button';
import PlayIcon from 'material-ui/lib/svg-icons/av/play-circle-outline';

class FileList extends Component {
  constructor() {
    super();
    this.state = {
      viewFile: null
    }
  }

  view(filePath) {
    this.setState({
      viewFile: filePath
    });
  }

  render() {
    const { files, actions } = this.props;
    //console.log(files, actions);
    /*setTimeout(() => {
      actions.updateFiles([{name: 'file1', size: 1}, {name: 'file2', size: 2}]);
    }, 1000);*/

    return (
      <List>
        <FileViewer filePath={this.state.viewFile} closeHandler={this.view.bind(this, null)} />
        <Subheader>FileList ({files.length})</Subheader>
        {
          files.map( (value, key) => {
            const avatar = (value.name.indexOf('.mp4') > 0) ? <Avatar icon={<PlayIcon />} /> : <Avatar src={`/files/${value.name}`} />;
            return (
              <FlatButton
                key={key}
                linkButton={true}
                onMouseUp={this.view.bind(this, `/files/${value.name}`)}
                style={{margin: '0 20px'}}
              >
                <ListItem
                  leftAvatar={avatar}
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
