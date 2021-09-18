import gameReducer from "./gameSlice"
import {combineReducers} from "redux";
import currentIdxReducer from "./currentIdxSlice";
import userScoreReducer from "./userScoreSlice";
import apiReducer from "./apiSlice";
import questionReducer from "./questionsSlice";
import {categoriesReducer} from "./categoriesSlice";
const rootReducer = combineReducers({
  currentIdx: currentIdxReducer,
  game: gameReducer,
  userScore: userScoreReducer,
  api: apiReducer,
  questions: questionReducer,
  categories: categoriesReducer,
})
export default rootReducer