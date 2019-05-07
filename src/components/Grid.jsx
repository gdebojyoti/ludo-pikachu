import React from 'react'

import '../styles/components/grid'

const Grid = () => {
  return <div className='grid'>
    <Quadrant className='quadrant--red' id='1' />
    <Quadrant className='quadrant--blue' id='4' />
    <Quadrant className='quadrant--yellow' id='3' />
    <Quadrant className='quadrant--green' id='2' />

    <Center />
  </div>
}

const Quadrant = props => {
  const { className, id } = props
  const divClass = 'quadrant' + (className ? ' ' + className : '')
  return <div className={divClass}>
    <div className='quadrant__home'></div>
    <div className='quadrant__rows'>
      <Row id='3' quadrantId={id} />
      <Row id='2' quadrantId={id} />
      <Row id='1' quadrantId={id} />
    </div>
  </div>
}

const Row = props => {
  const { id, quadrantId } = props
  const cells = []
  for (let i = 0; i < 6; i++) {
    cells.push(<Cell key={i} id={`${quadrantId}${id}${i}`} />)
  }
  return <div className='quadrant__row'>
    { cells }
  </div>
}

const Cell = ({ id }) => {
  return <div className='quadrant__cell' id={id}>{id}</div>
}

const Center = () => {
  return <div className='grid__center'></div>
}

export default Grid