import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../components/Grid'
import Coin from '../components/Coin'
import { initialize } from '../actions/socket'

import '../styles/views/home'

const Home = props => {
  const { players, dispatch } = props
  const [position, setPosition] = useState()

  useEffect(() => {
    setPosition(132) // dummy value
    dispatch(initialize())
  }, [])

  return <Fragment>
    <h1>
      <span className='logo' />
      Ludo!
    </h1>

    <Grid />

    <Coin position={position} />
  </Fragment>
}

const mapStateToProps = state => ({
  players: state.players
})

const mapDispatchToProps = dispatch => {
  return {
    initialize: bindActionCreators(initialize, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)