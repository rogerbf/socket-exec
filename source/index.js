import { createConnection } from 'net'
import execute from './library/execute'

const defaultOptions = {
  dependencies: {
    createConnection,
    execute
  }
}

const throwError = error => { throw error }

export default (userOptions) => {
  !userOptions &&
  throwError(TypeError(`missing an argument, maybe a port or a path?`))

  return (instructions = []) => {
    const options = { ...defaultOptions, ...userOptions, instructions }
    return options.dependencies.execute(options)
  }
}
