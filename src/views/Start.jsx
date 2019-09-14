// accept user's name & save it to local storage

import React, { useEffect, useState } from 'react'

import { setValue } from '../utilities/localStorage'

import '../styles/views/startScreen'

const StartScreen = ({ onEnter }) => {
  // NOTE: Currently working on FF; not in Chrome. Access to name & id by default. Additional request for profile pic required
  useEffect(() => {
    document.addEventListener('FbObjectReady', checkLoginState)
  }, [])

  function checkLoginState () {
    console.log('checking...')
    window.FB.getLoginStatus(function (response) {
      console.log(response)
      if (response.status === 'connected') {
        window.FB.login(facebookLoginHandler, {
          // scope: 'public_profile,email'
          scope: 'public_profile'
        })
      }
    })
  }

  const facebookLoginHandler = response => {
    if (response.status === 'connected') {
      window.FB.api('/me', userData => {
        console.log('successful login with data', userData, response)
      })
    } else {
      console.log('data fetching failed', response)
    }
  }

  const saveId = (id) => {
    setValue('username', id)
    onEnter(id)
  }

  return <div>
    <Name saveId={saveId} />

    <button onClick={checkLoginState}>Dummy FB!</button>
    <br />

    <div className='fb-login-button' data-width='' data-size='medium' data-button-type='continue_with' data-auto-logout-link='true' data-use-continue-as='true' />
  </div>
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
