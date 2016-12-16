import socketExec from '../index.js'

it(`is defined`, () => expect(socketExec).toBeDefined())

it(`throws without argument`, () => {
  expect(() => socketExec()).toThrow()
})

it(`returns a wrapped function which receives the expected parameters when called`, () => {
  const dependencies = {
    execute: jest.fn()
  }
  socketExec({ port: 9055, dependencies })([ `hello` ])
  expect(dependencies.execute.mock.calls[0]).toEqual([{
    port: 9055,
    dependencies,
    instructions: [ `hello` ]
  }])

  socketExec({ port: 9055, dependencies })()
  expect(dependencies.execute.mock.calls[1]).toEqual([{
    port: 9055,
    dependencies,
    instructions: []
  }])
})
