import React from 'react'
import {render} from "@testing-library/react";
import Modal from "../Modal";
import userEvent from "@testing-library/user-event";


beforeEach(() => {
  const rootModal = document.createElement('div');
  rootModal.setAttribute('id', 'portal-root');
  document.body.appendChild(rootModal);
  global.scrollTo = jest.fn()
})


describe('<Modal />',() => {
  it('should render without error', function () {
    render(<Modal />)
  });
  it('should render children props', function () {

    const onClose = jest.fn();
    const children = <div>Hello from modal <button onClick={onClose}>Close me</button></div>;
    const {getByText} =  render(<Modal children={children} /> )
    getByText(/hello from modal/i)
    const closeMeBtn = getByText(/close me/i);
    userEvent.click(closeMeBtn);
    expect(onClose).toBeCalledTimes(1);
  });
  it('should close modal on click outside', function () {
    const onClose = jest.fn();
    const children = <div>Hello from modal<button onClick={onClose}>Close me</button></div>
    const {getByTestId} = render(<Modal onClose={onClose} children={children}/>)
    const wrapper = getByTestId('modal-wrapper');
    userEvent.click(wrapper);
    expect(onClose).toBeCalledTimes(1);
  });
  it('should close modal on click button Close me', function () {
    const onClose = jest.fn();
    const children = <div>Hello from modal<button onClick={onClose}>Close me</button></div>
    const {getByText} = render(<Modal onClose={onClose} children={children}/>)
    const closeButton = getByText(/close me/i);
    userEvent.click(closeButton);
    expect(onClose).toBeCalledTimes(1);
  });
  it('should not close modal on click on modal-container', function () {
    const onClose = jest.fn();
    const children = <div>Hello from modal<button onClick={onClose}>Close me</button></div>
    const {getByTestId} = render(<Modal onClose={onClose} children={children}/>)
    const container = getByTestId('modal-container');
    userEvent.click(container);
    expect(onClose).toBeCalledTimes(0)
  });
})