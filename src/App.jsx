import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Game from './views/Game'
import Test from './views/Test'

const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Game} />
      <Route exact path='/static' component={Test} />
      <Route exact path='/:id' component={Test} />
    </Switch>
  </BrowserRouter>
}

export default App
