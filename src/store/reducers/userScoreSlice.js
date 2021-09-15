const initialState = {
  score: []
}
export default function userScoreReducer(state=initialState,action) {
  switch (action.type) {
    case 'userScore/reset': {
      return {
        score: []
      }
    }
    case 'userScore/answered': {
      return {
        score: [...state.score,action.payload]
      }
    }
    default : {
      return state
    }
  }
}
export const selectUserScore = state => state.userScore.score

export const resetUserScore = () => ({type: 'userScore/reset'});
export const answerUserScore = (answer) => ({type: 'userScore/answered',payload: answer});