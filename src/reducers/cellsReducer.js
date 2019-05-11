import initialState from './initialState'

export default function (state = initialState.cells, action) {
  switch (action.type) {
    case 'ADD_PIECE': {
      const cells = Object.assign({}, state)
      const { cellId, pieceId } = action.payload

      const cell = Object.assign({}, cells[cellId])
      cell.pieces = (cell.pieces || []).filter(x => x !== pieceId).concat(pieceId)
      cells[cellId] = cell
      
      console.log("added", cell, cells)
      return cells
    }

    case 'LEAVE_CELL': {
      const cells = Object.assign({}, state)
      const { cellId, pieceId } = action.payload

      const cell = Object.assign({}, cells[cellId])
      cell.pieces = (cell.pieces || []).filter(x => x !== pieceId)
      cells[cellId] = cell
      
      console.log("removed", cell, cells)
      return cells
    }

    default:
      return state
  }
}
