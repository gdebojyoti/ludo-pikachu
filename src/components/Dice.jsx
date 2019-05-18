import React from 'react'

import { triggerDiceRoll } from '../actions/socket'

import '../styles/components/dice'

const Dice = () => {
  const buttons = []
  for (let i = 1; i <= 6; i++) {
    buttons.push(<button key={i} onClick={() => triggerDiceRoll(i)}>Roll {i}</button>)
  }
  return <div className='dice-set'>
    {buttons.map(button => button)}
    {/* <button onClick={triggerDiceRoll}>Roll dice</button> */}
    <button className='dice' onClick={() => triggerDiceRoll()}>Roll Dice</button>
    <div className='roll-details'>deb rolled a 6</div>
  </div>
}

export default Dice
