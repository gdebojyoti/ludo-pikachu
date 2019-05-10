const remoteUrl = 'http://localhost:8000'

import openSocket from 'socket.io-client'
import { getPlayerDetails } from '../utilities/data'

const socket = openSocket(remoteUrl)

const subscribeToTimer = cb => {
  socket.on('timer', timestamp => cb(timestamp))
  socket.emit('subscribeToTimer', 2000)
}

const initialize = () => {
  return dispatch => {
    const { name, home } = getPlayerDetails()
    socket.emit('JOIN_MATCH', {
      name, home
    })
    
    socket.on('PLAYER_JOINED', data => {
      dispatch({
        type: 'PLAYER_JOINED',
        payload: data
      })
    })
  }
}

export {
  initialize
}