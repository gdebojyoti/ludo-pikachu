// determine which component to display - Start or Home - depending upon whether the user has entered his details (name)

import React, { useState, useEffect } from 'react'

import Welcome from './Start'
import Grid from './Home'
import { getValue } from '../utilities/localStorage'

const Ludo = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')

  useEffect(() => {
    console.info(`Welcome to Ludo, ${getValue('name')}!`)
    setName(getValue('name'))

    isLoading && setIsLoading(false)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (name) {
    return <Grid playerId={name} />
  }

  return <Welcome onNameUpdate={setName} />
}

// update UI & export this to a new file
const LoadingScreen = () => {
  return <div>Loading...</div>
}

export default Ludo
