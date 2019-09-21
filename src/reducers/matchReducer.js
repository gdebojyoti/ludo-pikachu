import initialState from './initialState'

export default function (state = initialState.match, action) {
  switch (action.type) {
    case 'SET_MATCH_ID': {
      const match = { ...state }
      match.id = action.payload

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

    case 'UPDATE_DICE_ROLLED': {
      const match = { ...state }
      match.isDiceRolled = action.payload

      return match
    }

    case 'UPDATE_MATCH_DATA': {
      const match = { ...state }
      const { id, currentTurn, hostId, lastRoll, status, isDiceRolled } = action.payload

      match.id = id
      match.currentTurn = currentTurn
      match.hostId = hostId
      match.lastRoll = lastRoll
      match.status = status
      match.isDiceRolled = isDiceRolled

      return match
    }

    default:
      return state
  }
}
