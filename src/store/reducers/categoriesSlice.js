import {IDLE, LOADING} from "../loadingEnum";


const initialState = {
  entities: [],
  status: IDLE,
}
const CATEGORIES_SET = 'categories/set'
const CATEGORIES_LOADING = 'categories/loading';
export function categoriesReducer(state = initialState,action) {
  switch (action.type) {
    case CATEGORIES_SET: {
      return {
        ...state,
        status: IDLE,
        entities: action.payload
      }
    }
    case CATEGORIES_LOADING: {
      return {
        ...state,
        status: LOADING,
      }
    }
    default: {
      return state;
    }
  }
}


export const selectCategories = state => state.categories.entities;
export const selectCategoriesStatus = state => state.categories.status;

export const setCategories = (categories) => ({type: CATEGORIES_SET,payload: categories})
export const categoriesLoading = () => ({type: CATEGORIES_LOADING});