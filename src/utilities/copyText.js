const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    console.info('No support for navigator.clipboard!')
    return
  }
  navigator.clipboard.writeText(text).then(() => {
    console.log('Async: Copying to clipboard was successful!')
  }, err => {
    console.error('Async: Could not copy text: ', err)
  })
}

export default copyTextToClipboard
