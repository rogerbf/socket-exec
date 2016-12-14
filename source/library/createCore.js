export default ({ configuration, dependencies }) => {
  return dependencies.reduce(
    (core, factory) => ({ ...core, ...factory(configuration) }), {}
  )
}
