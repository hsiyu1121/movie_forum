const moment = require('moment');
module.exports = {
  ifCond: function(a, b, options) {
    if (a === b) {
      return options.fn(this)
    }
    return options.inverse(this)
  },
  momentAgo: function(a) {
    return moment(a).fromNow()
  },
  momentDate: function(b) {
    return moment(b , 'YYYY/MM/DD').format().slice(0, 10)
  }
}