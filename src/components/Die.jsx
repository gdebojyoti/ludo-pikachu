import React, { useState, useEffect } from 'react'

import '../styles/components/die'

const Die = ({ lastRoll, isRolling, onClick, isDisabled }) => {
  const [transformValue, setTransformValue] = useState('none')

  useEffect(() => {
    console.log('last rollssss', lastRoll)
    if (lastRoll) {
      switch (lastRoll) {
        case 1: setTransformValue('rotateY(180deg)'); break
        case 2: setTransformValue('rotateY(-90deg)'); break
        case 4: setTransformValue('rotateY(90deg)'); break
        case 5: setTransformValue('rotateX(-90deg)'); break
        case 6: setTransformValue('rotateX(90deg)'); break
        default: setTransformValue('none')
      }
    }
  }, [lastRoll])

  return <div id='die' className={`die ${isRolling && 'die--rolling'} ${isDisabled && 'die--disabled'}`} onClick={onClick} style={{ transform: transformValue }}>
    <div className='die__side'>•</div>
    <div className='die__side'>• •</div>
    <div className='die__side'>• • •</div>
    <div className='die__side'>• • • •</div>
    <div className='die__side'>• • • • •</div>
    <div className='die__side'>•• •• ••</div>
  </div>
}

export default Die
