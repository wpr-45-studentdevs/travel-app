import { toggle } from '../Logic/Logic';
import { filterItems } from '../Logic/Logic';

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