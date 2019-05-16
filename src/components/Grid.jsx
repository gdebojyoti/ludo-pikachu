import React from 'react'

import Coin from './Coin'

import '../styles/components/grid'

const Grid = ({ players, profile, cells }) => {
  // TODO: find a better way to distribute data
  const playersData = {}
  for (const id in players) {
    if (players.hasOwnProperty(id)) {
      playersData[players[id].home] = players[id]
    }
  }

  // TODO: Do something special with client's home quadrant (may be rotate only their home cells during their turn)
  // const { home } = profile

  return <div className='grid'>
    {['red', 'blue', 'yellow', 'green'].map((color, index) => {
      return <Quadrant className={`quadrant--${color}`} key={index} id={index + 1} playerData={playersData[color]} cells={cells} />
    })}

    <Center />
  </div>
}

const Quadrant = props => {
  const { className, id, playerData = {}, cells } = props
  const divClass = 'quadrant' + (className ? ' ' + className : '')

  return <div className={divClass}>
    <QuadrantHome id={id} playerData={playerData} />
    <div className='quadrant__rows'>
      {[3, 2, 1].map(index => <Row id={index} quadrantId={id} cells={cells} key={index} />)}
    </div>
    <Cell id={`${id}99`} className='quadrant__cell--end' />
  </div>
}

const QuadrantHome = ({ id, playerData }) => {
  return <div className='quadrant__home'>
    <div className='quadrant__home-label'>{ playerData.name }</div>
    <div>
      <div id={`${id}01`} className='quadrant__home-cell' />
      <div id={`${id}02`} className='quadrant__home-cell' />
      <div id={`${id}03`} className='quadrant__home-cell' />
      <div id={`${id}04`} className='quadrant__home-cell' />
    </div>
  </div>
}

const Row = props => {
  const { id, quadrantId, cells: cellsData } = props
  const cells = []
  for (let i = 0; i < 6; i++) {
    const key = `${quadrantId}${id}${i}`
    cells.push(<Cell key={i} id={key} data={cellsData[key]} />)
  }
  return <div className='quadrant__row'>
    { cells }
  </div>
}

const Cell = ({ id, className = '', data: { coins = [] } = {} }) => {
  let cellClass = `quadrant__cell ${className}`

  const remaining = id % 100
  if ((remaining >= 20 && remaining <= 24) || remaining === 34) {
    cellClass += ' quadrant__cell--home'
  }
  if (remaining === 13 || remaining === 34) {
    cellClass += ' quadrant__cell--safe'
  }

  return <div className={cellClass} id={id}>
    {
      coins.length
        ? coins.map(
          ({ coinId, playerId, color }) => <div className='quadrant__cell-container' key={coinId + playerId}>
            <Coin id={coinId} position={null} color={color} />
          </div>
        )
        : <span>{id}</span>
    }
  </div>
}

const Center = () => {
  return <div className='grid__center'>
    <div className='grid__logo' />
    {/* <h4 className='grid__title'>Ludo!</h4> */}
  </div>
}

export default Grid
