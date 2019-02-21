import {toggle, addBudgetItem} from '../Logic/Logic'

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
