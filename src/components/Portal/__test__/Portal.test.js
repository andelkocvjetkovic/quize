import React from 'react'
import {render} from "@testing-library/react";
import Portal from "../Portal";

let rootModal;
beforeEach(() => {
  rootModal = document.createElement('div');
  rootModal.setAttribute('id', 'portal-root');
  document.body.appendChild(rootModal);
})
afterEach(() => {
  document.body.removeChild(rootModal);
})

describe('<Portal />', function portal() {
  it('should render without error', function () {
    render(<Portal/>)
  });
  it('should render children into portal', function () {
    const Modal = () => <div>I am modal</div>
    const {getByText} = render(<Portal><Modal/></Portal>);
    expect(getByText(/i am modal/i)).toBeInTheDocument();
  });
})