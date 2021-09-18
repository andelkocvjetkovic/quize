import React from 'react';

import styles from './Settings.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {ACTION_UPDATE_API} from "../../store/saga/sagas/watchApiChange";
import {selectCategories, selectCategoriesStatus} from "../../store/reducers/categoriesSlice";
import {LOADING} from "../../store/loadingEnum";


const NUMBER_OF_QUESTION = 'amount';
const SELECT_CATEGORY = 'selectCategory'
const SELECT_DIFFICULTY = 'selectDifficulty';
export const DIFFICULTY = ['easy', 'medium', 'hard']


export default function Settings({onClose}) {
  const categoryList = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesStatus) === LOADING;
  const dispatch = useDispatch();


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
