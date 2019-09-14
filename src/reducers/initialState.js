import matchStatus from '../constants/matchStatus'
import networkStatus from '../constants/networkStatus'

window.__INITIALSTATE__ = {
  players: {},
  cells: {},
  profile: {
    id: '',
    name: '',
    home: '',
    matchId: 'some_id',
    isHost: false
  },
  match: {
    id: null,
    status: matchStatus.PREMATCH,
    currentTurn: '',
    lastRoll: 0
  },
  network: {
    status: networkStatus.CONNECTED,
    errorMsg: ''
  }
}

export default window.__INITIALSTATE__
