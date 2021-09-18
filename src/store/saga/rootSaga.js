import {all, put,call} from 'redux-saga/effects'
import {watchIncrementIdx} from "./sagas/watchIncrementIdx";
import {watchPlayAgain} from "./sagas/watchPlayAgain";
import {watchUserScore} from "./sagas/watchUserScore";
import {ACTION_FETCH_QUESTION, watchFetchQuestions} from "./sagas/watchFetchQuestions";
import {watchApiChange} from "./sagas/watchApiChange";
import {categoriesLoading, setCategories} from "../reducers/categoriesSlice";

export function* startUpFetchQuestion() {
  yield put(ACTION_FETCH_QUESTION());
}
export function* startUpFetchCategories() {
  const CATEGORY_LINK = 'https://opentdb.com/api_category.php';

  yield put(categoriesLoading());
  try {
    const resp = yield call(fetch,CATEGORY_LINK);
    if(resp.ok) {
      const data = yield call([resp,resp.json]);
      yield put(setCategories(data.trivia_categories))
    }
  } catch (e) {
    console.log(e)
  }

}
export default function* rootSagas() {
  yield all([
      startUpFetchQuestion(), startUpFetchCategories(),
      watchIncrementIdx(),watchApiChange(),
      watchPlayAgain(), watchUserScore(),
      watchFetchQuestions(),
    ]
  )
}