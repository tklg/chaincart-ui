import actions from '../actions'

const defaultState = {
  stores: [/*{
    id: 'a', name: 'Test', items: 2, sales: 5000, revenue: 5000, cartType: 0, drawerDirection: 1
  }, {
    id: 'b', name: 'Test 2', items: 2, sales: 50, revenue: 50, cartType: 1, drawerDirection: 1
  }*/],
  products: {/*
    a: [{
      id: '1', name: 'test', description: 'abc', price: 2500, available: 1, infinite: false, sku: 'SKU-abc'
    }, {
      id: '2', name: 'test 2', description: 'abc 2', price: 250, available: 0, infinite: true, sku: 'SKU-123'
    }]
  */},
  customization: {
    a: {
      primary: '#484848',
      primaryText: '#ffffff',
      secondary: '#dddddd',
      secondaryText: '#555555',
      accent: '#81C41D',
      accentText: '#ffffff',
      css: ``
    }
  },
  /*orders: {
    a: [{
      id: '1', customer: { name: 'customer 1' }, price: 2500, products: [{ id: '2', name: 'test 2', price: 250, count: 1 }], status: 'delivered', createdAt: Date.now() - (60 * 1000 * 45), discount: null
    }, {
      id: '2', customer: { name: 'customer 2' }, price: 25, products: [{ id: '2', name: 'test 2', price: 250, count: 2 }, { id: '1', name: 'test', price: 2500, count: 1 }], status: 'delivered', createdAt: Date.now() - (60 * 1000 * 35), discount: { id: '2', code: 'm10' }
    }]
  },*/
  discounts: {
    a: [{
      id: '1', code: 'save10', type: 0, amount: 1000, uses: 1, exemptProducts: [{ id: '1', name: 'test' }], createdAt: Date.now() - (60 * 1000 * 45), validFrom: Date.now() - 10000, validTo: Date.now() + 1000
    }, {
      id: '2', code: 'm10', type: 1, amount: 1000, uses: 2, exemptProducts: [], createdAt: Date.now() - (60 * 1000 * 35), validFrom: Date.now() - 10000, validTo: Date.now() + 1000
    }]
  }
}

const reducer = (state = defaultState, { type, data }) => {
  let index, stores, store

  switch (type) {
    case actions.set_storefronts:
      return {
        ...state,
        stores: data
      }
    case actions.add_storefront:
      return {
        ...state,
        stores: state.stores.concat(data)
      }
    case actions.set_products:
      return {
        ...state,
        products: {
          ...state.products,
          [data.key]: data.value
        }
      }
    case actions.add_product:
      return {
        ...state,
        products: {
          ...state.products,
          [data.key]: state.products[data.key].concat(data.value)
        }
      }
    case actions.remove_product:
      return {
        ...state,
        products: {
          ...state.products,
          [data.key]: state.products[data.key].filter(x => x.hash !== data.value)
        }
      }
    case actions.edit_product:
      const products = [...state.products[data.key]]
      index = products.findIndex(x => x.hash === data.key2)
      const item = products[index]
      products[index] = {
        ...item,
        ...data.value
      }
      return {
        ...state,
        products: {
          ...state.products,
          [data.key]: products
        }
      }
    case actions.save_colors:
      const stores = [...state.stores]
      index = stores.findIndex(x => x.id === data.key)
      let store = stores[index]
      store = {
        ...store,
        ...data.value
      }
      stores[index] = store
      return {
        ...state,
        stores: stores
      }
    default: return state
  }
}

export default reducer
