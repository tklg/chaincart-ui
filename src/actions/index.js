const _actions = [
  'set_working',
  'set_error',
  'set_providers'
]
const actions = {}

for (const a of _actions) {
  actions[a] = a
}
export default actions
