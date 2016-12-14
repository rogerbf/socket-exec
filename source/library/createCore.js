export default ({ configuration = {}, dependencies = [] } = {}) => {
  return dependencies.reduce((core, factory) => {
    return { ...core, ...factory(configuration) }
  }, {})
}
