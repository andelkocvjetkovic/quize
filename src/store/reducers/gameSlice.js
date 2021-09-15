export const GAME_START = 'start'
export const GAME_PLAYING = 'playing'
export const GAME_END = 'end'

const initialState = {
  status: GAME_START,
}

export default function gameSlice(state = initialState, action) {
  switch (action.type) {
    case 'game/started': {
      return {...state, status: GAME_START}
    }
    case 'game/playing': {
      return {...state, status: GAME_PLAYING}
    }
    case 'game/ended': {
      return {...state, status: GAME_END}
    }
    default : {
      return state
    }

  }
}

export const selectGameStatus = state => state.game.status;
export const startGame = () => ({type: 'game/started'});
export const playGame = () => ({type: 'game/playing'});
export const endGame = () => ({type: 'game/ended'});

