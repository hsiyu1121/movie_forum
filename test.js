const text = '1234567890abcdefghijklmnopqrstuvwxyz'
const text1 = '1234567890abcde'

function strLength(arr) {
  let len = arr.length > 30 ? arr.slice(0, 30) + '...' : arr
  return len
}

console.log(strLength(text1))
console.log(strLength(text))
