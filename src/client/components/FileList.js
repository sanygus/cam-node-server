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
      viewFiles: null
    }
  }

  view(filesPath) { //filesPath is string (one file) or array of string (several files)
    this.setState({
      viewFiles: filesPath
    });
    if ((filesPath !== null) && (filesPath.indexOf('.mpd') > 0)) { //костыль
      setTimeout(() => {
        let player = dashjs.MediaPlayer().create();
        player.initialize(document.querySelector("#dash-player"), filesPath);
      }, 50);
    }
  }

  viewAllVideo() {
    this.view(this.props.files.filter((file) => {
      return (file.name.indexOf('.mp4') > 0)
    }).map((file) => {
      return '/files/' + file.name
    }));
  }

  render() {
    const { files, actions } = this.props;
    //console.log(files, actions);
    /*setTimeout(() => {
      actions.updateFiles([{name: 'file1', size: 1}, {name: 'file2', size: 2}]);
    }, 1000);*/

    return (
      <List>
        <FileViewer filesPath={this.state.viewFiles} closeHandler={this.view.bind(this, null)} />
        <Subheader>FileList ({files.length})</Subheader>
        <div>
          <div style={{display: 'inline-block'}}><FlatButton label="View DASH" onMouseUp={this.view.bind(this, '/files/dash/stream.mpd')} /></div>
          <div style={{display: 'inline-block'}}><FlatButton label="View all videos" onMouseUp={this.viewAllVideo.bind(this)} /></div>
        </div>
        {
          files.map( (value, key) => {
            const avatar = (value.name.indexOf('.mp4') > 0) ? <Avatar icon={<PlayIcon />} /> : <Avatar src={`/files/${value.name}`} />;
            return (
              <FlatButton
                key={key}
                onMouseUp={this.view.bind(this, `/files/${value.name}`)}
                style={{width: 280, margin: '0 20px'}}
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
