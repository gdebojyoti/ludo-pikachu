const remoteUrl = 'http://localhost:8000'

import openSocket from 'socket.io-client'
const socket = openSocket(remoteUrl)

const subscribeToTimer = cb => {
  socket.on('timer', timestamp => cb(timestamp))
  socket.emit('subscribeToTimer', 2000)
}

export {
  subscribeToTimer
}