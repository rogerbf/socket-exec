import createCore from '../library/createCore.js'

test(`createCore`, () => {
  it(`exports a function`, () => {
    expect(typeof (createCore)).toEqual(`function`)
  })

  it(`it returns the expected output`, () => {
    const greeter = (configuration) => ({ greet: () => configuration.hello })
    const configuration = { hello: `hej` }
    const dependencies = [ greeter ]
    const core = createCore({ configuration, dependencies })
    expect(typeof (core)).toEqual(`object`)
    expect(core.hasOwnProperty(`greet`)).toBeTruthy()
    expect(core.greet()).toEqual(`hej`)
  })
})
