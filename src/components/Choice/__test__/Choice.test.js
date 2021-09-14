import React from 'react'
import {render} from "@testing-library/react";
import Choice from "../Choice";
import userEvent from "@testing-library/user-event";

describe('<Choice />',() => {
  it('should render without error', function () {
    render(<Choice />)
  });
  it('should render answer and id', function () {
    const id = 'A';
    const answer = 'JavaScript Library'
    const {getByText} = render(<Choice id={id} children={answer} />);
    getByText(id)
    getByText(new RegExp(answer,'i'));
  });
  it('should answer on question when click on component', function () {
    const answerQuestionMock = jest.fn(answer => answer);
    const id = 'A';
    const answer = 'JavaScript Library'
    const {getByRole} = render(<Choice id={id} children={answer} answerQuestion={answerQuestionMock}/>);
    const btn = getByRole("button",{name: new RegExp(answer,'i')});
    userEvent.click(btn);
    expect(answerQuestionMock).toBeCalledTimes(1);
    expect(answerQuestionMock.mock.results[0].value).toBe(answer);
  });
})
