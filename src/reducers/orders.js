import actions from '../actions'

const defaultState = {}

const reducer = (state = defaultState, { type, data }) => {
  switch (type) {
    case actions.set_orders:
      return {
        ...state,
        [data.key]: data.value
      }
    default: return state
  }
}

export default reducer
