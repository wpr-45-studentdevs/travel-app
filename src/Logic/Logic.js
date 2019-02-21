export function toggle(bool) {
  return !bool
}



let budget = [
  {
    item_name: 'test1',
    item_cost: '1',
  },
  {
    item_name: 'test2',
    item_cost: '2',
  },
]

export function addBudgetItem(item_name, item_cost) {
  if (item_name === '') {
    return('please enter an item item name')
  } else if (item_cost === '') {
    return('please enter an item cost')
  } else if (isNaN(item_cost)) {
    return('item cost must be a number')
  } else if (typeof item_name !== 'string') {
    return ('item name must be a string')
  }
  let newItem = {
    item_name: item_name,
    item_cost: item_cost * 100
  }
  budget.push(newItem)
  return newItem;
}