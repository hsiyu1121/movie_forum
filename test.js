const moment = require('moment');

function momentDate(b) {
  return moment(b , 'YYYY/MM/DD').format()
}

let data = '1988-01-01T08:00:00+08:00'

console.log(momentDate(data).slice(0, 10))