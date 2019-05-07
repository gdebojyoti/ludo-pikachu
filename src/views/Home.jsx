import React from 'react'

import Grid from '../components/Grid'

import '../styles/views/home'

const Home = () => {
  return <div>
    <h1>
      <span className='logo' />
      Ludo!
    </h1>
    
    <Grid />
  </div>
}

export default Home