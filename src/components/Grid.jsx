import React from 'react'

import '../styles/components/grid'

const Grid = ({ players }) => {
  // TODO: find a better way to distribute data
  const playersData = {}
  for (const id in players) {
    if (players.hasOwnProperty(id)) {
      playersData[players[id].home] = players[id]
    }
  }

  return <div className='grid'>
    <Quadrant className='quadrant--red' id='1' playerData={playersData.red} />
    <Quadrant className='quadrant--blue' id='4' playerData={playersData.blue} />
    <Quadrant className='quadrant--yellow' id='3' playerData={playersData.yellow} />
    <Quadrant className='quadrant--green' id='2' />

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
  return <div className='grid__center'></div>
}

export default Grid