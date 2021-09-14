import {applyMiddleware, combineReducers, createStore,compose} from "redux";
import createSagaMiddleware from 'redux-saga'
import reducers from "./reducers/reducers";
import rootSagas from "./saga/rootSaga";

const composeEnhancers = import.meta.env.PROD
  ? compose
  : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSagas)
export default store