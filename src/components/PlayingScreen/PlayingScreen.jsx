import React from 'react';
import QuestionMultiple from "../QuestionMultiple/QuestionMultiple";
import styles from './PlayingScreen.module.scss';

export default function PlayingScreen({question, answerOnQuestion, questionsLength,currentQuestion}) {
  return (
    <div className={styles.Wrapper}>
      <QuestionMultiple question={decodeURIComponent(question.question)}
                        correctAnswer={decodeURIComponent(question.correct_answer)}
                        incorrectAnswers={question.incorrect_answers.map(q => decodeURIComponent(q))}
                        answerQuestion={answerOnQuestion}
      />
      <div className={styles.CurrentQuestion}>
        {currentQuestion}/{questionsLength}
      </div>
    </div>
  )
}
