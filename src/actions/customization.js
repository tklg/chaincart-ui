import { api } from '../util'
import { workstate, doSuccess } from './'

const _actions = [
  'edit_storefront'
]
const actions = {}

export const saveCustomization = (storeID, data) => (dispatch, getState) => {
  workstate(dispatch, async () => {
    await api.patch('/stores/' + storeID, {
      colors: data
    })

    dispatch({
      type: actions.edit_storefront,
      data: {
        key: storeID,
        value: data
      }
    })
    dispatch(doSuccess('Settings saved'))
  })
}

for (const a of _actions) {
  actions[a] = a
}
export default actions
