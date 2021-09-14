import React from 'react'
import {render} from "@testing-library/react";
import QuestionMultiple from "../QuestionMultiple";

describe('<QuestionMultiple />',() => {
  it('should render without error', function () {
    render(<QuestionMultiple />)
  });
  it('should show question and anwsers',() => {
    const question = 'What is React.js';
    const incorrectAnswers = ['Food','Dog','City'];
    const correctAnswer = 'JavaScript library';
    const {getByText} = render(<QuestionMultiple question={question} correctAnswer={correctAnswer} incorrectAnswers={incorrectAnswers} />)
  })
})