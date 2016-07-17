import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//import Paper from 'material-ui/lib/paper';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

class FileViewer extends Component {
  render() {
    const { filePath, closeHandler } = this.props;
    let content = <p>unknown content</p>
    if (filePath) {
      if (filePath.indexOf('.jpg') > 0) {
        content = <img src={filePath} width={1280} />
      } else if (filePath.indexOf('.mp4') > 0) {
        content =
          <video
            controls="controls"
            preload="preload"
            autoPlay="autoPlay"
            style={{width: 1280, height: 720}}
          >
            <source src={filePath} type="video/mp4" />
          </video>
      }
    }

    return(
      <Dialog
        open={filePath !== null}
        onRequestClose={closeHandler}
        actions={[
          <FlatButton
            label="Download"
            href={filePath}
            linkButton={true}
            primary={true}
          />,
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
  filePath: PropTypes.string.isRequired,
  closeHandler: PropTypes.func.isRequired
}

export default connect()(FileViewer)
