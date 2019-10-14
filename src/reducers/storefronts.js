const defaultState = {
  stores: [{
    id: 'a', name: 'Test', items: 2, sales: 5000, revenue: 5000
  }, {
    id: 'b', name: 'Test 2', items: 2, sales: 50, revenue: 50
  }],
  products: {
    a: [{
      id: 1, name: 'test', description: 'abc', price: 2500, available: 1, sku: 'abc'
    }, {
      id: 2, name: 'test 2', description: 'abc 2', price: 2500, available: 'yes', sku: 'abc'
    }]
  },
  customization: {
    a: {
      primary: '#af00ff',
      primaryText: '#ffffff',
      secondary: '#dddddd',
      secondaryText: '#555555',
      accent: '#ff5722',
      accentText: '#ffffff'
    }
  },
  orders: {
    a: [{
      id: 1, customer: { name: 'customer 1' }, price: 2500, items: [], createdAt: Date.now() - (60 * 1000 * 45), discount: null
    }, {
      id: 2, customer: { name: 'customer 2' }, price: 25, items: [], createdAt: Date.now() - (60 * 1000 * 35), discount: { id: 2, code: 'm10' }
    }]
  },
  discounts: {
    a: [{
      id: 1, code: 'save10', type: 'percent', amount: 10, uses: 1, exemptProducts: [{ id: 1, name: 'test' }], createdAt: Date.now() - (60 * 1000 * 45)
    }, {
      id: 2, code: 'm10', type: 'subtract', amount: 1000, uses: 2, exemptProducts: [], createdAt: Date.now() - (60 * 1000 * 35)
    }]
  },
  settings: {
    a: {

    }
  }
}

const reducer = (state = defaultState, action) => {
  return state
}

export default reducer
