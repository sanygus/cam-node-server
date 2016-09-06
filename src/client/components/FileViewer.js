import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//import Paper from 'material-ui/lib/paper';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

class FileViewer extends Component {
  nextVideo(filesPath) {
    function PathToName(FilePath) {
      return FilePath.substring(FilePath.lastIndexOf("/") + 1);
    }

    let currentFileIndex = -1;
    let nextFilePath = this.refs.videoElem.currentSrc.substring(0, this.refs.videoElem.currentSrc.lastIndexOf("/") + 1);

    if(filesPath && (filesPath.length > 0)) {
      currentFileIndex = filesPath.findIndex((fileName) => {
        return PathToName(fileName) === PathToName(this.refs.videoElem.currentSrc);
      });
      if (currentFileIndex < (filesPath.length - 1)) {
        nextFilePath += PathToName(filesPath[currentFileIndex + 1]);
      } else {
        nextFilePath += PathToName(filesPath[0]);
      }
    } else {
      nextFilePath = this.refs.videoElem.currentSrc;
    }
    this.refs.videoElem.src = nextFilePath;
  }

  render() {
    const { filesPath, closeHandler } = this.props;
    let content = <p>unknown content</p>
    if (filesPath !== null) {
      if (typeof filesPath === "string") { //one file
        if (filesPath.indexOf('.jpg') > 0) {
          content = <img src={filesPath} width={1280} />
        } else if (filesPath.indexOf('.mp4') > 0) {
          content =
            <video
              controls="controls"
              preload="preload"
              autoPlay="autoPlay"
              style={{width: 1280, height: 720}}
            >
              <source src={filesPath} type="video/mp4" />
            </video>
        } else if (filesPath.indexOf('.mpd') > 0) {
          content =
            <video
              id="dash-player"
              controls
              autoPlay
              style={{width: 1280, height: 720}}
            >
            </video>
        }
      } else if (typeof filesPath === "object") { //playlist
        content =
          <video
            controls="controls"
            preload="preload"
            autoPlay="autoPlay"
            style={{width: 1280, height: 720}}
            ref="videoElem"
            onEnded={this.nextVideo.bind(this, filesPath)}
          >
            <source src={filesPath[0]} type="video/mp4" />
          </video>
      }
    }    


    return(
      <Dialog
        open={filesPath !== null}
        onRequestClose={closeHandler}
        actions={[
          (typeof filesPath === "string") ?
            <FlatButton
              label="Download"
              href={filesPath}
              linkButton={true}
              primary={true}
            />
          : null,
          <FlatButton
            label="Close"
            onTouchTap={closeHandler}
            secondary={true}
          />
        ]}
        contentStyle={{width: 1328, maxWidth: 'none'}}
        autoScrollBodyContent={true}
      >
        {content}
      </Dialog>
    )
  }
}

FileViewer.PropTypes = {
  filesPath: PropTypes.string.isRequired,
  closeHandler: PropTypes.func.isRequired
}

export default connect()(FileViewer)
