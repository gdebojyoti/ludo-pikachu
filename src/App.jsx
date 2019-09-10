import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Ludo from './views/Ludo'
// import Test from './views/Test'

const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Ludo} />
      <Route exact path='/:matchId' component={Ludo} />
      {/* <Route exact path='/static' component={Test} /> */}
      {/* <Route exact path='/:id' component={Test} /> */}
    </Switch>
  </BrowserRouter>
}

export default App
