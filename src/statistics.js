var dateformat = require('dateformat');

var online = false;
var onlineDate = null;

module.exports.setStatus = function (status) {
  online = status;
  onlineDate = dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss');
};

module.exports.getStatus = function() {
  return {
    online: online,
    onlineDate: onlineDate,
  };
}
