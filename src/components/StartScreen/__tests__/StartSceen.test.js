import React from 'react'
import StartScreen from "../StartScreen";
import {act} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import renderWithProvider from "../../../../jest/renderWithProvider";
import {mockFetch} from "../../../../jest/mocks/mockFetch";
import 'regenerator-runtime/runtime'
let rootModal;
beforeEach(() => {
  jest.useFakeTimers();
  mockFetch();
  window.scrollTo = jest.fn();
  rootModal = document.createElement('div');
  rootModal.setAttribute('id', 'portal-root');
  document.body.appendChild(rootModal);
})
afterEach(() => {
  document.body.removeChild(rootModal);
  jest.runOnlyPendingTimers()
  jest.useRealTimers();
})



describe('<StartScreen />', () => {
  it('should render without error', function () {
    renderWithProvider(<StartScreen/>)
  });
  it('should render button start quiz, welcome message and settings button ', function () {
    const {getByText, getByRole} = renderWithProvider(<StartScreen/>)
    getByText(/welcome to quizzz/i);
    getByRole('button', {name: /start the quiz/i});
    getByRole('button', {name: /settings/i});
  });
  it('should open settings on button click and close settings on click save changes', async function () {
    let getByText, getByRole, getByLabelText, queryByLabelText;
    await act(async () => {
      ({
        getByText, getByRole, getByLabelText, queryByLabelText
      } = renderWithProvider(<StartScreen/>))
      jest.runAllTimers();
    })

    const buttonSettings = getByRole('button', {name: /settings/i});
    userEvent.click(buttonSettings);

    getByLabelText(/number of question/i);
    getByLabelText(/select category/i);
    getByLabelText(/select difficulty/i);
    const saveChanges = getByText(/save changes/i);
    expect(saveChanges).not.toBeDisabled();
    userEvent.click(saveChanges);
    expect(queryByLabelText(/number of question/i)).not.toBeInTheDocument();
    expect(queryByLabelText(/select category/i)).not.toBeInTheDocument();
    expect(queryByLabelText(/select difficulty/i)).not.toBeInTheDocument();

  })
it('button start quiz should be disabled during fetching data', async function () {
  const {getByRole} = renderWithProvider(<StartScreen/>)
  const startBtn = getByRole('button', {name: /start the quiz/i});
  expect(startBtn).toBeDisabled();
  await act(async () => {
    jest.runAllTimers();
  })
  expect(startBtn).not.toBeDisabled();
});
})


