export function toggle(bool) {
  return !bool
}

export function calculateTotal(arr) {
  let total = arr.reduce((acc, item) => {
    return acc + item.item_cost
  }, 0)
  total = total / 100
  return '$' + total
}