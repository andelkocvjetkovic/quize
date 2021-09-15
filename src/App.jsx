import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import QuestionMultiple from "./components/QuestionMultiple/QuestionMultiple";
import StartScreen from "./components/StartSceen/StartScreen";
import EndScreen from "./components/EndScreen/EndScreen";
import PlayingScreen from "./components/PlayingScreen/PlayingScreen";
import {useDispatch, useSelector} from "react-redux";
import {
  GAME_END,
  GAME_PLAYING,
  GAME_START,
  selectGameStatus,
} from "./store/reducers/gameSlice";
import {selectCurrentIdx} from "./store/reducers/currentIdxSlice";
import {ACTION_INCREMENT_IDX} from "./store/saga/sagas/watchIncrementIdx";
import {answerUserScore, selectUserScore} from "./store/reducers/userScoreSlice";
import {selectQuestions} from "./store/reducers/questionsSlice";

const gameState = ['start', 'playing', 'end'];
const START_URL = 'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986';

function App() {
  const gameStatus = useSelector(selectGameStatus);

  // const [appState, setAppState] = useState(() => gameState[0]);
  // const [questions, setQuestions] = useState([]);
  // const [currentIdx, setCurrentIdx] = useState(0);
  // const [userScore, setUserScore] = useState([])
  const [isPending, setIsPending] = useState(false);
  const [url, setUrl] = useState(() => START_URL);

  // useEffect(() => {
  //   if (gameStatus === GAME_START) {
  //     // fetchQuestions();
  //   }
  // }, [gameStatus]);
  useEffect(() => {
    if (url !== START_URL) {
      fetchQuestions();
    }
  }, [url])


  function fetchQuestions() {
    setIsPending(true);
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error(response.statusText)
        }
      })
      .then(data => {
        setQuestions(data.results);
      })
      .catch(console.error)
      .finally(() => setIsPending(false));
  }

  if (gameStatus === GAME_START) {
    return (<StartScreen isPending={isPending} setUrl={setUrl}/>)
  } else if (gameStatus === GAME_PLAYING) {
    return <PlayingScreen/>
  } else if (gameStatus === GAME_END) {
    return <EndScreen/>
  } else {
    return <div>Something went terribly wrong</div>
  }
}

export default App

