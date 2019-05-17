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
  return (dispatch, getState) => {
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
        type: 'POPULATE_CELLS',
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
      console.log('next turn belongs to:', playerId)
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
