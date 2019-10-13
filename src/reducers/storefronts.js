const defaultState = {
  stores: [{
    id: 'a', name: 'Test', items: 2, sales: 5000, revenue: 5000
  }, {
    id: 'b', name: 'Test 2', items: 2, sales: 50, revenue: 50
  }],
  products: {
    a: [{
      name: 'test', description: 'abc', price: 2500, available: 1, sku: 'abc'
    }, {
      name: 'test 2', description: 'abc 2', price: 2500, available: 'yes', sku: 'abc'
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
  }
}

const reducer = (state = defaultState, action) => {
  return state
}

export default reducer
