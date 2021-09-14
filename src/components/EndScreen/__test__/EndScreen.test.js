import React from 'react'
import {render} from "@testing-library/react";
import EndScreen from "../EndScreen";
import userEvent from "@testing-library/user-event";
describe('<EndScreen />',() => {
  it('should render without error', function () {
    render(<EndScreen />)
  });
  it('should render score given by props', function () {
    const correct = Array(3).fill(true); //3 correct
    const wrong = Array(3).fill(false); //3 wrong
    const userScore = [...correct,...wrong];
    const {getByText} = render(<EndScreen score={userScore} />)
    getByText(new RegExp(`correct ${correct.length}`,'i'));
    getByText(new RegExp(`wrong ${wrong.length}`,'i'));
  });
  it('should call function playAgain onClick button', function () {
    const mockPlayAgain = jest.fn();
    const {getByText} = render(<EndScreen playAgain={mockPlayAgain} /> );
    const button = getByText(/play again/i);
    userEvent.click(button);
    expect(mockPlayAgain).toBeCalledTimes(1);
  });
})