import React from 'react'
import StartScreen from "./components/StartScreen/StartScreen";
import EndScreen from "./components/EndScreen/EndScreen";
import PlayingScreen from "./components/PlayingScreen/PlayingScreen";
import {useDispatch, useSelector} from "react-redux";
import {GAME_END, GAME_PLAYING, GAME_START, playGame, selectGameStatus, startGame,} from "./store/reducers/gameSlice";
import {ACTION_PLAY_AGAIN} from "./store/saga/sagas/watchPlayAgain";
import {ACTION_USER_SCORE} from "./store/saga/sagas/watchUserScore";


function App() {
  const gameStatus = useSelector(selectGameStatus);
  const dispatch = useDispatch();



  if (gameStatus === GAME_START) {
    return (<StartScreen startQuiz={() => dispatch(playGame())}/>)
  } else if (gameStatus === GAME_PLAYING) {
    return <PlayingScreen/>
  } else if (gameStatus === GAME_END) {
    return <EndScreen playAgain={() => dispatch(ACTION_PLAY_AGAIN())}/>
  } else {
    return <div>Something went terribly wrong</div>
  }
}

export default App

