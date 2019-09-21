import React from 'react'

import { onSelectCoin } from '../actions/socket'

import '../styles/components/coin'

// id = 'alfa', etc
// color = 'red'
// position = cell ID

// shouldPulse = true, when coin is selectable
const Coin = ({ id, position, color, isPlayers, isActive, shouldPulse }) => {
  const elm = document.getElementById(position)
  const style = {}

  const coinSize = 20

  if (elm) {
    const { x, y, width, height } = elm.getBoundingClientRect() || {}
    style.transform = `translate(${x + (width - coinSize) / 2}px, ${y + (height - coinSize) / 2}px) ${isActive ? 'scale(1.3)' : ''}`
  }

  return <div className={`coin coin--${color} ${!isPlayers && `coin--disabled`}`} id='coin' style={style} onClick={() => onSelectCoin(id)}>
    <div className={`coin__internal coin__internal--${color} ${shouldPulse && `coin__internal--pulse`}`} />
  </div>
}

export default Coin
