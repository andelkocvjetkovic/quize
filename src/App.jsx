import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import QuestionMultiple from "./components/QuestionMultiple/QuestionMultiple";
import StartScreen from "./components/StartSceen/StartScreen";
import EndScreen from "./components/EndScreen/EndScreen";
import PlayingScreen from "./components/PlayingScreen/PlayingScreen";

const gameState = ['start', 'playing', 'end'];
const START_URL = 'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986';

function App() {
  const [appState, setAppState] = useState(() => gameState[0]);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userScore, setUserScore] = useState([])
  const [isPending, setIsPending] = useState(false);
  const [url, setUrl] = useState(() => START_URL);
  useLayoutEffect(() => {
    //if it is 0 no need to increase currentIdx
    if (userScore.length !== 0) {
      setCurrentIdx(idx => {
        const newIdx = idx + 1;
        if (newIdx === questions.length) {
          //game ends because no more question to answer
          setAppState(gameState[2]);
          //restart currentIdx
          return 0
        }
        return newIdx;
      })
    }
  }, [userScore]);
  useEffect(() => {
    if (appState === gameState[0]) {
      fetchQuestions();
    }
  }, [appState]);
  useEffect(() => {
    if (url !== START_URL) {
      fetchQuestions();
    }
  }, [url])

  function answerQuestion(answer) {
    //get user question
    const correctAnswer = decodeURIComponent(questions[currentIdx].correct_answer);
    setUserScore(userAnswers => [...userAnswers, answer === correctAnswer])
  }

  function startQuiz() {
    setAppState(gameState[1]);
  }

  function playAgain() {
    //goto start screen
    setAppState(gameState[0])
    setUserScore([]);
  }

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

  if (appState === gameState[0]) {
    return (<StartScreen startQuiz={startQuiz} isPending={isPending} setUrl={setUrl}/>)
  } else if (appState === gameState[1]) {
    return <PlayingScreen
      key={questions[currentIdx].question.slice(0, 10)}
      question={questions[currentIdx]}
      answerOnQuestion={answerQuestion}
      questionsLength={questions.length}
      currentQuestion={currentIdx + 1}
    />
  } else if (appState === gameState[2]) {
    return <EndScreen score={userScore} playAgain={playAgain}/>
  } else {
    return <div>Something went terribly wrong</div>
  }
}

export default App

