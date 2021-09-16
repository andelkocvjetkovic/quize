import React, {useState} from 'react';
import Modal from "../Modal/Modal";
import styles from './StartScreen.module.scss';
import Settings from "../Settings/Settings";
import {playGame} from "../../store/reducers/gameSlice";
import {useDispatch, useSelector} from "react-redux";
import {LOADING, selectLoadingStatus} from "../../store/reducers/loadingStatusSlice";
import StartGame from "../StartGame/StartGame";

export default function StartScreen() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  function toggleSettings() {
    setIsSettingsOpen(value => !value);
  }

  function closeModal() {
    setIsSettingsOpen(value => !value)
  }

  return (
    <div className={styles.Wrapper}>
      <StartGame />
      <button onClick={toggleSettings} className={styles.ButtonSettings}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem'}}
             fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
        </svg>
      </button>
      {isSettingsOpen && <Modal onClose={closeModal}><Settings onClose={closeModal}/></Modal>}
    </div>
  );
}
