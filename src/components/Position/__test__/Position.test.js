import React from 'react';
import renderWithProvider from "../../../../jest/renderWithProvider";
import Position from "../Position";
import {mockFetch} from "../../../../jest/mocks/mockFetch";
import 'regenerator-runtime/runtime'
import {act, getByText} from "@testing-library/react";

beforeEach(() => {
  jest.useFakeTimers();
  mockFetch();
})
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
})
describe('<Position />', () => {
  it('should render without error', function () {
    renderWithProvider(<Position/>)
  });
  it('should render current idx and question length', async () => {
    let getByText;
    await act(async () => {
      ({getByText} = renderWithProvider(<Position/>))
      jest.runAllTimers();
    });
    getByText(/1\/10/i);
  })
})