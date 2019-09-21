import React, { useState, useEffect } from 'react'

import Die from './Die'
import { triggerDiceRoll } from '../actions/socket'

import '../styles/components/dice'

let timeout = null
let myAudio = null

const Dice = ({ match: { currentTurn, lastRoll }, profile: { id: playerId } }) => {
  const [isRolling, setIsRolling] = useState(false)
  useEffect(() => {
    if (lastRoll) {
      setIsRolling(false)
      timeout && clearTimeout(timeout)
      timeout = null
    }
  }, [lastRoll])

  useEffect(() => {
    myAudio = new window.Audio('https://www.debojyotighosh.com/assets/rollingDie.mp3') // TODO: A more permanent URL
  }, [])

  const buttons = []
  for (let i = 1; i <= 6; i++) {
    buttons.push(<button key={i} onClick={() => onClickDie(i)}>Roll {i}</button>)
  }

  const onClickDie = (n = 0) => {
    // play rolling die sound
    myAudio && myAudio.play()
    // die starts rolling animations
    setIsRolling(true)
    // let the die roll for at least 200ms
    setTimeout(() => triggerDiceRoll(n), 200)
    // force stop the die after 3s (required in case of unexpected error - die shouldn't be rolling endlessly)
    timeout = setTimeout(() => setIsRolling(false), 3000)
  }

  return <div className='dice-set'>
    {/* TODO: Remove these buttons once dev is complete */}
    {buttons.map(button => button)}

    <Die
      lastRoll={lastRoll}
      isRolling={isRolling}
      onClick={() => onClickDie(0)}
      isDisabled={playerId !== currentTurn || (!isRolling && lastRoll)}
    />

    <div className='roll-details'>
      {!!currentTurn && currentTurn === playerId && <div>Your turn!</div>}
      {!!currentTurn && currentTurn !== playerId && <div>Current turn: { currentTurn }</div>}
      {!!lastRoll && <div>Rolled a { lastRoll }</div>}
    </div>
  </div>
}

export default Dice
