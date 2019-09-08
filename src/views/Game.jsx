// determine which component to display - Start or Home - depending upon whether the user has entered his details (name)

import React, { useState, useEffect } from 'react'

import Welcome from './Start'
import Grid from './Home'
import { getValue } from '../utilities/localStorage'

const Game = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')

  useEffect(() => {
    console.info(`Welcome to Ludo, ${getValue('name')}!`)
    setName(getValue('name'))

    isLoading && setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (name) {
    return <Grid playerId={name} />
  }

  return <Welcome onNameUpdate={setName} />
}

export default Game
