import React, {useState} from 'react';
import Modal from "../Modal/Modal";
import styles from './StartScreen.module.scss';
import Settings from "../Settings/Settings";
import {useDispatch, useSelector} from "react-redux";
import {selectQuestionStatus} from "../../store/reducers/questionsSlice";
import {LOADING} from "../../store/loadingEnum";
import {playGame} from "../../store/reducers/gameSlice";

export default function StartScreen() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const isLoading = useSelector(selectQuestionStatus) === LOADING;
  const dispatch = useDispatch();

  function toggleSettings() {
    setIsSettingsOpen(value => !value);
  }

  function closeModal() {
    setIsSettingsOpen(value => !value)
  }

  function startQuiz() {
    dispatch(playGame())
  }

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <h3 className={styles.Title}>Welcome to quizzzz</h3>
        <div className={styles.InnerWrapper}>
          <div className={styles.Description}>This is a quiz application built using ReactJS.</div>
          <button disabled={isLoading} onClick={startQuiz} className={styles.Button}>Start the quiz</button>
        </div>
      </div>
      <button onClick={toggleSettings} className={styles.ButtonSettings}>
        <svg aria-labelledby='settings' role='img' xmlns="http://www.w3.org/2000/svg"
             style={{width: '1.5rem', height: '1.5rem'}}
             fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <title id='settings'>Settings</title>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
        </svg>
      </button>
      {isSettingsOpen && <Modal onClose={closeModal}>
        <Settings onClose={closeModal}/>
      </Modal>}
    </div>
  );
}
