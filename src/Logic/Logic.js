export function toggle(bool) {
  return !bool
}

export function filterItems(arr) {
  let completedItems = [];
  let incompleteItems = []
  for (let i = 0; i < arr.length; i++) {
     if (arr[i].completed === true) {
        completedItems.push(arr[i])
     } else {
        incompleteItems.push(arr[i])
     }
  }
  return [completedItems, incompleteItems];
  // this.setState({
  //    completedItems,
  //    incompleteItems
  // })
}