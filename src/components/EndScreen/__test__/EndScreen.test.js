import React from 'react'
import EndScreen from "../EndScreen";
import userEvent from "@testing-library/user-event";
import renderWithProvider from "../../../../jest/renderWithProvider";
const correct = Array(3).fill(true); //3 correct
const wrong = Array(3).fill(false); //3 wrong
const userScore = [...correct,...wrong];
import {mockFetch} from "../../../../jest/mocks/mockFetch";
beforeEach(() => {
  mockFetch();
  jest.useFakeTimers();
})
beforeEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
})
describe('<EndScreen />',() => {
  it('should render without error', function () {
    renderWithProvider(<EndScreen />)
  });
  it('should render score', function () {

    const {getByText} = renderWithProvider(<EndScreen />,{
      userScore: {
        score: userScore,
      }
    })
    getByText(new RegExp(`correct ${correct.length}`,'i'));
    getByText(new RegExp(`wrong ${wrong.length}`,'i'));
    expect(correct.length + wrong.length).toEqual(userScore.length);
  });
  it('should render button play again', function () {
    const {getByRole} = renderWithProvider(<EndScreen />);
    const button = getByRole('button',{name: /play again/i});
    expect(button).not.toBeDisabled();
    userEvent.click(button);
  });
})