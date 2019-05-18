import initialState from './initialState'

export default function (state = initialState.match, action) {
  switch (action.type) {
    case 'UPDATE_LAST_ROLL': {
      const match = { ...state }
      const rolled = action.payload

      match.lastRoll = rolled

      return match
    }

    case 'UPDATE_NEXT_TURN': {
      const match = { ...state }
      const playerId = action.payload

      match.currentTurn = playerId

      return match
    }

    default:
      return state
  }
}
