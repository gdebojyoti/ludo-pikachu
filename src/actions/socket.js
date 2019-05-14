import openSocket from 'socket.io-client'
import { getPlayerDetails } from '../utilities/data'

// use heroku link only on production ("prod=true" in URL) only
const remoteUrl = window.location.search.indexOf('prod') >= 0 ? 'https://ludo-blastoise.herokuapp.com/' : 'http://localhost:8000'

const socket = openSocket(remoteUrl)

// const subscribeToTimer = cb => {
//   socket.on('timer', timestamp => cb(timestamp))
//   socket.emit('subscribeToTimer', 2000)
// }

const initialize = () => {
  return dispatch => {
    const { name, home } = getPlayerDetails()
    socket.emit('JOIN_MATCH', {
      name, home
    })

    // // when current player (client) has joined
    // socket.on('CLIENT_JOINED', ({ id, name, home, matchId }) => {
    //   // update current player's data
    //   dispatch({
    //     type: 'UPDATE_PROFILE_DATA',
    //     payload: {
    //       id, name, home, matchId
    //     }
    //   })

    //   // update list of all players
    //   dispatch({
    //     type: 'PLAYER_JOINED',
    //     payload: {
    //       id, name, home
    //     }
    //   })
    // })

    socket.on('LATEST_MATCH_DATA', ({ playerId: id, players, matchId, name, home }) => {
      dispatch({
        type: 'SET_MATCH_DATA',
        payload: players
      })

      dispatch({
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
    })

    // when a coin of any player changes position
    socket.on('COIN_POSITION_UPDATED', ({ playerId: id, coinId, coinPosition, coinPath }) => {
      console.log('updating coin position', id, coinId, coinPosition, coinPath)
      // update data in list of all players
      dispatch({
        type: 'UPDATE_PLAYERS_DATA',
        payload: {
          id, coinId, coinPosition
        }
      })
    })

    // when enemy coin gets eaten
    socket.on('ENEMY_COIN_EATEN', ({ coin: { playerId: id, coinId }, position: coinPosition }) => {
      console.log('enemy coin eaten', id, coinId, coinPosition)
      // update data in list of all players
      dispatch({
        type: 'UPDATE_PLAYERS_DATA',
        payload: {
          id, coinId, coinPosition
        }
      })
    })

    // update current turn
    socket.on('SET_NEXT_TURN', ({ playerId }) => {
      console.log('next turn belongs to:', playerId)
    })

    // when a player leaves
    socket.on('PLAYER_LEFT', playerDetails => {
      console.log('a player has left', playerDetails)
    })
  }
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
  triggerDiceRoll,
  onSelectCoin
}
