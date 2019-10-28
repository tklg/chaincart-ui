import { api } from '../util'
import { push } from 'connected-react-router'
import { workstate } from './'

const _actions = [
  'set_discounts',
  'remove_discount',
  'edit_discount',
  'add_discount'
]
const actions = {}

export const fetchDiscounts = (storeID) => (dispatch, getState) => {
  workstate(dispatch, async () => {
    const res = await api.get('/stores/' + storeID + '/discounts')

    dispatch({
      type: actions.set_discounts,
      data: {
        key: storeID,
        value: res
      }
    })
  })
}

export const deleteDiscount = (storeID, discountHash) => (dispatch, getState) => {
  workstate(dispatch, async () => {
    await api.delete('/stores/' + storeID + '/discounts/' + discountHash)

    dispatch({
      type: actions.remove_discount,
      data: {
        key: storeID,
        value: discountHash
      }
    })
    dispatch(push('../discounts'))
  })
}

export const saveDiscount = (storeID, discountHash, data) => (dispatch, getState) => {
  workstate(dispatch, async () => {
    await api.patch('/stores/' + storeID + '/discounts/' + discountHash, data)

    dispatch({
      type: actions.edit_discount,
      data: {
        key: storeID,
        key2: discountHash,
        value: data
      }
    })
    dispatch(push('../discounts'))
  })
}

export const createDiscount = (storeID, data) => (dispatch, getState) => {
  workstate(dispatch, async () => {
    const res = await api.post('/stores/' + storeID + '/discounts', data)

    dispatch({
      type: actions.add_discount,
      data: {
        key: storeID,
        value: res
      }
    })
    dispatch(push('../discounts'))
  })
}

for (const a of _actions) {
  actions[a] = a
}
export default actions
