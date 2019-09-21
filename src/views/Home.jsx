import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../components/Grid'
import Coin from '../components/Coin'
import Dice from '../components/Dice'
import { initialize } from '../actions/socket'

const Home = props => {
  const { playerId, players, profile, profile: { home } = {}, match } = props

  useEffect(() => {
    console.info(`Welcome to Ludo, ${playerId}!`)
    console.log('profile', profile)
  }, [])

  // useEffect(() => {
  //   console.log("players", players, players[profile.id])
  // }, [players[profile.id]])

  return <Fragment>
    <Grid />

    <Coins players={players} playerHome={home} />

    <Dice match={match} profile={profile} />
  </Fragment>
}

// render all applicable coins - used when a coin is in motion (i.e. moving from one position to another)
const Coins = ({ players, playerHome }) => {
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

      return <Coin id={id} position={position} color={home} key={`${home}-${id}`} isPlayers={playerHome === home} />
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
    initialize: bindActionCreators(initialize, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
