const initialState = {
      user: {},
}

//ACTION TYPES
const GET_USER_DATA = 'GET_USER_DATA'

//ACTION CREATORS
export function getUserData(userData) {
      return {
            type: GET_USER_DATA,
            payload: userData
      }
}

//REDUCER
export default function reducer(state = initialState, action) {
      switch (action.type) {
            case GET_USER_DATA:
                  return { ...state, user: action.payload }
            default:
                  return state
      }
}
