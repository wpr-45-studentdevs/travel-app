export function toggle(bool) {
  return !bool
}

export function calculateTotal(arr) {
  let total = arr.reduce((acc, item) => {
    return acc + item.item_cost
  }, 0)
  total = total / 100
  let numArr = total.toString().split('.')
  // console.log(numArr)
  if(numArr[1]) {
    return total.toLocaleString('dollar', {style: 'currency', currency: 'USD'})
  } else {
    return '$' + total
  }
}