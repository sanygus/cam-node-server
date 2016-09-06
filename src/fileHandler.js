'use strict';

const options = require('./serverOptions');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const log = require('./log');

module.exports.fileSaver = function fileSaver(data) {
  const saveFileName = /.+\.h264$/.test(data.filename) ? data.filename.replace(/:/g,'') : data.filename;
  fs.writeFile(path.resolve(options.filesDir, saveFileName), data.content, () => {
    log(`file ${saveFileName} saved`);
    if (/.+\.h264$/.test(saveFileName)) {
      /*exec(
        `MP4Box -quiet -fps ${options.videoConvertFPS} -add ${saveFileName} ${data.filename.replace('.h264', '.mp4')}`,
        { cwd: path.resolve(options.filesDir), timeout: 5000 },
        (err, stout, sterr) => {
          if (err) {
            log(`packing ${saveFileName} error, stout: '${stout}', sterr: '${sterr}'`);
          } else {
            log(`packing ${saveFileName} to ${data.filename.replace('.h264', '.mp4')} success`);
            fs.unlink(path.resolve(options.filesDir, saveFileName), () => {
              log(`original file ${saveFileName} deleted`);
            });
          }
        }
      );*/
      exec(
        `mp4mux --track h264:${saveFileName} ${saveFileName.replace('.h264', '.mp4')}`,
        { cwd: path.resolve(options.filesDir), timeout: 5000 },
        (err, stout, sterr) => {
          if (err) {
            log(`packing ${saveFileName} error, stout: '${stout}', sterr: '${sterr}'`);
          } else {
            log(`packing ${saveFileName} to ${saveFileName.replace('.h264', '.mp4')} success`);
            fs.unlink(path.resolve(options.filesDir, saveFileName), () => {
              log(`original file ${saveFileName} deleted`);

              exec(
                `mp4fragment ${saveFileName.replace('.h264', '.mp4')} ${saveFileName.replace('.h264', '.frag.mp4')}`,
                { cwd: path.resolve(options.filesDir), timeout: 5000 },
                (err, stout, sterr) => {
                  if (err) {
                    log(`fragmenting ${saveFileName.replace('.h264', '.mp4')} error, stout: '${stout}', sterr: '${sterr}'`);
                  } else {
                    log(`fragmenting ${saveFileName.replace('.h264', '.mp4')} to ${saveFileName.replace('.h264', '.frag.mp4')} success`);
                    /*fs.unlink(path.resolve(options.filesDir, saveFileName.replace('.h264', '.mp4')), () => {
                      log(`original file ${saveFileName.replace('.h264', '.mp4')} deleted`);*/
                      
                      exec(
                       `mp4dash -f -o dash ${saveFileName.replace('.h264', '.frag.mp4')}`,
                       { cwd: path.resolve(options.filesDir), timeout: 5000 },
                        (err, stout, sterr) => {
                          if (err) {
                            log(`dash ${saveFileName.replace('.h264', '.frag.mp4')} error, stout: '${stout}', sterr: '${sterr}'`);
                          } else {
                            log(`dash success`);
                            fs.unlink(path.resolve(options.filesDir, saveFileName.replace('.h264', '.frag.mp4')), () => {
                              log(`original file ${saveFileName.replace('.h264', '.frag.mp4')} deleted`);
                            });
                          }
                        }
                      );

                    //});
                  }
                }
              );

            });
          }
        }
      );
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
