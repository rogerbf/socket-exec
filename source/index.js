import createCore from './library/createCore'
import execute from './library/execute'

const defaultDependencies = [
  execute
]

export default (configuration = {}, dependencies = defaultDependencies) => {
  return createCore({
    configuration: { ...configuration, end: undefined },
    dependencies
  })
}
