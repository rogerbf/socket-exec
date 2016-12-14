import socketExec from '../index.js'

it(`is defined`, () => expect(socketExec).toBeDefined())

it(`returns a rmeote object`, () => {
  expect(typeof (socketExec())).toEqual(`object`)
})
