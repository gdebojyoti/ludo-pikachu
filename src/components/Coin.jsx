import React from 'react'

import '../styles/components/coin'

const Coin = ({ position }) => {
  const elm = document.getElementById(position)
  const style = {}

  if (elm) {
    const rect = elm.getBoundingClientRect()
    style.transform = `translate(${rect.x + 20}px, ${rect.y + 15}px)`
  }

  return <div className='coin' id='coin' style={style}></div>
}

export default Coin