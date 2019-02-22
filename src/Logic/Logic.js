export function toggle(bool) {
  return !bool
}

<<<<<<< HEAD


let budget = [{
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
    return ('please enter an item item name')
  } else if (item_cost === '') {
    return ('please enter an item cost')
  } else if (isNaN(item_cost)) {
    return ('item cost must be a number')
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

=======
>>>>>>> master
export function calculateTotal(arr) {
  let total = arr.reduce((acc, item) => {
    return acc + item.item_cost
  }, 0)
  total = total / 100
  let numArr = total.toString().split('.')
  // console.log(numArr)
<<<<<<< HEAD
  if (numArr[1]) {
    return total.toLocaleString('dollar', {
      style: 'currency',
      currency: 'USD'
    })
=======
  if(numArr[1]) {
    return total.toLocaleString('dollar', {style: 'currency', currency: 'USD'})
>>>>>>> master
  } else {
    return '$' + total
  }
}
export function filterItems(arr) {
  let completedItems = [];
  let incompleteItems = []
  for (let i = 0; i < arr.length; i++) {
<<<<<<< HEAD
    if (arr[i].completed === true) {
      completedItems.push(arr[i])
    } else {
      incompleteItems.push(arr[i])
    }
=======
     if (arr[i].completed === true) {
        completedItems.push(arr[i])
     } else {
        incompleteItems.push(arr[i])
     }
>>>>>>> master
  }
  return [completedItems, incompleteItems];
  // this.setState({
  //    completedItems,
  //    incompleteItems
  // })
}

//Fin's tests start

export function searchTrips(arr, search) {
  let arr2 = []
<<<<<<< HEAD
  console.log(arr2)
=======
>>>>>>> master
  if (search) {
    let filteredArr = arr.filter((object, index) => {
      let passed = false;
      for (let property in object) {
        if (typeof object[property] === "string") {
          if (object[property].toLowerCase().includes(search.toLowerCase())) {
            passed = true;
          }
        }
      }
      if (passed === true) {
        return true;
      } else {
        return false;
      }
<<<<<<< HEAD

=======
      
>>>>>>> master
    });
    return filteredArr
    // console.log(filteredArr)
  }
}

<<<<<<< HEAD
//Fin's tests End
=======
//Fin's tests End
>>>>>>> master
