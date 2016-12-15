import execute from '../library/execute.js'
import { Readable } from 'stream'

it(`exports a function`, () => expect(typeof (execute)).toEqual(`function`))

it(`returns an object containing a function: execute`, () => {
  expect(typeof (execute().execute)).toEqual(`function`)
})

it(`resolves with the expected result`, () => {
  const createConnection = jest.fn(() => {
    return new Readable({
      read () {
        this.push(`hello`)
        this.push(null)
      }
    })
  })
  const exec = execute({ port: 9055 }, createConnection)
  expect(exec.hasOwnProperty(`execute`)).toBeTruthy()
  const instructions = [ `hello` ]
  const errorHandler = error => { expect(error).toBeFalsy() }
  const successHandler = result => {
    expect(result).toEqual(Buffer.from(`hello`))
    expect(createConnection.mock.calls[0][0]).toEqual({ port: 9055 })
  }
  exec.execute(instructions)
    .then(successHandler)
    .catch(errorHandler)
})
