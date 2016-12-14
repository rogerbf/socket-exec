import createCore from '../library/createCore.js'

it(`exports a function`, () => {
  expect(typeof (createCore)).toEqual(`function`)
})

it(`returns the expected output`, () => {
  expect(createCore()).toEqual({})
})

it(`it returns the expected output`, () => {
  const greeter = (configuration) => ({ greet: () => configuration.hello })
  const speaker = (configuration) => ({ speak: (phrase) => phrase })
  const core = createCore({
    configuration: { hello: `hej` },
    dependencies: [ greeter, speaker ]
  })
  expect(typeof (core)).toEqual(`object`)
  expect(core.hasOwnProperty(`greet`)).toBeTruthy()
  expect(core.greet()).toEqual(`hej`)
  expect(core.hasOwnProperty(`speak`)).toBeTruthy()
  expect(core.speak(`farewell`)).toEqual(`farewell`)
})
