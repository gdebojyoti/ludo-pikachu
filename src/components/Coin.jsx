import React from 'react'

import '../styles/components/coin'

const Coin = ({ position }) => {
  const elm = document.getElementById(position)
  const style = {}

  if (elm) {
    const { x, y, width, height } = elm.getBoundingClientRect() || {}
    style.transform = `translate(${x + (width - 20) / 2}px, ${y + (height - 20) / 2}px)`
  }

  return <div className='coin' id='coin' style={style}></div>
}

export default Coin