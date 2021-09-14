import React from 'react';
import styles from './QuestionText.module.scss';
export default function QuestionText({children}) {
  return (
    <p className={styles.Text}>
      {children}
    </p>
  );
}
