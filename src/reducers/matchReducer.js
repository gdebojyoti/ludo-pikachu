import initialState from './initialState'

export default function (state = initialState.match, action) {
  switch (action.type) {
    case 'SET_MATCH_ID': {
      const match = { ...state }
      match.id = action.payload

      return match
    }

    case 'UPDATE_MATCH_STATUS': {
      const match = { ...state }
      match.status = action.payload

      return match
    }

    case 'SET_MATCH_HOST': {
      const match = { ...state }
      match.host = action.payload

      return match
    }

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
