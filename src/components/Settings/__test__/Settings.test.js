import React from 'react'
import {render, act} from "@testing-library/react";
import Settings, {DIFFICULTY} from "../Settings";
import 'regenerator-runtime/runtime'
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  mockSuccessfulResponse()
});
describe('<Settings />', () => {
  it('should render without error', async function () {
    await act(async () => {
      await render(<Settings/>);
    })
  })
  it('should fetch data for category and show it on select category', async function () {
    let getByRole;
    await act(async () => {
      ({getByRole} = await render(<Settings/>));
    });
    const selectCategory = getByRole('combobox',{name: /select category/i});
    expect(selectCategory).toHaveTextContent(/any category/i);
    expect(selectCategory.firstChild).toHaveValue('anyCategory');
    expect(selectCategory.firstChild).toHaveTextContent(/any category/i);
    const children = selectCategory.children;
    const mockData = mockResponse.trivia_categories;
    for (let i = 1; i < children.length; i++) {
     const child = children[i];
      expect(child).toHaveValue(mockData[i-1].id.toString())
      expect(child).toHaveTextContent(mockData[i-1].name)
    }
  })
  it('should show difficulty',async function () {
    let getByRole;
    await act(async () => {
      ({getByRole} = await render(<Settings/>));
    });
    const selectDifficulty = getByRole('combobox',{name: /select difficulty/i})
    expect(selectDifficulty).toHaveTextContent(/any difficulty/i);
    expect(selectDifficulty.firstChild).toHaveValue('anyDifficulty');
    expect(selectDifficulty.firstChild).toHaveTextContent(/any difficulty/i);

    const children = selectDifficulty.children;
    for (let i = 1; i < children.length; i++) {
      const child = children[i];
      expect(child).toHaveValue(DIFFICULTY[i-1]);
      expect(child).toHaveTextContent(new RegExp(DIFFICULTY[i-1],'i'))
    }
  });
  it('should saveChanges on click submit buttons and close modal',async function () {
    let getByRole;
    let onClose = jest.fn();
    let setUrl = jest.fn();
    await act(async () => {
      ({getByRole} = await render(<Settings onClose={onClose} setUrl={setUrl}/>));
    });
    const submitButton = getByRole('button',{name: /save changes/i});
    userEvent.click(submitButton);
    expect(onClose).toBeCalledTimes(1);
    expect(setUrl).toBeCalledTimes(1);
  });
  it('big test amount of question,select category,select difficulty and submit form', async function () {
    let getByRole;
    let onClose = jest.fn();
    let setUrl = jest.fn();
    await act(async () => {
      ({getByRole} = await render(<Settings onClose={onClose} setUrl={setUrl}/>));
    });
    const amountInput = getByRole('spinbutton',{name: /number of question/i});
    const selectCategory = getByRole('combobox',{name: /select category/i});
    const selectDifficulty = getByRole('combobox',{name: /select difficulty/i})
    const submitButton = getByRole('button',{name: /save changes/i});

    userEvent.clear(amountInput);
    userEvent.type(amountInput,'20');
    expect(amountInput).toHaveValue(20);

    userEvent.selectOptions(selectCategory,mockResponse.trivia_categories[0].id.toString())
    expect(selectCategory).toHaveValue(mockResponse.trivia_categories[0].id.toString());
    expect(selectCategory).toHaveTextContent(mockResponse.trivia_categories[0].name);


    userEvent.selectOptions(selectDifficulty,DIFFICULTY[0]);
    expect(selectDifficulty).toHaveValue(DIFFICULTY[0]);
    expect(selectDifficulty).toHaveTextContent(DIFFICULTY[0]);

    userEvent.click(submitButton);
    expect(setUrl).toBeCalledTimes(1);
    expect(onClose).toBeCalledTimes(1);
  });
})

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
  "trivia_categories": [
    {
      "id": 9,
      "name": "General Knowledge"
    },
    {
      "id": 10,
      "name": "Entertainment: Books"
    },
    {
      "id": 11,
      "name": "Entertainment: Film"
    },
    {
      "id": 12,
      "name": "Entertainment: Music"
    }
  ]
}