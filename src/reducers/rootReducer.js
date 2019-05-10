import { combineReducers } from 'redux'

import players from './playersReducer'

const rootReducer = combineReducers({
  players
})

export default rootReducer
