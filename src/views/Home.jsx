import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../components/Grid'
import Coin from '../components/Coin'
import Dice from '../components/Dice'
import { initialize } from '../actions/socket'

const Home = props => {
  const { players, profile, dispatch } = props

  useEffect(() => {
    dispatch(initialize())
  }, [])

  // useEffect(() => {
  //   console.log("players", players, players[profile.id])
  // }, [players[profile.id]])

  return <Fragment>
    <Grid players={players} profile={profile} />

    <Coins players={players} />

    <Dice />
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
            position: coins[coinId],
            home
          })
        }
      }
    }
  }

  return <Fragment>
    {allCoins.map(({ id, position, home }) => {
      return <Coin id={id} position={position} color={home} key={`${home}-${id}`} />
    })}
  </Fragment>
}

const mapStateToProps = ({ players, profile }) => ({
  players,
  profile
})

const mapDispatchToProps = dispatch => {
  return {
    initialize: bindActionCreators(initialize, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)