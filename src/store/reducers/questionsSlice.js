import {IDLE, LOADING} from "../loadingEnum";
import {createSelector} from 'reselect'
import {selectCurrentIdx} from "./currentIdxSlice";

const initialState = {
  entities: [],
  status: IDLE,

}
const QUESTIONS_ADD = 'question/added';
const QUESTION_LOADING = 'question/loading';
export default function questionReducer(state = initialState, action) {

  switch (action.type) {
    case QUESTIONS_ADD: {
      return {
        ...state,
        status: IDLE,
        entities: action.payload
      }
    }
    case QUESTION_LOADING: {
      return {
        ...state,
        status: LOADING
      }
    }
    default: {
      return state
    }
  }
}

export const selectQuestions = state => state.questions.entities
export const selectQuestionStatus = state => state.questions.status;
export const selectCurrentQuestion = createSelector(
  selectQuestions,
  selectCurrentIdx,
  (questions, idx) => questions[idx]
)

export const addQuestions = (payload) => ({type: QUESTIONS_ADD, payload: payload});
export const questionsLoading = () => ({type: QUESTION_LOADING});