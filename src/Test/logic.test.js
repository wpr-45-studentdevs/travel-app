import { toggle, calculateTotal } from '../Logic/Logic'

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
