const initialState = {
  questions: []
}
let QUESTIONS_FETCH = 'question/fetched';
export default function questionReducer(state = initialState, action) {

  switch (action.type) {
    case QUESTIONS_FETCH: {
      return {
        questions: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const selectQuestions = state => state.questions.questions


export const fetchQuestions = (payload) => ({type: QUESTIONS_FETCH, payload: payload});
