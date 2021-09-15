const initialState = {
  idx: 0
}
export default function currentIdxSlice(state = initialState, action) {
  switch (action.type) {
    case 'currentIdx/incremented': {
      return {
        idx: state.idx + 1
      }
    }
    case 'currentIdx/reset': {
      return {idx: 0}
    }
    default: {
      return state
    }
  }
}
export const selectCurrentIdx = state => state.currentIdx.idx;

export const incrementIdx = () => ({type: 'currentIdx/incremented'});
export const resetIdx = () => ({type: 'currentIdx/reset'})


