import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../components/Grid'
import Coin from '../components/Coin'
import Dice from '../components/Dice'
import { initialize } from '../actions/socket'

const Home = props => {
  const { players, profile, cells, match, dispatch } = props

  useEffect(() => {
    dispatch(initialize())
  }, [])

  // useEffect(() => {
  //   console.log("players", players, players[profile.id])
  // }, [players[profile.id]])

  return <Fragment>
    <Grid players={players} profile={profile} cells={cells} />

    <Coins players={players} />

    <Dice match={match} />
  </Fragment>
}

// render all applicable coins
const Coins = ({ players }) => {
  const allCoins = []

  for (const playerId in players) {
    if (players.hasOwnProperty(playerId)) {
      const { coins, home } = players[playerId]
      for (const coinId in coins) {
        if (coins.hasOwnProperty(coinId)) {
          allCoins.push({
            id: coinId,
            position: coins[coinId].position,
            home,
            isShowing: coins[coinId].isShowing
          })
        }
      }
    }
  }

  return <Fragment>
    {allCoins.map(({ id, home, position, isShowing }) => {
      if (!isShowing) {
        return null
      }

      return <Coin id={id} position={position} color={home} key={`${home}-${id}`} />
    })}
  </Fragment>
}

const mapStateToProps = ({ players, profile, cells, match }) => ({
  players,
  profile,
  cells,
  match
})

const mapDispatchToProps = dispatch => {
  return {
    initialize: bindActionCreators(initialize, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
