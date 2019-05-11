import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../components/Grid'
import Coin from '../components/Coin'
import Dice from '../components/Dice'
import { initialize } from '../actions/socket'

import '../styles/views/home'

const Home = props => {
  const { players, profile, dispatch } = props
  const [position, setPosition] = useState()

  useEffect(() => {
    setPosition(104) // dummy value
    dispatch(initialize())
  }, [])

  useEffect(() => {
    console.log("players", players, players[profile.id])
    // NOTE: Temporary; only alfa coin is being moved for now
    const { coins: { alfa = 0 } = {} } = players[profile.id] || {}
    console.log("alfa", alfa)
    alfa && setPosition(alfa)
  }, [players[profile.id]])

  return <Fragment>
    <h1>
      <span className='logo' />
      Ludo!
    </h1>

    <Grid players={players} />

    <Coin position={position} />

    <Dice />
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