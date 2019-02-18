import {toggle} from '../Logic/Logic'

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