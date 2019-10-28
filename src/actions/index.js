import { api } from '../util'
import uuid from 'uuid/v4'
import { push } from 'connected-react-router'
import products from './products'
import customization from './customization'
import orders from './orders'
export * from './products'
export * from './customization'
export * from './orders'

let successTimer
const _actions = [
  'set_working',
  'set_error',
  'set_success',
  'set_storefronts',
  'add_storefront',
  'create_storefront'
]
const actions = {
  ...products,
  ...customization,
  ...orders
}

export const setError = (str) => ({
  type: actions.set_error,
  data: str
})

export const doSuccess = (str) => (dispatch) => {
  dispatch({
    type: 'set_success',
    data: str
  })
  clearTimeout(successTimer)
  successTimer = setTimeout(() => {
    dispatch({
      type: 'set_success',
      data: ''
    })
  }, 3000)
}

export const loadStorefronts = (data) => (dispatch, getState) => {
  workstate(dispatch, async () => {
    const res = await api.get('/stores')
    dispatch({
      type: actions.set_storefronts,
      data: res
    })
  })
}

export const createStorefront = (data) => (dispatch, getState) => {
  workstate(dispatch, async () => {
    const res = await api.post('/stores/create', data)
    dispatch({
      type: actions.add_storefront,
      data: res
    })
    dispatch(push('../../'))
  })
}

export const workstate = async (dispatch, fn) => {
  const uid = uuid()
  dispatch({
    type: actions.set_working,
    data: {
      action: 'start',
      uuid: uid
    }
  })
  dispatch({
    type: actions.set_error,
    data: ''
  })
  try {
    return await fn()
  } catch (e) {
    console.warn(e)
    dispatch({
      type: actions.set_error,
      data: e.toString().substr(6)
    })
  } finally {
    dispatch({
      type: actions.set_working,
      data: {
        action: 'stop',
        uuid: uid
      }
    })
  }
}

for (const a of _actions) {
  actions[a] = a
}
export default actions
