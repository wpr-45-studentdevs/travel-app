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

//Fin's tests start

export function searchTrips(arr, search) {
  let arr2 = []
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
      
    });
    return filteredArr
    // console.log(filteredArr)
  }
}

//Fin's tests End
