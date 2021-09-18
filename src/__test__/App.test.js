import React from 'react';
import App from "../App";
import {mockFetch} from "../../jest/mocks/mockFetch";
import renderWithProvider from "../../jest/renderWithProvider";
import {act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  mockFetch();
  jest.useFakeTimers();
})
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
})

describe('<App />', () => {
  it('should render without error', async function () {
    renderWithProvider(<App/>)
  })
  it('should start game on click start the quiz', async function () {
    let getByRole;
    await act(async () => {
      ({getByRole} = renderWithProvider(<App/>))
      jest.runAllTimers();
    })

    const button = getByRole('button', {name: /start the quiz/i})
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    expect(button).not.toBeInTheDocument();
  });
})
