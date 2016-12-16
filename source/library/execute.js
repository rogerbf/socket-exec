import { createConnection } from 'net'
import concat from 'concat-stream'

export default (configuration, connect = createConnection) => ({
  execute: (instructions = []) => {
    return new Promise((resolve, reject) => {
      const concatStream = concat(resolve)
      const socket = connect(configuration)

      socket.on(`connect`, () =>
        instructions.map(instruction => socket.write(instruction))
      )
      socket.on(`error`, error => reject(error))
      socket.on(`timeout`, () => socket.destroy(Error(`Timeout`)))

      socket.pipe(concatStream)
    })
  }
})
