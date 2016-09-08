'use strict';

const options = require('./serverOptions');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const log = require('./log');

module.exports.fileSaver = function fileSaver(data) {
  //const saveFileName = /.+\.h264$/.test(data.filename) ? data.filename.replace(/:/g,'') : data.filename;
  const saveFileName = data.filename;
  fs.writeFile(path.resolve(options.filesDir, saveFileName), data.content, () => {
    log(`file ${saveFileName} saved`);
    if (/.+\.h264$/.test(saveFileName)) {
      new Promise((resolve, reject) => {
        exec(
          `mp4mux --track h264:${saveFileName} ${saveFileName.replace('.h264', '.mp4')}`,
          { cwd: path.resolve(options.filesDir), timeout: 5000 },
          (err, stout, sterr) => {
            if (err) {
              reject(new Error(`packing ${saveFileName} error, stout: '${stout}', sterr: '${sterr}'`));
            } else {
              fs.unlink(path.resolve(options.filesDir, saveFileName), () => {
                resolve(saveFileName.replace('.h264', '.mp4'));
              });
            }
          }
        );
      })
      .then(
        fileName => {
          return new Promise((resolve, reject) => {
            exec(
              `mp4fragment ${fileName} ${fileName.replace('.mp4', '.frag.mp4')}`,
              { cwd: path.resolve(options.filesDir), timeout: 5000 },
              (err, stout, sterr) => {
                if (err) {
                  reject(new Error(`fragmenting ${fileName} error, stout: '${stout}', sterr: '${sterr}'`));
                } else {
                  resolve(fileName.replace('.mp4', '.frag.mp4'));
                }
              }
            );
          })
        }
      )
      .then(
        fileName => {
          return new Promise((resolve, reject) => {
            exec(
              `mp4dash -f -o dash ${fileName}`,
              { cwd: path.resolve(options.filesDir), timeout: 5000 },
              (err, stout, sterr) => {
                if (err) {
                  reject(new Error(`formatting to dash ${fileName} error, stout: '${stout}', sterr: '${sterr}'`));
                } else {
                  fs.unlink(path.resolve(options.filesDir, fileName), () => {
                      resolve(fileName.replace('.frag.mp4', '.h264'));
                  });
                }
              }
            );
          })
        }
      )
      .then(
        origFileName => {
          log('formatting to dash successfully ' + origFileName);
        }
      )
      .catch(
        error => {
          log(error.message);
        }
      )
    }
  });
};

module.exports.checkFilesDir = function checkFilesDir() {
  fs.stat(path.resolve(options.filesDir), (err) => {
    if (err) {
      fs.mkdir(path.resolve(options.filesDir));
    }
  })
};
