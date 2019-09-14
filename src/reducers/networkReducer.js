import initialState from './initialState'

export default function (state = initialState.network, { type, payload }) {
  switch (type) {
    case 'UPDATE_CONNECTION_STATUS': {
      const network = { ...state }
      const { status, msg } = payload
      network.status = status
      network.errorMsg = msg || network.errorMsg

      return network
    }

    default:
      return state
  }
}
