import matchStatus from '../constants/matchStatus'

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
  }
}

export default window.__INITIALSTATE__
