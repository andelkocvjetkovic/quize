import React from 'react';
import styles from './EndScreen.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {selectUserScore} from "../../store/reducers/userScoreSlice";
import {startGame} from "../../store/reducers/gameSlice";
import {ACTION_PLAY_AGAIN} from "../../store/saga/sagas/watchPlayAgain";


export default function EndScreen() {
  const score = useSelector(selectUserScore);
  const dispatch = useDispatch();
  function playAgain() {
      dispatch(ACTION_PLAY_AGAIN());
  }
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <h1 className={styles.EndOfGame}>End of the game</h1>
        <div>
          <h2 className={styles.ScoreTitle}>Your Score:</h2>
          <div className={styles.ScoreWrapper}>
            <div className={styles.Correct}>
              Correct {score.filter(Boolean).length}
            </div>
            <div className={styles.Wrong}>
              Wrong {score.filter((x) => !Boolean(x)).length}
            </div>
          </div>
        </div>
        <button className={styles.Button} onClick={playAgain}>Play again</button>
      </div>
    </div>
  );
}
