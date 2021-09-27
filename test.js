function getDateFormat (data) {
  let dateString = new Date(data)
  const year = dateString.getFullYear()
  const month = ('0' + (dateString.getMonth() + 1)).slice(-2)
  const date = ('0' + (dateString.getDate())).slice(-2)
  console.log( `${year}-${month}-${date}`)
}

function getDateFormat1 (data) {
  let dateString = new Date(data)
  console.log(dateString)
  const year = dateString.getFullYear()
  console.log(year)
  const month = ('0' + (dateString.getMonth() + 1)).slice(-2)
  const date = ('0' + (dateString.getDate())).slice(-2)
  console.log( `${year}-${month}-${date}`)
}


data = 'Fri Jan 01 1988 08:00:00 GMT+0800 (GMT+08:00)'

getDateFormat1(data)