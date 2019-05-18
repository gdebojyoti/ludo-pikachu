import { combineReducers } from 'redux'

import players from './playersReducer'
import profile from './profileReducer'
import cells from './cellsReducer'
import match from './matchReducer'

const rootReducer = combineReducers({
  players,
  profile,
  cells,
  match
})

export default rootReducer
