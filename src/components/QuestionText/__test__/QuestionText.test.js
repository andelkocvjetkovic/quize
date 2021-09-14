import React from 'react'
import {render} from "@testing-library/react";
import QuestionText from "../QuestionText";

describe('<QuestionText />',() => {
  it('should render without error', function () {
    render(<QuestionText />)
  });
  it('should show question',() => {
    const question = 'What is react ?';
    const {getByText} = render(<QuestionText children={question}/>);
    getByText(new RegExp(question,'i'));
  })
})