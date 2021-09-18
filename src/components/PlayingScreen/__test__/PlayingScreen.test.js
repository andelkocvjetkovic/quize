import React from "react";
import 'regenerator-runtime/runtime'
import PlayingScreen from "../PlayingScreen";
import userEvent from "@testing-library/user-event";
import renderWithProvider from "../../../../jest/renderWithProvider";
import {mockFetch} from "../../../../jest/mocks/mockFetch";
import {act} from "@testing-library/react";
import {IDLE} from "../../../store/loadingEnum";
import {mockResponseQuestion} from "../../../../jest/mocks/responseMock";

beforeEach(() => {
  jest.useFakeTimers();
  mockFetch();
})
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
})


const questions = [
  {
    question: 'What is React.js',
    incorrect_answers: ['Food', 'Dog', 'City'],
    correct_answer: 'JavaScript library'
  }
]

//Here I give initialState because it will get error question is undefined it the component
describe('<PlayingScreen />', () => {
  it('should render without error', async function () {
    await act(async function waitForTimer() {
      renderWithProvider(<PlayingScreen/>, {
        questions: {
          entities: [questions],
          status: IDLE
        }
      })
      jest.runAllTimers()
    })
  });
  it('should render question', async function () {
    let getByText;
    await act(async () => {
      ({getByText} = renderWithProvider(<PlayingScreen/>, {
        questions: {
          entities: [questions],
          status: IDLE
        }
      }))
      jest.runAllTimers()
    })
    const firstQuestion = mockResponseQuestion.results[0];
    getByText(decode(firstQuestion.question));
    getByText(decode(firstQuestion.correct_answer))
    for (let i = 0; i < firstQuestion.incorrect_answers.length; i++) {
      const incorrectAnswer = firstQuestion.incorrect_answers[i];
      getByText(decode(incorrectAnswer));
    }
  })
  it('should render currentIdx', async function () {
    let getByText;
    await act(async () => {
      ({getByText} = renderWithProvider(<PlayingScreen/>, {
        questions: {
          entities: [questions],
          status: IDLE
        }
      }))
      jest.runAllTimers()
    })
    const currentIdx = 1;
    const questionLength = mockResponseQuestion.results.length;
    getByText(new RegExp(`${currentIdx}/${questionLength }`, 'i'));
  });
  it('should render next question', async function () {
    let getByText, getByRole;
    await act(async () => {
      ({getByText, getByRole} = renderWithProvider(<PlayingScreen/>, {
        questions: {
          entities: [questions],
          status: IDLE
        }
      }))
      jest.runAllTimers()
    })
    const firstQuestion = mockResponseQuestion.results[0];
    const answerFirstQuestion = getByRole('button', {
      name:
        new RegExp(decode(firstQuestion.correct_answer), 'i')
    });
    userEvent.click(answerFirstQuestion);
    const secondQuestion = mockResponseQuestion.results[1];
    getByText(decode(secondQuestion.question));
    getByText(decode(secondQuestion.correct_answer));
    for (let i = 0; i < secondQuestion.incorrect_answers.length; i++) {
      const incorrectAnswer = secondQuestion.incorrect_answers[i];
      getByText(decode(incorrectAnswer))
    }
    //currentIdx should be 2
    getByText(new RegExp(`2/${mockResponseQuestion.results.length}`));
  });
})

function decode(str) {
  return new RegExp(decodeURIComponent(str), 'i');
}