const getQueries = () => {
  const queries = {}

  const queryStringArr = window.location.search.split('?') || []
  if (queryStringArr.length !== 2) {
    return queries
  }

  queryStringArr[1].split('&').forEach(query => {
    const queryParams = query.split('=')
    queries[queryParams[0]] = queryParams[1]
  })

  return queries
}

export const getPlayerDetails = () => {
  const { home } = getQueries()
  return {
    home
  }
}
