import React from 'react'

import StartScreen from "../StartScreen";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('<StartScreen />',() => {
  it('should render without error', function () {
    render(<StartScreen />)
  });
  it('should show start quiz text', function () {
    const {getByText} = render(<StartScreen />)
    getByText(/welcome to codepool quiz/i);
  });
  it('should start game on button click start game',() => {
    const startQuizeMock = jest.fn();
    const {getByText} = render(<StartScreen startQuiz={startQuizeMock} />)
    const startQuizBtn = getByText(/start the quiz/i);
    userEvent.click(startQuizBtn);
    expect(startQuizeMock).toBeCalledTimes(1);
  })
  it('button should be disabled when props isPending is given as true', function () {
    const {getByText,rerender} = render(<StartScreen isPending={true} />)
    const startButton = getByText(/start the quiz/i);
    expect(startButton).toBeDisabled();
    rerender(<StartScreen isPending={false} />)
    expect(startButton).not.toBeDisabled();

  });
})