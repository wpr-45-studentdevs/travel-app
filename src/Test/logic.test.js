
import {toggle, addBudgetItem} from '../Logic/Logic'
import { toggle, calculateTotal, filterItems, searchTrips } from '../Logic/Logic'
import { toggle, calculateTotal, filterItems, searchTrips } from '../Logic/Logic'

const budget = [
  {
    budget_item_id: 2,
    item_cost: 79900,
    item_name: "flights",
    trip_id: 2
  },
  {
    budget_item_id: 3,
    item_cost: 53400,
    item_name: "accommodation",
    trip_id: 2
  },

  {
    budget_item_id: 4,
    item_cost: 37500,
    item_name: "food",
    trip_id: 2
  },
]

const budget2 = [
  {
    budget_item_id: 2,
    item_cost: 79925,
    item_name: "flights",
    trip_id: 2
  },
  {
    budget_item_id: 3,
    item_cost: 53432,
    item_name: "accommodation",
    trip_id: 2
  },

  {
    budget_item_id: 4,
    item_cost: 37547,
    item_name: "food",
    trip_id: 2
  }
]


//LILY'S TESTS
describe('tests toggle show button', () => {
  test('if given true return false', () => {
    expect(toggle(true)).toBe(false)
  })

  test('if given false returns true', () => {
    expect(toggle(false)).toBe(true)
  })

  test('if given a falsy value, returns true', () => {
    expect(toggle()).toBe(true)
  })
})

//Budget Tests
describe('can add budget item to budget array', () => {
  test('new item must have name', () => {
    expect(addBudgetItem('', 2)).toBe('please enter an item item name')
  })

  test('new item must have cost', () => {
    expect(addBudgetItem('flights', '')).toBe('please enter an item cost')
  })
  
  test('item cost must be a number', () => {
    expect(addBudgetItem('flights', 'string')).toBe('item cost must be a number')
  })

  test('item cost must be sent to database as pennies', () => {
    let newItem = addBudgetItem('flights', 5);
    expect(newItem.item_cost).toBe(500)
  })
  
  test('item name must be a string', () => {
    expect(addBudgetItem(2, 2)).toBe('item name must be a string')
  })
})

describe('can calculate total of budget', () => {
  test('should get correct subtotal', () => {
    expect(calculateTotal(budget)).toBe('$1708')
  })

  test('string should start with a $', () => {
    expect(calculateTotal(budget)[0] === '$')
  })

  test('returns a string', () => {
    expect(typeof(calculateTotal(budget)) === 'string')
  })
  
  test('should have two decimal places if not an even dollar', () => {
    let testNum = calculateTotal(budget2).split('.')
    expect(testNum[1].length === 2)
  })

  test('should have no decimal places if calculates to an even total', () => {
    let testNum = calculateTotal(budget).split('.')
    expect(testNum[1]).toBe(undefined)
  })

  test('should not have more than two decimal places', () => {
    let testNum = calculateTotal(budget2).split('.')
    expect(testNum[1].length).not.toBeGreaterThan(2)
  })
  
})

//FIN'S TESTS
describe('testing adding trips details and user to trip', ()=>{
  const publicTrips = [
    {
      id: 1,
      trip_name: 'Bermuda',
      date: 'June',
      completed: false,
      public: true,
      trip_length: 353
    },
    {
      id: 2,
      trip_name: 'Africa',
      date: 'August',
      completed: false,
      public: true,
      trip_length: 4
    },
    {
      id: 3,
      trip_name: 'Guam',
      date: 'December',
      completed: false,
      public: true,
      trip_length: 23
    }
  ]
  test('function runs when search has value', ()=>{
  expect(searchTrips(publicTrips, 'c')).toBeTruthy()}),

  test('returns an array with value less than 3 when letter g is input', ()=>{
    expect(searchTrips(publicTrips, 'g')).toHaveLength(2)
  }),

  test('returns Africa trip when africa is searched', ()=>{
    let trip = searchTrips(publicTrips, 'africa')
    expect(trip[0]).toHaveProperty('trip_name', 'Africa')
  }),

  test('will only search with strings', ()=>{
    console.log(searchTrips(publicTrips, '2'))
    let trip = searchTrips(publicTrips, '3')
    expect(trip).toEqual([])
  }),

  test('returns nothing if letter not found in strings is input', ()=> {
    let trip = searchTrips(publicTrips, 'z')
    expect(trip).toEqual([])
  })
})


//SAM'S TESTS
describe.only('filter bucket list items', () => {
  const list = [
    {
      bucket_list_id: 1,
      title: 'Write a function',
      user_id: 12,
      completed: false
    },
    {
      bucket_list_id: 2,
      title: 'Write 2 functions',
      user_id: 12,
      completed: true
    },
    {
      bucket_list_id: 3,
      title: 'Write 3 functions',
      user_id: 12,
      completed: false
    }
  ]
  test('filter items should return an array of 2 arrays', () => {
    expect(filterItems(list)).toHaveLength(2);
  })

  test('every item in completed array should be complete', () => {
    expect(filterItems(list)[0][0]).toHaveProperty('completed', true)
  })

  test('every item in incomplete array should be incomplete', () => {
    expect(filterItems(list)[1][0]).toHaveProperty('completed', false)
  })

  test('filter should not modify original array', () => {
    expect(list).toHaveLength(3);
  })
})