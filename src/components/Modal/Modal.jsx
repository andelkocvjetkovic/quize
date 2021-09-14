import React, {useLayoutEffect} from 'react';
import styles from './Modal.module.scss';
import Portal from "../Portal/Portal";
import useScrollLock from "../../hooks/useScrollLock";

export default function Modal({children, onClose}) {
  function handleClick(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  useScrollLock();
  return (
    <Portal>
      <div data-testid='modal-wrapper' className={styles.Wrapper} onClick={handleClick}>
        <div data-testid='modal-container' className={styles.Modal}>
          {children}
        </div>
      </div>
    </Portal>
  );
}
