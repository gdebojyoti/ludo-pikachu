import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/rootReducer'

export default function configureStore () {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  window.__STATE__ = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ))

  return window.__STATE__
}
