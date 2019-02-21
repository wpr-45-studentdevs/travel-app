import {toggle, searchTrips} from '../Logic/Logic'
import { ExpansionPanelActions } from '@material-ui/core';
import { array } from 'prop-types';

// describe('tests toggle show button', () => {
//   test('if given true return false', () => {
//     expect(toggle(true)).toBe(false)
//   })

//   test('if given false returns true', () => {
//     expect(toggle(false)).toBe(true)
//   })

//   test('if given a falsy value, returns true', () => {
//     expect(toggle()).toBe(true)
//   })
// })


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