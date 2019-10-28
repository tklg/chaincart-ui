import { api } from '../util'
import { workstate } from './'

const _actions = [
  'set_orders'
]
const actions = {}

export const fetchOrders = (storeID) => (dispatch, getState) => {
  workstate(dispatch, async () => {
    const res = await api.get('/stores/' + storeID + '/purchases')

    dispatch({
      type: actions.set_orders,
      data: {
        key: storeID,
        value: res
      }
    })
  })
}

for (const a of _actions) {
  actions[a] = a
}
export default actions
