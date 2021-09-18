import React from 'react';
import QuestionMultiple from "../QuestionMultiple/QuestionMultiple";
import styles from './PlayingScreen.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentQuestion} from "../../store/reducers/questionsSlice";
import Position from "../Position/Position";
import {ACTION_USER_SCORE} from "../../store/saga/sagas/watchUserScore";

export default function PlayingScreen({answerOnQuestion}) {
  const question = useSelector(selectCurrentQuestion);
  const dispatch = useDispatch();
  function answerQuestion(answer) {
    const correctAnswer = decodeURIComponent(question.correct_answer);
    dispatch(ACTION_USER_SCORE(correctAnswer === answer));
  }

  return (
    <div className={styles.Wrapper}>
      <QuestionMultiple question={question.question}
                        correctAnswer={question.correct_answer}
                        incorrectAnswers={question.incorrect_answers}
                        answerQuestion={answerQuestion}
      />
      <Position className={styles.Position}/>
    </div>
  )
}
