import React from 'react'
import {act} from "@testing-library/react";
import Settings, {DIFFICULTY} from "../Settings";
import 'regenerator-runtime/runtime'
import userEvent from "@testing-library/user-event";
import renderWithProvider from "../../../../jest/renderWithProvider";
import {mockResponseCategory} from "../../../../jest/mocks/responseMock";
import {mockFetch} from "../../../../jest/mocks/mockFetch";

beforeEach(() => {
  mockFetch();
  jest.useFakeTimers();
})
afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers();
})



describe('<Settings />', () => {
  it('should render without error', async function () {
    await act(async () => {
      await renderWithProvider(<Settings/>);
      jest.runAllTimers();
    })
  })
  it('should render categories in the select options', async function () {
    let getByRole;
    await act(async () => {
      ({getByRole} = await renderWithProvider(<Settings/>));
      jest.runAllTimers();
    });

    const selectCategory = getByRole('combobox', {name: /select category/i});
    const children = selectCategory.children
    const mockData = mockResponseCategory.trivia_categories;
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
      ({getByRole} = await renderWithProvider(<Settings/>));
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
      ({getByRole} = await renderWithProvider(<Settings onClose={onClose}/>));
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
      ({getByRole} = await renderWithProvider(<Settings onClose={onClose}/>));
      jest.runAllTimers();
    });
    const amountInput = getByRole('spinbutton', {name: /number of question/i});
    const selectCategory = getByRole('combobox', {name: /select category/i});
    const selectDifficulty = getByRole('combobox', {name: /select difficulty/i})
    const submitButton = getByRole('button', {name: /save changes/i});

    userEvent.clear(amountInput);
    userEvent.type(amountInput, '20');
    expect(amountInput).toHaveValue(20);

    userEvent.selectOptions(selectCategory, mockResponseCategory.trivia_categories[0].id.toString())
    expect(selectCategory).toHaveValue(mockResponseCategory.trivia_categories[0].id.toString());
    expect(selectCategory).toHaveTextContent(mockResponseCategory.trivia_categories[0].name);


    userEvent.selectOptions(selectDifficulty, DIFFICULTY[0]);
    expect(selectDifficulty).toHaveValue(DIFFICULTY[0]);
    expect(selectDifficulty).toHaveTextContent(DIFFICULTY[0]);

    userEvent.click(submitButton);
    expect(onClose).toBeCalledTimes(1);
  });
  it('save changes button should be disabled till fetching is done', async function () {
    let getByRole;
    let onClose = jest.fn();
    await act(async () => {
      ({getByRole} = await renderWithProvider(<Settings onClose={onClose}/>))
    });
    const saveChanges = getByRole('button', {name: /save changes/i});
    expect(saveChanges).toBeDisabled()
    await act(async () => {
      jest.runAllTimers();
    })
    expect(getByRole('button', {name: /save changes/i})).not.toBeDisabled();
  });
})


