// determine which component to display - Start or Home - depending upon whether the user has entered his details (username)

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Start from './Start'
import LobbyScreen from './Lobby'
import Grid from './Home'
import matchStatusConstants from '../constants/matchStatus'
import * as actions from '../actions/socket'
import { getValue, setValue } from '../utilities/localStorage'

const Ludo = (props) => {
  const { match: matchFromReact, actions: { initialize, selectColor, startMatch }, matchId, matchStatus, players, profile } = props

  const { params: { matchId: matchIdFromUrl } = {} } = matchFromReact
  console.log('details', matchFromReact, matchIdFromUrl)

  const [isLoading, setIsLoading] = useState(true) // show loading screen by default
  const [username, setUsername] = useState() // player username; same as player ID (for now)
  // const [color, setColor] = useState() // player color

  useEffect(() => {
    // fetch player's username from local storage
    setUsername(getValue('username'))

    // remove loading screen once everything is loaded
    isLoading && setIsLoading(false)
  }, [])

  // when username is found, initialize - connect to BE (socket IO)
  useEffect(() => {
    // retrieve match ID from URL or local storage
    const matchId = matchIdFromUrl || getValue('matchId')
    if (matchId) {
      // update match ID in local storage
      setValue('matchId', matchId)
    }

    username && initialize({ username, matchId })
  }, [username])

  if (isLoading) {
    return <LoadingScreen />
  }

  // get player details (eg: username), if none is found (in local storage)
  if (!username) {
    return <Start onEnter={setUsername} />
  }

  console.log('matchId!', matchId)

  const onSelectColor = color => {
    console.log('username, matchId, color', username, matchId, color)
    selectColor({ username, matchId, color })
  }

  const onStart = () => {
    startMatch()
  }

  if (matchStatus === matchStatusConstants.PREMATCH) {
    return <LobbyScreen onStart={onStart} onSelectColor={onSelectColor} players={players} profile={profile} matchId={matchId} />
  }

  return <Grid playerId={username} />
}

// update UI & export this to a new file
const LoadingScreen = () => {
  return <div>Loading...</div>
}

const mapStateToProps = ({ profile, players, match: { id, status } = {} }) => ({ matchId: id, matchStatus: status, players, profile })

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ludo)
