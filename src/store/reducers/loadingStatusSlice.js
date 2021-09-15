import {type} from "@testing-library/user-event/dist/type";

export const IDLE = 'idle';
export const LOADING = 'loading';
export const SUCCEEDED = 'succeeded';
export const FAILED = 'failed';


const STATUS_IDLE = 'loadingStatus/idle';
const STATUS_LOADING = 'loadingStatus/loading';
const STATUS_SUCCEEDED = 'loadingStatus/succeeded';
const STATUS_FAILED = 'loadingStatus/failed';

const initialState = {
  status: IDLE
}


export default function loadingStatusReducer(state = initialState,action) {
  switch (action.type) {
    case STATUS_IDLE: {
      return {
        status: IDLE
      }
    }
    case STATUS_LOADING: {
      return {
        status: LOADING
      }
    }
    case STATUS_SUCCEEDED: {
      return {
        status: SUCCEEDED
      }
    }
    case STATUS_FAILED: {
      return {
        status: FAILED
      }
    }
    default :{
      return state
    }
  }
}

export const selectLoadingStatus = state => state.loadingStatus.status;

export const setLoadingStatus = () => ({type: STATUS_LOADING});
export const setIdleStatus = () => ({type: STATUS_IDLE});
export const setSuccessStatus = () => ({type: STATUS_SUCCEEDED});