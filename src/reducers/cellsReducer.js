import initialState from './initialState'

export default function (state = initialState.cells, action) {
  switch (action.type) {
    case 'POPULATE_CELLS': {
      console.log('all cells', action.payload)
      const data = { ...action.payload }

      const cells = {}

      for (const playerId in data) {
        const player = data[playerId]
        for (const coinId in player.coins) {
          const {
            [coinId]: {
              position
            }
          } = player.coins

          const cell = Object.assign({}, cells[position])
          cell.coins = (cell.coins || []).filter(x => x.coinId !== coinId || x.playerId !== playerId).concat({ coinId, playerId, color: player.home })
          cells[position] = cell
        }
      }

      return cells
    }

    case 'ADD_COIN_TO_CELL': {
      const cells = Object.assign({}, state)
      const { cellId, coinId, playerId, color } = action.payload

      const cell = Object.assign({}, cells[cellId])
      cell.coins = (cell.coins || []).filter(x => x.coinId !== coinId || x.playerId !== playerId).concat({ coinId, playerId, color })
      cells[cellId] = cell
      console.log('added', cell, cells)
      return cells
    }

    case 'REMOVE_COIN_FROM_CELL': {
      const cells = Object.assign({}, state)
      const { cellId, coinId, playerId } = action.payload

      const cell = Object.assign({}, cells[cellId])
      cell.coins = (cell.coins || []).filter(x => x.coinId !== coinId || x.playerId !== playerId)
      cells[cellId] = cell

      console.log('removed', cell, cells)
      return cells
    }

    default:
      return state
  }
}
