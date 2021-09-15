import {takeEvery,put} from "redux-saga/effects";
import {startGame} from "../../reducers/gameSlice";
import {resetUserScore} from "../../reducers/userScoreSlice";

function* handlePlayAgain() {
  yield put(resetUserScore())
  yield put(startGame())
}

export function* watchPlayAgain() {
  yield takeEvery(ACTION_PLAY_AGAIN().type,handlePlayAgain)
}
export const ACTION_PLAY_AGAIN = () => ({type: 'ACTION_PLAY_AGAIN'})