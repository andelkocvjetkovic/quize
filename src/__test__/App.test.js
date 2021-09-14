import React from 'react';
import {render, act, screen} from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";


beforeEach(() => {
  mockSuccessfulResponse()
});

describe('<App />', () => {
  it('should render without error', async function () {
    await act(async () => {
      await render(<App/>);
    })
  })
  it('should render start screen, and play question one each after other and display end screen on the end', async function () {
    //should render start screen and click on btn quiz starts
    let getByText;
    await act(async () => {
      ({getByText} = await render(<App/>));
    })
    //when App start click button Start the quiz starts game
    const startButton = getByText(/start the quiz/i);
    userEvent.click(startButton);
    expect(startButton).not.toBeInTheDocument();

    // render first question from mockResponse data
    const firstQuestion = mockResponse.results[0];
    const answerBtnFirstQ = renderQuestion(firstQuestion, getByText);
    userEvent.click(answerBtnFirstQ)
    //render second question from mockResponse data
    const secondQuestion = mockResponse.results[1];
    const answerBtnSecQ = renderQuestion(secondQuestion, getByText);
    userEvent.click(answerBtnSecQ)


    //show end of game
    getByText(/End of the game/i)
    getByText(/play again/i);
    getByText(/correct 2/i);


  });
})

function renderQuestion(question, getByText) {
  const q = decodeURIComponent(question.question);
  //check if question is on screen
  getByText(new RegExp(q, 'i'));

  //make array of answers
  const answers = [decodeURIComponent(question.correct_answer), ...question.incorrect_answers.map(q => decodeURIComponent(q))];

  //correct is always on idx 0
  let buttonAnswer;
  //check if each answer is on the screen
  answers.forEach((answer, idx) => {
    const rgx = new RegExp(answer, 'i');
    if (idx === 0) {
      buttonAnswer = getByText(rgx)
    } else {
      getByText(rgx)
    }
  })
  //return answerButton so we can make click on it and show next answer if it is necessary
  return buttonAnswer
}

const mockSuccessfulResponse = () => {
  global.fetch = jest.fn().mockImplementationOnce(() => {
    return new Promise((resolve) => {
      resolve({
        ok: true,
        status: 200,
        json: () => {
          return Promise.resolve(mockResponse)
        },
      });
    });
  });
};

const mockResponse = {
  "response_code": 0,
  "results": [
    {
      "category": "Entertainment%3A%20Video%20Games",
      "type": "multiple",
      "difficulty": "medium",
      "question": "When%20Halo%203%3A%20ODST%20was%20unveiled%20in%202008%2C%20it%20had%20a%20different%20title.%20What%20was%20the%20game%20formally%20called%3F",
      "correct_answer": "Halo%203%3A%20Recon",
      "incorrect_answers": [
        "Halo%203%3A%20Helljumpers",
        "Halo%203%3A%20Phantom",
        "Halo%203%3A%20Guerilla"
      ]
    },
    {
      "category": "Entertainment%3A%20Video%20Games",
      "type": "multiple",
      "difficulty": "easy",
      "question": "Who%20is%20the%20main%20antagonist%20in%20the%20Portal%20franchise%3F",
      "correct_answer": "GLaDOS",
      "incorrect_answers": [
        "Chell",
        "Wheatley",
        "Rick"
      ]
    },
  ]
}