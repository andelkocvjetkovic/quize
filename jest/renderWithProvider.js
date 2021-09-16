import {createStore} from "redux";
import rootReducer from "../src/store/reducers/reducer";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";

export var dispatch;
export var getState;

export function renderWithProviders(ui, initialState) {
  const store = createStore(
    rootReducer,
    initialState ? initialState : undefined
  )
  dispatch = store.dispatch;
  getState = store.getState;
  return render(<Provider store={store}>{ui}</Provider>)
}