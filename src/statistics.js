var dateformat = require('dateformat');

var statistics = {
  online: false,
  onlineDate: null,
};

module.exports = statistics;
module.exports.setStatus = function (status) {
  statistics.online = status;
  statistics.onlineDate = dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss');
};
