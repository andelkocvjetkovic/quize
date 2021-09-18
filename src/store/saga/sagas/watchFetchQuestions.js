import {call, put, select, takeLatest} from 'redux-saga/effects'
import {selectCurrentApi} from "../../reducers/apiSlice";
import {addQuestions, questionsLoading} from "../../reducers/questionsSlice";

function* handleFetchQuestions() {
  const endPoint = yield select(selectCurrentApi);
  try {
    yield put(questionsLoading());
    const resp = yield call(fetch, endPoint);

    if (!resp.ok) {
      throw Error(resp.statusText);
    }
    const questions = yield call([resp, resp.json]);
    const decodedQuestions = questions.results.map(q => {
      return {
        category: decodeURIComponent(q.category),
        type: decodeURIComponent(q.type),
        difficulty: decodeURIComponent(q.difficulty),
        question: decodeURIComponent(q.question),
        correct_answer: decodeURIComponent(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(ia => decodeURIComponent(ia))
      }
    })
    yield put(addQuestions(decodedQuestions));
  } catch (e) {
    console.log(e.message)
  }


}

export function* watchFetchQuestions() {
  yield takeLatest(ACTION_FETCH_QUESTION().type, handleFetchQuestions)
}

export const ACTION_FETCH_QUESTION = () => ({type: 'ACTION_FETCH_QUESTIONS'});