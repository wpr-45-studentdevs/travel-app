export function toggle(bool) {
  return !bool;
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
