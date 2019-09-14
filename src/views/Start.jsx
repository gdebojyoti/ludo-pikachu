// accept user's name & save it to local storage

import React, { useState } from 'react'

import { setValue } from '../utilities/localStorage'

import '../styles/views/startScreen'

const StartScreen = ({ onEnter }) => {
  const saveId = (id) => {
    setValue('username', id)
    onEnter(id)
  }

  return <Name saveId={saveId} />
}

const Name = ({ saveId }) => {
  const [id, setId] = useState('')

  const onChange = e => {
    e.target.value && setId(e.target.value)
  }

  const onSubmit = (e) => {
    console.log(id)
    saveId(id)

    e.preventDefault()
  }

  return <div className='screen'>
    <h2>Welcome to Ludo</h2>
    <form onSubmit={onSubmit}>
      <label>
        <input autoFocus type='input' placeholder='Username' onChange={onChange} value={id} />
      </label>
      <input type='submit' value='Continue' />
    </form>
  </div>
}

export default StartScreen
