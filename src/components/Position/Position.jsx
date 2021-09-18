import React from 'react';
import styles from "./Position.module.scss";
import {useSelector} from "react-redux";
import {selectCurrentIdx} from "../../store/reducers/currentIdxSlice";
import {selectQuestions} from "../../store/reducers/questionsSlice";

function Position(props) {
  const currentIdx = useSelector(selectCurrentIdx);
  const questionLength = useSelector(selectQuestions).length;
  return (
    <div className={styles.Position} {...props}>
      {currentIdx + 1}/{questionLength}
    </div>
  );
}

export default Position;