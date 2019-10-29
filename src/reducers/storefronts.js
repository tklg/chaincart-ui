import actions from '../actions'

const defaultState = []

const reducer = (state = defaultState, { type, data }) => {
  let index, stores

  switch (type) {
    case actions.set_storefronts:
      return data

    case actions.add_storefront:
      return state.stores.concat(data)

    case actions.delete_storefront:
      return state.stores.filter(x => x.id !== data)

    case actions.edit_storefront:
      stores = [...state]
      index = stores.findIndex(x => x.id === data.key)
      let store = stores[index]
      store = {
        ...store,
        ...data.value
      }
      stores[index] = store
      console.log(stores)
      return stores

    default: return state
  }
}

export default reducer
