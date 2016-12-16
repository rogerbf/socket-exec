import execute from '../library/execute.js'
import { Readable } from 'stream'

it(`exports a function`, () => expect(typeof (execute)).toEqual(`function`))

// it(`returns an object containing a function: execute`, () => {
//   expect(typeof (execute().execute)).toEqual(`function`)
// })

it(`resolves with the expected result`, () => {
  const on = jest.fn((eventName, fn) => {
    eventName === `connect` && fn()
  })
  const createConnection = jest.fn(() => {
    const socket = Object.assign(
      new Readable({
        read () {}
      }),
      { write: data => socket.push(data) },
      { on }
    )
    return socket
  })

  const instructions = [ `hello` ]
  const errorHandler = error => { expect(error).toBeFalsy() }
  const successHandler = result => {
    expect(result).toEqual(Buffer.from(`hello`))
    expect(createConnection.mock.calls[0][0]).toEqual({ port: 9055 })
    expect(on.mock.calls.length).toEqual(2)
  }
  execute({ port: 9055, dependencies: { createConnection }, instructions })
    .then(successHandler)
    .catch(errorHandler)
})

it(`rejects after timeout`, () => {
  const on = jest.fn((eventName, fn) => {
    eventName === `timeout` && fn()
  })
  const destroy = jest.fn()
  const createConnection = jest.fn(() => {
    const socket = Object.assign(
      new Readable({
        read () {}
      }),
      { write: data => socket.push(data) },
      { on, destroy }
    )
    return socket
  })

  const errorHandler = error => {
    expect(error).toBeTruthy()
    expect(destroy.mock.calls.length).toEqual(1)
  }
  const successHandler = result => expect(result).toBeFalsy()
  execute({ port: 9055, dependencies: { createConnection }, instructions: [ `hello` ] })
    .then(successHandler)
    .catch(errorHandler)
})

it(`rejects on error`, () => {
  const on = jest.fn((eventName, fn) => {
    eventName === `error` && fn(`something went wrong`)
  })
  const createConnection = jest.fn(() => {
    const socket = Object.assign(
      new Readable({
        read () {}
      }),
      { write: data => socket.push(data) },
      { on }
    )
    return socket
  })

  const errorHandler = error => expect(error).toEqual(`something went wrong`)
  const successHandler = result => expect(result).toBeFalsy()
  execute({ port: 9055, dependencies: { createConnection } })
    .then(successHandler)
    .catch(errorHandler)
})
