import React from 'react'
import { connect } from 'react-redux'

import Coin from './Coin'

import '../styles/components/grid'

const Grid = ({ players, profile, cells, match }) => {
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
      return <Quadrant
        className={`quadrant--${color}`}
        key={index}
        id={index + 1}
        playerData={playersData[color]}
        cells={cells}
        profile={profile}
        match={match}
      />
    })}

    <Center />
  </div>
}

const Quadrant = props => {
  const { className, id, playerData = {}, cells, profile, match } = props
  const divClass = 'quadrant' + (className ? ' ' + className : '')

  return <div className={divClass}>
    {/* home cells */}
    <QuadrantHome id={id} playerData={playerData} cells={cells} profile={profile} match={match} />

    {/* 3 rows (or "columns") of cells */}
    <div className='quadrant__rows'>
      {[3, 2, 1].map(index => <Row id={index} quadrantId={id} cells={cells} key={index} profile={profile} match={match} />)}
    </div>

    {/* end cell - X99 */}
    <Cell id={`${id}99`} className='quadrant__cell--end' profile={profile} />
  </div>
}

// contains 4 home cells of a color
const QuadrantHome = ({ id, playerData, cells, profile, match }) => {
  const { home: clientHome } = profile
  const { isDiceRolled, lastRoll } = match

  return <div className='quadrant__home'>
    <div className='quadrant__home-label'>{ playerData.name }</div>
    <div>
      {[1, 2, 3, 4].map(index => {
        const position = `${id}0${index}`
        const {
          [position]: {
            coins: [
              {
                coinId, color
              } = {}
            ] = []
          } = {}
        } = cells
        // coin (at home) should pulse only if a 6 has been rolled by the player
        const shouldCoinPulse = isDiceRolled && color === clientHome && lastRoll === 6
        // insert coin in home cell if corresponding data is found in cells
        return <div id={position} className='quadrant__home-cell' key={index}>
          {coinId && <Coin id={coinId} position={null} color={color} isPlayers={color === clientHome} shouldPulse={shouldCoinPulse} />}
        </div>
      })}
    </div>
  </div>
}

// each row (or "column") contains 6 cells
const Row = props => {
  const { id, quadrantId, cells: cellsData, profile, match } = props
  const cells = []
  for (let i = 0; i < 6; i++) {
    const key = `${quadrantId}${id}${i}`
    cells.push(<Cell key={i} id={key} data={cellsData[key]} profile={profile} match={match} />)
  }
  return <div className='quadrant__row'>
    { cells }
  </div>
}

const Cell = ({ id, className = '', data: { coins = [] } = {}, profile, match = {} }) => {
  let cellClass = `quadrant__cell ${className}`

  const remaining = id % 100
  if ((remaining >= 20 && remaining <= 24) || remaining === 34) {
    cellClass += ' quadrant__cell--home'
  }
  if (remaining === 13 || remaining === 34) {
    cellClass += ' quadrant__cell--safe'
  }

  const { home: clientHome } = profile
  const { isDiceRolled } = match

  return <div className={cellClass} id={id}>
    {
      coins.length
        ? coins.map(
          ({ coinId, playerId, color }) => {
            // coin (at home) should pulse only if die has been rolled by the player
            const shouldCoinPulse = isDiceRolled && color === clientHome
            return <div className='quadrant__cell-container' key={coinId + playerId}>
              <Coin id={coinId} position={null} color={color} profile={profile} isPlayers={clientHome === color} shouldPulse={shouldCoinPulse} />
            </div>
          }
        )
        : <span>{
          // id
        }</span>
    }
  </div>
}

const Center = () => {
  return <div className='grid__center'>
    <div className='grid__logo' />
    {/* <h4 className='grid__title'>Ludo!</h4> */}
  </div>
}

const mapStateToProps = ({ players, profile, cells, match }) => ({
  players,
  profile,
  cells,
  match
})

export default connect(mapStateToProps)(Grid)
