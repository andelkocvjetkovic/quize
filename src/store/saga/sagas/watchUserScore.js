import {takeEvery, put} from "redux-saga/effects";
import {ACTION_INCREMENT_IDX} from "./watchIncrementIdx";
import {answerUserScore} from "../../reducers/userScoreSlice";


function* handleUserScore(action) {
  //if it is 0 no need to increase currentIdx
  yield put(answerUserScore(action.payload));
  yield put(ACTION_INCREMENT_IDX());
}

export function* watchUserScore() {
  yield takeEvery(ACTION_USER_SCORE().type, handleUserScore);
}

export const ACTION_USER_SCORE = (answer) => ({type: 'ACTION_USER_SCORE', payload: answer});