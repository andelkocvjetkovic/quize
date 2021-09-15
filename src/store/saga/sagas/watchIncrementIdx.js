import {takeEvery, select, put} from "redux-saga/effects";
import {incrementIdx, resetIdx, selectCurrentIdx} from "../../reducers/currentIdxSlice";
import {endGame} from "../../reducers/gameSlice";

function* handleWatchIncrementIdx() {
  const currentIdx = yield select(selectCurrentIdx);
  if(currentIdx + 1 === 10) {
    yield put(resetIdx())
    yield put(endGame())
  } else {
    yield put(incrementIdx());
  }
}

export function* watchIncrementIdx() {
  yield takeEvery(ACTION_INCREMENT_IDX().type,handleWatchIncrementIdx)
}
export const ACTION_INCREMENT_IDX = () => ({type: 'ACTION_INCREMENT_IDX'});