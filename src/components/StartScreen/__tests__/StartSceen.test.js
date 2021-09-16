import React from 'react'

import StartScreen from "../StartScreen";
import {render} from "@testing-library/react";


describe('<StartScreen />',() => {
  it('should render without error', function () {

    render(<StartScreen />)
  });
})


