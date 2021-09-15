import {applyMiddleware, combineReducers, createStore,compose} from "redux";
import createSagaMiddleware from 'redux-saga'
import rootSagas from "./saga/rootSaga";
import rootReducer from "./reducers/reducer";

const composeEnhancers = import.meta.env.PROD
  ? compose
  : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSagas)
export default store