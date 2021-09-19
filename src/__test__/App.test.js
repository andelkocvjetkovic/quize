import React from 'react';
import App from "../App";
import {mockFetch} from "../../jest/mocks/mockFetch";
import renderWithProvider from "../../jest/renderWithProvider";
import {act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import 'regenerator-runtime/runtime'
import {mockResponseQuestion} from "../../jest/mocks/responseMock";
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
  it('should answer on question, render next question, answer on each question correct, render end of game with 10 correct', async function () {
    let getByRole, getByText;
    await act(async () => {
      ({getByRole, getByText} = renderWithProvider(<App/>))
      jest.runAllTimers();
    })
    userEvent.click(getByRole('button', {name: /start the quiz/i}));
    for (let i = 0; i < mockResponseQuestion.results.length; i++) {
      const question = mockResponseQuestion.results[i];
      getByText(decode(question.question));
      const correctAnswer = getByRole('button', {
        name: decode(question.correct_answer)
      });
      for (let j = 0; j < question.incorrect_answers.length; j++) {
        const answer = question.incorrect_answers[j];
        getByRole('button', {
          name: decode(answer)
        })
      }
      userEvent.click(correctAnswer);
    }
    getByText(/your score/i);
    getByText(/correct 10/i);
    getByText(/wrong 0/i);
  });
  it('should open settings and close it on click save changes', async function () {
    let getByRole, getByText,getByLabelText,queryByLabelText;
    await act(async () => {
      ({getByRole, getByText,getByLabelText,queryByLabelText} = renderWithProvider(<App/>))
      jest.runAllTimers();
    })
    const buttonSettings =getByRole('button',{name: /settings/i});
    userEvent.click(buttonSettings);
    getByLabelText(/number of question/i);
    getByLabelText(/select category/i);
    getByLabelText(/select difficulty/i);
    const buttonSaveChanges = getByRole('button',{name: /save changes/i});
    userEvent.click(buttonSaveChanges);
    expect(queryByLabelText(/number of question/i)).not.toBeInTheDocument();
    expect(queryByLabelText(/select category/i)).not.toBeInTheDocument();
    expect(queryByLabelText(/select difficulty/i)).not.toBeInTheDocument();
  });
})


function decode(str) {
  return new RegExp(decodeURIComponent(str), 'i');
}