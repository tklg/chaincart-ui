import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import storefronts from './storefronts'
import orders from './orders'
import actions from '../actions'

const defaultState = {
  working: [],
  error: '',
  success: ''
}
const appState = (state = defaultState, { type, data }) => {
  switch (type) {
    case actions.set_working:
      if (data.action === 'start') {
        return {
          ...state,
          working: state.working.concat(data.uuid)
        }
      } else {
        return {
          ...state,
          working: state.working.filter(x => x !== data.uuid)
        }
      }
    case actions.set_error:
      return {
        ...state,
        error: data
      }
    case actions.set_success:
      return {
        ...state,
        success: data
      }
    default: return state
  }
}

export default history => combineReducers({
  router: connectRouter(history),
  app: appState,
  storefronts,
  orders
})
