import React from "react";
import {render} from "@testing-library/react";

import PlayingScreen from "../PlayingScreen";
import userEvent from "@testing-library/user-event";
import {createStore} from "redux";



const questions = [
  {
    question: 'What is React.js',
    incorrect_answers: ['Food', 'Dog', 'City'],
    correct_answer: 'JavaScript library'
  }
]
describe('<PlayingScreen />', () => {
  it('should render without error', function () {
    render(<PlayingScreen questions={questions}/>)
  });
  it('should render question,currentIdx,questionLength', function () {
      const currentIdx = 1;
      const questionLength = 10;
      const mockAnswer = jest.fn();
      const {getByText} = render(<PlayingScreen
        questions={questions} />
    )
      getByText(new RegExp(questions[0].question, 'i'));
      getByText(new RegExp(`${currentIdx}/${questions.length}`, 'i'));
      userEvent.click(getByText(new RegExp(questions.correct_answer, 'i')));
      // expect(mockAnswer).toBeCalledTimes(1);
    }
  );
})