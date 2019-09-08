// accept user's name & save it to local storage

import React, { useState } from 'react'

import { setValue } from '../utilities/localStorage'

import '../styles/views/startScreen'

const StartScreen = ({ onNameUpdate }) => {
  const saveName = (name) => {
    setValue('name', name)
    onNameUpdate(name)
  }

  return <Name saveName={saveName} />
}

const Name = ({ saveName }) => {
  const [name, setName] = useState('')

  const onChange = e => {
    e.target.value && setName(e.target.value)
  }

  return <div className='screen'>
    <h2>Welcome to Ludo</h2>
    <label>
      <div>Name</div>
      <input type='input' onChange={onChange} value={name} />
    </label>
    <input type='submit' onClick={() => saveName(name)} value='Continue' />
  </div>
}

export default StartScreen
