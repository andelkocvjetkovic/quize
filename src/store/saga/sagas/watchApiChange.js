import {takeLatest, put} from "redux-saga/effects";
import {setApi} from "../../reducers/apiSlice";
import {ACTION_FETCH_QUESTION} from "./watchFetchQuestions";

const BASE_API = 'https://opentdb.com/api.php?type=multiple&encode=url3986';

function* handleApiChange(action) {
  let newEndPoint = BASE_API;
  action.payload.forEach(e => {
    newEndPoint += '&' + e;
  })
  yield put(setApi(newEndPoint));
  yield put(ACTION_FETCH_QUESTION());
}

export function* watchApiChange() {
  yield takeLatest(ACTION_UPDATE_API().type, handleApiChange)
}

export const ACTION_UPDATE_API = (payload) => ({type: 'ACTION_UPDATE_API', payload: payload})