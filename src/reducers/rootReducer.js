import { combineReducers } from 'redux'

import players from './playersReducer'
import profile from './profileReducer'
import cells from './cellsReducer'

const rootReducer = combineReducers({
  players,
  profile,
  cells
})

export default rootReducer
