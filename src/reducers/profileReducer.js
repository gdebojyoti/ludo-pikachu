import initialState from './initialState'

export default function (state = initialState.profile, action) {
  switch (action.type) {
    case 'SET_AS_HOST': {
      const profileData = {
        ...state,
        isHost: true
      }

      return profileData
    }

    case 'UPDATE_PROFILE_DATA': {
      const { id, name, home, matchId } = action.payload
      const profileData = {
        ...state,
        id,
        name,
        home,
        matchId
      }

      return profileData
    }

    default:
      return state
  }
}
