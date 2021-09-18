import rootSagas from "../src/store/saga/rootSaga";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../src/store/reducers/reducer";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";

export default function renderWithProvider(ui, initialState) {
  const effectMiddleware = next => effect => {
    return next(effect);
  };

  const sagaMiddleware = createSagaMiddleware({effectMiddlewares: [effectMiddleware]});
  const store = createStore(
    rootReducer,
    initialState ? initialState : undefined,
    applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(rootSagas)

  return render(<Provider store={store}>{ui}</Provider>)
}
