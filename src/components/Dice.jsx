import React, { Fragment } from 'react'

import { triggerDiceRoll } from '../actions/socket'

const Dice = () => {
  const buttons = []
  for (let i = 1; i <= 6; i++) {
    buttons.push(<button key={i} onClick={() => triggerDiceRoll(i)}>Roll {i}</button>)
  }
  return <Fragment>
    {buttons.map(button => button)}
    {/* <button onClick={triggerDiceRoll}>Roll dice</button> */}
  </Fragment>
}

export default Dice
