import React from 'react'

import '../styles/components/grid'

const Grid = ({ players, profile }) => {
  // TODO: find a better way to distribute data
  const playersData = {}
  for (const id in players) {
    if (players.hasOwnProperty(id)) {
      playersData[players[id].home] = players[id]
    }
  }

  const { home } = profile

  return <div className='grid'>
    {['red', 'blue', 'yellow', 'green'].map((color, index) => {
      return <Quadrant className={`quadrant--${color}`} key={index} id={index + 1} playerData={playersData[color]} />
    })}

    <Center />
  </div>
}

const Quadrant = props => {
  const { className, id, playerData = {} } = props
  const divClass = 'quadrant' + (className ? ' ' + className : '')

  return <div className={divClass}>
    <QuadrantHome id={id} playerData={playerData} />
    <div className='quadrant__rows'>
      <Row id='3' quadrantId={id} />
      <Row id='2' quadrantId={id} />
      <Row id='1' quadrantId={id} />
    </div>
  </div>
}

const QuadrantHome = ({ id, playerData }) => {
  return <div className='quadrant__home'>
    <div className='quadrant__home-label'>{ playerData.name }</div>
    <div>
      <div id={`${id}01`} className='quadrant__home-cell'></div>
      <div id={`${id}02`} className='quadrant__home-cell'></div>
      <div id={`${id}03`} className='quadrant__home-cell'></div>
      <div id={`${id}04`} className='quadrant__home-cell'></div>
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
  return <div className='grid__center'>
    <div className='grid__logo' />
    <h4 className='grid__title'>Ludo!</h4>
  </div>
}

export default Grid