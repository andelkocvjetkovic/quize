import React from "react";
import StartGame from "../StartGame";
import {LOADING} from "../../../store/reducers/loadingStatusSlice";
import {renderWithProviders} from "../../../../jest/renderWithProvider";

describe('<StartGame />', () => {
  it('should render without error', function () {
    renderWithProviders(<StartGame/>)
  });
  it('should render welcome message,button for start quiz ', function () {
    const {getByText,dispatch} = renderWithProviders(<StartGame/>)
    console.log(dispatch);
    getByText(/welcome to codepool quiz/i);
    const startQuizBtn = getByText(/start the quiz/i);
    expect(startQuizBtn).not.toBeDisabled();
  });
  it('button start quiz should be disabled', () => {
    const {getByText} = renderWithProviders(<StartGame/>, {
      loadingStatus: {
        status: LOADING
      }
    })
    expect(getByText(/start the quiz/i)).toBeDisabled();
  })
})