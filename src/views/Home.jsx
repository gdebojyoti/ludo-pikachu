import React, { Fragment, useState, useEffect } from 'react'

import Grid from '../components/Grid'
import Coin from '../components/Coin'

import '../styles/views/home'

const Home = () => {
  const [position, setPosition] = useState()

  useEffect(() => {
    setPosition(132) // dummy value
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

export default Home