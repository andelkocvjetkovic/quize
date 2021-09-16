import React from 'react';
import styles from "./StartGame.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {LOADING, selectLoadingStatus} from "../../store/reducers/loadingStatusSlice";
import {playGame} from "../../store/reducers/gameSlice";

function StartGame() {
  const isLoading = useSelector(selectLoadingStatus) === LOADING;
  const dispatch = useDispatch();
  function startQuiz() {
    dispatch(playGame());
  }
  return (
    <div className={styles.Container}>
      <h3 className={styles.Title}>Welcome to Codepool quizzzz</h3>
      <div className={styles.InnerWrapper}>
        <div className={styles.Description}>This is a quiz application built using ReactJS.</div>
        <button disabled={isLoading} onClick={startQuiz} className={styles.Button}>Start the quiz</button>
      </div>
    </div>
  );
}

export default StartGame;