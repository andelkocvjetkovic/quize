import React, {useEffect, useState} from 'react';

import styles from './Settings.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {ACTION_UPDATE_API} from "../../store/saga/sagas/watchApiChange";
import {LOADING, selectLoadingStatus, setIdleStatus, setLoadingStatus} from "../../store/reducers/loadingStatusSlice";

const CATEGORY_LINK = 'https://opentdb.com/api_category.php';
const NUMBER_OF_QUESTION = 'amount';
const SELECT_CATEGORY = 'selectCategory'
const SELECT_DIFFICULTY = 'selectDifficulty';
export const DIFFICULTY = ['easy', 'medium', 'hard']


export default function Settings({onClose}) {
  const [categoryList, setCategoryList] = useState([]);
  const isLoading = useSelector(selectLoadingStatus) === LOADING;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoadingStatus());
    fetch(CATEGORY_LINK)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then(data => {
        setCategoryList(data.trivia_categories);
      })
      .catch(console.log)
      .finally(() => {
        dispatch(setIdleStatus());
      })
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    const formData = e.target.elements;
    const amount = formData[NUMBER_OF_QUESTION].value;
    const category = formData[SELECT_CATEGORY].value;
    const difficulty = formData[SELECT_DIFFICULTY].value;
    const uri = [];
    if (category !== 'anyCategory') {
      uri.push(`category=${encodeURIComponent(category)}`);
    }
    if (difficulty !== 'anyDifficulty') {
      uri.push(`difficulty=${encodeURIComponent(difficulty)}`);
    }
    uri.push(`amount=${amount}`);
    dispatch(ACTION_UPDATE_API(uri));
    onClose();
  }

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <div className={styles.WrapperInput}>
        <label htmlFor={NUMBER_OF_QUESTION}>Number of question</label>
        <input className={styles.Input} defaultValue={10} id={NUMBER_OF_QUESTION} name={NUMBER_OF_QUESTION}
               type='number' step={1} min={10} max={25}/>
      </div>
      <div className={styles.WrapperInput}>
        <label htmlFor={SELECT_CATEGORY}>Select category</label>
        <select className={styles.Input} name={SELECT_CATEGORY} id={SELECT_CATEGORY}>
          <option key='anyCategory' value='anyCategory'>Any category</option>
          {categoryList.length > 0 && categoryList.map(cat => {
            return <option key={cat.id} value={cat.id}>{cat.name}</option>
          })}
        </select>
      </div>
      <div className={styles.WrapperInput}>
        <label htmlFor={SELECT_DIFFICULTY}>Select difficulty</label>
        <select className={styles.Input} name={SELECT_DIFFICULTY} id={SELECT_DIFFICULTY}>
          <option key='anyDifficulty' value='anyDifficulty'>Any Difficulty</option>
          {DIFFICULTY.map((d, idx) => <option key={idx} value={d}>{d}</option>)}
        </select>
      </div>
      <button disabled={isLoading} className={styles.Submit} type='submit'>Save changes</button>
    </form>
  );
}
