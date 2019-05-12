import React from 'react'

const Test = ({ match = {} }) => {
  const { params: { id } = {} } = match

  if (id === undefined) {
    return <div>This is a static page</div>
  }

  return <div>Game ID: { id }</div>
}

export default Test