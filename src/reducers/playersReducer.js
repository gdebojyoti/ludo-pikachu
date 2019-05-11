import initialState from './initialState'
import playerStatus from '../constants/playerStatus'

export default function (state = initialState.players, action) {
  switch (action.type) {
    // when a new player joins
    // payload: JSON data of new player
    case 'PLAYER_JOINED':
      const { id, name, home } = action.payload
      const players = { ...state }

      const homeId = ['red', 'blue', 'yellow', 'green'].indexOf(home) + 1

      players[id] = {
        name,
        home,
        coins: {
          alfa: `${homeId}01`,
          beta: `${homeId}02`,
          charlie: `${homeId}03`,
          delta: `${homeId}04`
        },
        status: playerStatus.LIVE
      }

      return players
    default:
      return state
  }
}
