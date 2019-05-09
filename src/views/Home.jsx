import React, { Fragment, useState, useEffect } from 'react'

import Grid from '../components/Grid'
import Coin from '../components/Coin'
import { subscribeToTimer } from '../actions/socket'
console.log(subscribeToTimer)

import '../styles/views/home'

const Home = () => {
  const [position, setPosition] = useState()
  const [timestamp, setTimestamp] = useState(null)

  useEffect(() => {
    setPosition(132) // dummy value
    console.log("did mount")
    subscribeToTimer(timestamp => {
      setTimestamp(timestamp)
    })
  }, [])

  console.log("timestamp", timestamp)
  
  return <Fragment>
    <h1>
      <span className='logo' />
      Ludo!
    </h1>

    <Grid />

    <Coin position={position} />
  </Fragment>
}

export default Home