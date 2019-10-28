import { api } from '../util'
import { push } from 'connected-react-router'
import { workstate } from './'

const _actions = [
  'fetch_products',
  'set_products',
  'add_product',
  'remove_product',
  'edit_product'
]
const actions = {}

export const fetchProducts = (storeID) => (dispatch, getState) => {
  workstate(dispatch, async () => {
    const res = await api.get('/stores/' + storeID + '/products')

    dispatch({
      type: actions.set_products,
      data: {
        key: storeID,
        value: res
      }
    })
  })
}

export const createProduct = (storeID, data) => (dispatch, getState) => {
  workstate(dispatch, async () => {
    const res = await api.post('/stores/' + storeID + '/products', data)
    dispatch({
      type: actions.add_product,
      data: {
        key: storeID,
        value: res
      }
    })
    dispatch(push('../products'))
  })
}

export const deleteProduct = (storeID, productID) => (dispatch, getState) => {
  workstate(dispatch, async () => {
    await api.delete('/stores/' + storeID + '/products/' + productID)
    dispatch({
      type: actions.remove_product,
      data: {
        key: storeID,
        value: productID
      }
    })
    dispatch(push('../products'))
  })
}

export const saveProduct = (storeID, productID, data) => (dispatch, getState) => {
  workstate(dispatch, async () => {
    await api.patch('/stores/' + storeID + '/products/' + productID, data)
    dispatch({
      type: actions.edit_product,
      data: {
        key: storeID,
        key2: productID,
        value: data
      }
    })
    dispatch(push('../products'))
  })
}

for (const a of _actions) {
  actions[a] = a
}
export default actions
