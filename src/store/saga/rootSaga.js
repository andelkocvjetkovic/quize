import { all } from 'redux-saga/effects'
import { watchTestSaga } from './sagas/watchTestSaga'
export function* watchStartup() {
  console.log('Startup!')
  yield 1
}

export default function* rootSagas() {
  yield all([watchStartup(), watchTestSaga()])
}