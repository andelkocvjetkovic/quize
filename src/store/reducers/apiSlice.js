const BASE_API = 'https://opentdb.com/api.php?type=multiple&encode=url3986&amount=10';
const API_SET = 'settings/set'
const API_RESET = 'settings/reset';
const initialState = {
  endPoint: BASE_API
}
export default function apiReducer(state = initialState, action) {
  switch (action.type) {
    case API_SET: {
      return {
        endPoint: action.payload
      }
    }
    case API_RESET: {
      return {
        endPoint: BASE_API
      }
    }
    default: {
      return state
    }
  }
}

export const selectCurrentApi = state => state.api.endPoint;

export const setApi = (payload) => ({type: API_SET,payload: payload})
export const resetApi = () => ({type: API_RESET})