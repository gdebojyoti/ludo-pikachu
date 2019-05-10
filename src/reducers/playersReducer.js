import initialState from './initialState'
import playerStatus from '../constants/playerStatus'

export default function (state = initialState.players, action) {
  switch (action.type) {
    // when a new player joins
    // payload: JSON data of new player
    case 'PLAYER_JOINED':
      const { id, name, home } = action.payload
      const players = { ...state }

      players[id] = {
        name,
        home,
        coins: {
          alfa: 0,
          beta: 0,
          charlie: 0,
          delta: 0
        },
        status: playerStatus.LIVE
      }

      return players
    default:
      return state
  }
}
