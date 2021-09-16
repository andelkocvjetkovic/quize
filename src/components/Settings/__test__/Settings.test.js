import React from 'react'
import {act, screen, waitFor} from "@testing-library/react";
import Settings, {DIFFICULTY} from "../Settings";
import 'regenerator-runtime/runtime'
import userEvent from "@testing-library/user-event";
import {renderWithProviders, dispatch} from "../../../../jest/renderWithProvider";
import {LOADING, setIdleStatus, setLoadingStatus} from "../../../store/reducers/loadingStatusSlice";
import {useDispatch} from "react-redux";
import {wait} from "@testing-library/user-event/dist/utils";


beforeEach(() => {
  jest.useFakeTimers();
  mockSuccessfulResponse();
})
afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers();
})

describe('<Settings />', () => {
  it('should render without error', async function () {
    await act(async () => {
      await renderWithProviders(<Settings/>);
    })
  })
  it('should render categories in the select options', async function () {
    let getByRole;
    await act(async () => {
      ({getByRole} = await renderWithProviders(<Settings/>));
      jest.runAllTimers();
    });

    const selectCategory = getByRole('combobox', {name: /select category/i});
    const children = selectCategory.children
    const mockData = mockResponse.trivia_categories;
    expect(children.length).toEqual(mockData.length + 1)
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (i === 0) {
        expect(child).toHaveValue('anyCategory');
        expect(child).toHaveTextContent(/any category/i);
      } else {
        expect(child).toHaveValue(mockData[i - 1].id.toString())
        expect(child).toHaveTextContent(mockData[i - 1].name)
      }
    }
  })
  it('should render difficulties in the select options', async function () {
    let getByRole;
    await act(async () => {
      ({getByRole} = await renderWithProviders(<Settings/>));
      jest.runAllTimers();
    });
    const selectDifficulty = getByRole('combobox', {name: /select difficulty/i})
    const children = selectDifficulty.children;
    expect(children.length).toEqual(DIFFICULTY.length + 1)
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (i === 0) {
        expect(child).toHaveValue('anyDifficulty');
        expect(child).toHaveTextContent(/any difficulty/i);
      } else {
        expect(child).toHaveValue(DIFFICULTY[i - 1]);
        expect(child).toHaveTextContent(new RegExp(DIFFICULTY[i - 1], 'i'))
      }
    }
  });
  it('should close settings on click save changes', async function () {
    let getByRole;
    let onClose = jest.fn();
    await act(async () => {
      ({getByRole} = await renderWithProviders(<Settings onClose={onClose}/>));
      jest.runAllTimers();
    });
    const submitButton = getByRole('button', {name: /save changes/i});
    userEvent.click(submitButton);
    expect(onClose).toBeCalledTimes(1);
  });
  it('should type amount of question,select category,select difficulty and click on save changes', async function () {
    let getByRole;
    let onClose = jest.fn();
    await act(async () => {
      ({getByRole} = await renderWithProviders(<Settings onClose={onClose}/>));
      jest.runAllTimers();
    });
    const amountInput = getByRole('spinbutton', {name: /number of question/i});
    const selectCategory = getByRole('combobox', {name: /select category/i});
    const selectDifficulty = getByRole('combobox', {name: /select difficulty/i})
    const submitButton = getByRole('button', {name: /save changes/i});

    userEvent.clear(amountInput);
    userEvent.type(amountInput, '20');
    expect(amountInput).toHaveValue(20);

    userEvent.selectOptions(selectCategory, mockResponse.trivia_categories[0].id.toString())
    expect(selectCategory).toHaveValue(mockResponse.trivia_categories[0].id.toString());
    expect(selectCategory).toHaveTextContent(mockResponse.trivia_categories[0].name);


    userEvent.selectOptions(selectDifficulty, DIFFICULTY[0]);
    expect(selectDifficulty).toHaveValue(DIFFICULTY[0]);
    expect(selectDifficulty).toHaveTextContent(DIFFICULTY[0]);

    userEvent.click(submitButton);
    expect(onClose).toBeCalledTimes(1);
  });
  it('save changes button should be disabled till fetching is done', async function () {
    let getByRole, queryByRole;
    let onClose = jest.fn();
    await act(async () => {
      ({getByRole, queryByRole} = await renderWithProviders(<Settings onClose={onClose}/>))
    });
    const saveChanges = getByRole('button', {name: /save changes/i});
    expect(saveChanges).toBeDisabled()
    await act(async () => {
      jest.runAllTimers();
    })
    expect(queryByRole('button', {name: /save changes/i})).not.toBeDisabled();


  });
})


const mockSuccessfulResponse = () => {
  global.fetch = jest.fn().mockImplementationOnce(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          status: 200,
          json: () => {
            return Promise.resolve(mockResponse)
          },
        });
      }, 2000)
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