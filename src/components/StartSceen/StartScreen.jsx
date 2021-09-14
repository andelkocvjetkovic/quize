import React, {useState} from 'react';
import Modal from "../Modal/Modal";
import styles from './StartSceen.module.scss';
import Settings from "../Settings/Settings";

export default function StartScreen({startQuiz, isPending, setUrl}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  function toggleSettings() {
    setIsSettingsOpen(value => !value);
  }

  function closeModal() {
    setIsSettingsOpen(value => !value)
  }

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <h3 className={styles.Title}>Welcome to Codepool quizzzz</h3>
        <div className={styles.InnerWrapper}>
          <div className={styles.Description}>This is a quiz application built using ReactJS.</div>
          <button disabled={isPending} onClick={startQuiz} className={styles.Button}>Start the quiz</button>
        </div>
      </div>
      <button onClick={toggleSettings} className={styles.ButtonSettings}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem'}}
             fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
        </svg>
      </button>
      {isSettingsOpen && <Modal onClose={closeModal}><Settings setUrl={setUrl} onClose={closeModal}/></Modal>}
    </div>
  );
}
