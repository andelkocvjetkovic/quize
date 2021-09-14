import React from 'react';
import styles from './Choice.module.scss';
export default function Choice({id,answerQuestion,children}) {
  function answerOn() {
    answerQuestion(children);
  }
  return (
    <button onClick={answerOn} className={styles.Wrapper}>
      <span className={styles.ID}>{id}</span>
      <span className={styles.Answer}>{children}</span>
    </button>
  );
}
