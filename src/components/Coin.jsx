import React from 'react'

import '../styles/components/coin'

const Coin = ({ position, color, isActive }) => {
  const elm = document.getElementById(position)
  const style = {}

  const coinSize = 30

  if (elm) {
    const { x, y, width, height } = elm.getBoundingClientRect() || {}
    style.transform = `translate(${x + (width - coinSize) / 2}px, ${y + (height - coinSize) / 2}px) ${isActive ? 'scale(1.3)' : ''}`
  }

  return <div className={`coin coin--${color}`} id='coin' style={style}></div>
}

export default Coin