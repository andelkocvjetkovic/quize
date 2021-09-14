import {select, takeEvery, put} from 'redux-saga/effects'
import {ACTION_TEST, ACTION_UPDATE_TEST} from '../../storeConstants'

function* handleWatchTest() {
  // const { test } = yield select((state) => state.testReducer)
  yield put({
    type: ACTION_TEST,
    payload: 1,
  })
}

export function* watchTestSaga() {
  yield takeEvery(ACTION_UPDATE_TEST, handleWatchTest)
}