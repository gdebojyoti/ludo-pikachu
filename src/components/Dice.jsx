import React from 'react'

import { triggerDiceRoll } from '../actions/socket'

const Dice = () => {
  return <button onClick={triggerDiceRoll}>Roll dice</button>
}

export default Dice