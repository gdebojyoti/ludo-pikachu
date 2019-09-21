import openSocket from 'socket.io-client'

import { setValue } from '../utilities/localStorage'
import networkStatus from '../constants/networkStatus'

// use heroku link only on production ("prod=true" in URL) only
// const remoteUrl = window.location.search.indexOf('prod') >= 0 ? 'https://ludo-blastoise.herokuapp.com/' : `http://${window.location.hostname}:8000`
const remoteUrl = window.location.host.indexOf('playludo') >= 0 ? 'https://ludo-blastoise.herokuapp.com/' : `http://${window.location.hostname}:8000`

// const coinStepSound = new window.Audio('https://www.debojyotighosh.com/assets/ludoCoinStep.mp3') // TODO: A more permanent URL

const socket = openSocket(remoteUrl)

// const subscribeToTimer = cb => {
//   socket.on('timer', timestamp => cb(timestamp))
//   socket.emit('subscribeToTimer', 2000)
// }

const selectColor = ({ username, matchId, color }) => {
  return () => {
    socket.emit('SELECT_COLOR', {
      playerId: username, matchId, color
    })
  }
}

const initialize = ({ username: playerId, matchId }) => {
  return (dispatch, getState) => {
    // const { home } = getPlayerDetails()
    if (matchId) {
      console.log('joining...', matchId, typeof matchId)
      socket.emit('JOIN_MATCH', {
        playerId,
        matchId
      })
    } else {
      console.log('hosting...')
      socket.emit('HOST_MATCH', {
        playerId
      })
      dispatch({
        type: 'SET_AS_HOST'
      })
    }

    socket.on('connect', () => {
      console.warn('connected', socket.id, socket.disconnected, socket)
      dispatch({
        type: 'UPDATE_CONNECTION_STATUS',
        payload: {
          status: networkStatus.CONNECTED
        }
      })
      const { match: { id } } = getState()
      console.log('rejoining...', matchId)
      socket.emit('JOIN_MATCH', {
        playerId,
        matchId: id
      })
    })

    socket.on('disconnect', (msg) => {
      console.warn('disconnected', msg)
      dispatch({
        type: 'UPDATE_CONNECTION_STATUS',
        payload: {
          status: networkStatus.DISCONNECTED,
          msg
        }
      })
    })

    // socket.on('reconnect_attempt', (attemptNumber) => {
    //   console.warn('reconnect attempt...', attemptNumber)
    // })

    socket.on('reconnecting', (attemptNumber) => {
      console.warn('reconnecting...', attemptNumber)
      dispatch({
        type: 'UPDATE_CONNECTION_STATUS',
        payload: {
          status: networkStatus.RECONNECTING
        }
      })
    })

    // socket.on('reconnect', (attemptNumber) => {
    //   console.warn('reconnected', attemptNumber)
    // })

    socket.on('reconnect_error', (error) => {
      console.warn('reconnection error', error)
    })

    socket.on('reconnect_failed', () => {
      console.warn('failed to reconnect')
    })

    // when current player (client) is set as host
    socket.on('SET_AS_HOST', () => {
      dispatch({
        type: 'SET_AS_HOST'
      })
    })

    // when current player (client) has joined
    socket.on('CLIENT_JOINED', ({ matchId }) => {
      // update match ID in local storage
      setValue('matchId', matchId)
    })

    // when no match with matchId is found
    socket.on('MATCH_NOT_FOUND', ({ matches }) => {
      console.log('Match not found! Existing ones:', matches)
      console.log('Joining a new one...')
      // setValue('matchId', null)
    })

    socket.on('LATEST_MATCH_DATA', (data) => {
      const { playerId: id, players, id: matchId, hostId, name, home } = data

      dispatch({
        type: 'UPDATE_MATCH_DATA',
        payload: data
      })

      dispatch({
        type: 'SET_PLAYERS_DATA',
        payload: players
      })

      hostId && hostId === playerId && dispatch({
        type: 'SET_AS_HOST'
      })

      dispatch({
        type: 'POPULATE_CELLS',
        payload: players
      })

      // update profile data if player ID is available
      id && dispatch({
        type: 'UPDATE_PROFILE_DATA',
        payload: {
          id, name, home, matchId
        }
      })
    })

    // when a new player joins
    socket.on('PLAYER_JOINED', data => {
      // update list of all players
      dispatch({
        type: 'PLAYER_JOINED',
        payload: data
      })
    })

    // when a player rolls dice
    socket.on('DICE_ROLLED', ({ name, roll }) => {
      console.log(name, 'rolled a', roll)
      dispatch({
        type: 'UPDATE_LAST_ROLL',
        payload: roll
      })
      dispatch({
        type: 'UPDATE_DICE_ROLLED',
        payload: true
      })
    })

    // when a coin of any player changes position
    socket.on('COIN_POSITION_UPDATED', ({ playerId: id, coinId, coinPosition, coinPath }) => {
      console.log('updating coin position', id, coinId, coinPosition, coinPath)
      const {
        players: {
          [id]: {
            home: color,
            coins: {
              [coinId]: {
                position: coinPositionOld
              }
            } = {}
          } = {}
        } = {}
      } = getState()

      // remove coin from old cell
      dispatch({
        type: 'REMOVE_COIN_FROM_CELL',
        payload: {
          cellId: coinPositionOld,
          playerId: id,
          coinId
        }
      })

      // show up coin in old position
      dispatch({
        type: 'UPDATE_PLAYERS_DATA',
        payload: {
          id, coinId, coinPosition: coinPositionOld, isShowing: true
        }
      })

      // move coin from old position to new position
      let step = 0
      let interval = setInterval(() => { // NOTE: This might take quite a performance hit; find an alternate (and more elegant) solution
        if (step < coinPath.length && interval) {
          // move the coin (with animation)
          dispatch({
            type: 'UPDATE_PLAYERS_DATA',
            payload: {
              id, coinId, coinPosition: coinPath[step], isShowing: true
            }
          })

          // if (coinStepSound) {
          //   if (!coinStepSound.paused) {
          //     coinStepSound.pause()
          //     coinStepSound.currentTime = 0
          //   }
          //   coinStepSound.play()
          // }

          step++
        } else {
          // hide moveable coin in final position
          dispatch({
            type: 'UPDATE_PLAYERS_DATA',
            payload: {
              id, coinId, coinPosition, isShowing: false
            }
          })

          // add coin to new cell
          dispatch({
            type: 'ADD_COIN_TO_CELL',
            payload: {
              cellId: coinPosition,
              playerId: id,
              coinId,
              color
            }
          })

          clearInterval(interval)
          interval = null
        }
      }, 300)
    })

    // when enemy coin gets eaten
    socket.on('ENEMY_COIN_EATEN', ({ coin: { playerId: id, coinId }, position: coinPosition, coinPositionOld }) => {
      console.log('enemy coin eaten', id, coinId, coinPosition, 'to', coinPositionOld)
      const {
        players: {
          [id]: {
            home: color
          } = {}
        } = {}
      } = getState()

      // remove eaten coin from cell
      dispatch({
        type: 'REMOVE_COIN_FROM_CELL',
        payload: {
          cellId: coinPositionOld,
          playerId: id,
          coinId
        }
      })

      // update data in list of all players
      dispatch({
        type: 'UPDATE_PLAYERS_DATA',
        payload: {
          id, coinId, coinPosition
        }
      })

      // add eaten coin to home cell
      dispatch({
        type: 'ADD_COIN_TO_CELL',
        payload: {
          cellId: coinPosition,
          playerId: id,
          coinId,
          color
        }
      })
    })

    // update current turn
    socket.on('SET_NEXT_TURN', ({ playerId }) => {
      console.info('next turn belongs to:', playerId)
      dispatch({
        type: 'UPDATE_NEXT_TURN',
        payload: playerId
      })
      dispatch({
        type: 'UPDATE_LAST_ROLL',
        payload: null
      })
      dispatch({
        type: 'UPDATE_DICE_ROLLED',
        payload: false
      })
    })

    // when a player leaves
    socket.on('PLAYER_LEFT', playerDetails => {
      console.log('a player has left', playerDetails)
    })

    // game over
    socket.on('GAME_OVER', ({ winner }) => {
      console.log('winner', winner)
      window.alert(`Game won by ${winner}!`)
    })
  }
}

const startMatch = () => {
  socket.emit('START_MATCH')
}

const triggerDiceRoll = (number = 0) => {
  socket.emit('TRIGGER_DICE_ROLL', number)
}

const onSelectCoin = coinId => {
  socket.emit('COIN_SELECTED', {
    coinId
  })
}

export {
  initialize,
  selectColor,
  startMatch,
  triggerDiceRoll,
  onSelectCoin
}
