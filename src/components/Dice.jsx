import React, { Fragment } from 'react'

import { triggerDiceRoll } from '../actions/socket'

import '../styles/components/dice'

const Dice = ({ match: { currentTurn, lastRoll } }) => {
  const buttons = []
  for (let i = 1; i <= 6; i++) {
    buttons.push(<button key={i} onClick={() => triggerDiceRoll(i)}>Roll {i}</button>)
  }
  return <div className='dice-set'>
    {buttons.map(button => button)}
    {/* <button onClick={triggerDiceRoll}>Roll dice</button> */}
    <button className='dice' onClick={() => triggerDiceRoll()}>Roll Dice</button>
    <div className='roll-details'>
      {!!lastRoll && <Fragment>Rolled a { lastRoll }</Fragment>}
      {/* {!!currentTurn && <Fragment>Current turn: { currentTurn }</Fragment>} */}
    </div>
  </div>
}

export default Dice
