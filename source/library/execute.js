import concat from 'concat-stream'

export default ({ instructions = [], dependencies, ...options }) => {
  return new Promise((resolve, reject) => {
    const concatStream = concat(resolve)
    const socket = dependencies.createConnection(options)

    socket.on(`connect`, () =>
      instructions.map(instruction => socket.write(instruction))
    )

    socket.on(`error`, error => reject(error))
    socket.on(`timeout`, () => socket.destroy(Error(`Timeout`)))
    // socket.destroy([exception])
    // "If exception is specified, an 'error' event will be emitted and
    // any listeners for that event will receive exception as an argument."
    // This will effectively bind the timeout event to error which will reject

    socket.pipe(concatStream)
  })
}
