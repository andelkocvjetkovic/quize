import React from 'react';
import QuestionMultiple from "../QuestionMultiple/QuestionMultiple";
import styles from './PlayingScreen.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentIdx} from "../../store/reducers/currentIdxSlice";
import {ACTION_USER_SCORE} from "../../store/saga/sagas/watchUserScore";
import {selectQuestions} from "../../store/reducers/questionsSlice";

export default function PlayingScreen() {
  const dispatch = useDispatch();
  const currentIdx = useSelector(selectCurrentIdx);
  const questions = useSelector(selectQuestions);

  function answerQuestion(answer) {
    const correctAnswer = decodeURIComponent(questions[currentIdx].correct_answer);
    dispatch(ACTION_USER_SCORE(correctAnswer === answer))
  }

  return (
    <div className={styles.Wrapper}>
      <QuestionMultiple question={questions[currentIdx].question}
                        correctAnswer={questions[currentIdx].correct_answer}
                        incorrectAnswers={questions[currentIdx].incorrect_answers}
                        answerQuestion={answerQuestion}
      />
      <div className={styles.CurrentQuestion}>
        {currentIdx + 1}/{questions.length}
      </div>
    </div>
  )
}
