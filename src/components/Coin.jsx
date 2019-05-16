import React from 'react'

import { onSelectCoin } from '../actions/socket'

import '../styles/components/coin'

// id = 'alfa', etc
// color = 'red'
// position = cell ID
const Coin = ({ id, position, color, isActive }) => {
  const elm = document.getElementById(position)
  const style = {}

  const coinSize = 30

  if (elm) {
    const { x, y, width, height } = elm.getBoundingClientRect() || {}
    style.transform = `translate(${x + (width - coinSize) / 2}px, ${y + (height - coinSize) / 2}px) ${isActive ? 'scale(1.3)' : ''}`
  }

  return <div className={`coin coin--${color}`} id='coin' style={style} onClick={() => onSelectCoin(id)} />
}

export default Coin
