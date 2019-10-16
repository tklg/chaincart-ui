import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import storefronts from './storefronts'

export default history => combineReducers({
  router: connectRouter(history),
  storefronts
})
