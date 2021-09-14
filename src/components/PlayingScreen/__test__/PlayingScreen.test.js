import React from "react";
import {render} from "@testing-library/react";
import PlayingScreen from "../PlayingScreen";
import userEvent from "@testing-library/user-event";

const question = {
  question: 'What is React.js',
  incorrect_answers: ['Food', 'Dog', 'City'],
  correct_answer: 'JavaScript library'
}
describe('<PlayingScreen />', () => {
  it('should render without error', function () {
    render(<PlayingScreen question={question}/>)
  });
  it('should render question,currentIdx,questionLength', function () {
      const currentIdx = 1;
      const questionLength = 10;
      const mockAnswer = jest.fn();
      const {getByText} = render(<PlayingScreen
        question={question}
        questionsLength={questionLength}
        currentQuestion={currentIdx}
        answerOnQuestion={mockAnswer}/>)

      getByText(new RegExp(question.question, 'i'));
      getByText(new RegExp(`${currentIdx}/${10}`, 'i'));
      userEvent.click(getByText(new RegExp(question.correct_answer, 'i')));
      expect(mockAnswer).toBeCalledTimes(1);
    }
  );
})