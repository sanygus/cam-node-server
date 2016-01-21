module.exports = {
  serverAddress: 'http://localhost:2929',
  defaultSettings: {
    photo: {
      width: 2592, // px
      height: 1944, // px
      quality: 100, // %
      timeout: 200, // ms
    },
    video: {
      width: 1280, // px
      height: 720, // px
      framerate: 15, // fps
      bitrate: 15000000, // bits/s // 1080p30 a high quality bitrate would be 15Mbits/s or more
      time: 20000, // ms
    },
  },
};
