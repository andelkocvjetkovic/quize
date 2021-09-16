import React from 'react'
import StartScreen from "./components/StartScreen/StartScreen";
import EndScreen from "./components/EndScreen/EndScreen";
import PlayingScreen from "./components/PlayingScreen/PlayingScreen";
import {useSelector} from "react-redux";
import {GAME_END, GAME_PLAYING, GAME_START, selectGameStatus,} from "./store/reducers/gameSlice";


function App() {
  const gameStatus = useSelector(selectGameStatus);

  if (gameStatus === GAME_START) {
    return (<StartScreen/>)
  } else if (gameStatus === GAME_PLAYING) {
    return <PlayingScreen/>
  } else if (gameStatus === GAME_END) {
    return <EndScreen/>
  } else {
    return <div>Something went terribly wrong</div>
  }
}

export default App

