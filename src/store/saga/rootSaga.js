import { all,put } from 'redux-saga/effects'
import {watchIncrementIdx} from "./sagas/watchIncrementIdx";
import {watchPlayAgain} from "./sagas/watchPlayAgain";
import {watchUserScore} from "./sagas/watchUserScore";
import {ACTION_FETCH_QUESTION, watchFetchQuestions} from "./sagas/watchFetchQuestions";
import {watchApiChange} from "./sagas/watchApiChange";
export function* watchStartup() {
  yield put(ACTION_FETCH_QUESTION());
}

export default function* rootSagas() {
  yield all([watchStartup(), watchIncrementIdx(),watchPlayAgain(),watchUserScore(),watchFetchQuestions(),watchApiChange()])
}