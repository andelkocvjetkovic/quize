import React, {useState} from 'react';
import styles from './QuestionMultiple.module.scss';
import QuestionText from "../QuestionText/QuestionText";
import Choice from "../Choice/Choice";

const numToAbcd = ['A', 'B', 'C', 'D'];


export default function QuestionMultiple({question = '', correctAnswer = '', incorrectAnswers = [], answerQuestion}) {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <QuestionText>{question}</QuestionText>
        <div className={styles.ButtonWrapper}>
          {shuffle([...incorrectAnswers, correctAnswer]).map((answer, idx) => {
            return <Choice key={idx} id={numToAbcd[idx]} answerQuestion={answerQuestion}>{answer.toString()}</Choice>
          })}
        </div>
      </div>
    </div>
  );
}

function shuffle(array) {
  let arr = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
