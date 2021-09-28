function getTodayData() {
  //new裡的date載入後可以取得當天的時間
  let dateControl = document.querySelector('input[type="date"]')
  let today = new Date() //瀏覽器會抓當地的時間
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const day = ('0' + (today.getDate())).slice(-2)
  dateControl.value = `${year}-${month}-${day}`
}

const datePanel = document.querySelector('.date-panel')
function getDatePanel(arr) {
  const dateString = new Date(arr)
  const year = dateString.getFullYear()
  const month = ('0' + (dateString.getMonth() + 1)).slice(-2)
  const day = ('0' + (dateString.getDate())).slice(-2)
  
  console.log(dateString.typeof)
  // dateString.innerText += `${year}-${month}-${day}`
}

// getDatePanel(datePanel.innerText) 





