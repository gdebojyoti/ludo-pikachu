import { combineReducers } from 'redux'

import players from './playersReducer'
import profile from './profileReducer'
import cells from './cellsReducer'
import match from './matchReducer'
import network from './networkReducer'

const rootReducer = combineReducers({
  players,
  profile,
  cells,
  match,
  network
})

export default rootReducer
