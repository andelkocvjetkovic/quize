import { ACTION_TEST } from '../storeConstants'

const initialState = {
  test: 1,
}

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TEST: {
      state = {
        test: action.payload,
      }
      return state
    }
    default: {
      return state
    }
  }
}

export default testReducer
