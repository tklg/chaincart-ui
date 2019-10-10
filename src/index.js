import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import ErrorBoundary from './ErrorBoundary'
import reducers from './reducers'
import App from './App'

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

ReactDOM.render(<ErrorBoundary>
  <Provider store={store}>
    <App />
  </Provider>
</ErrorBoundary>, document.getElementById('app'))
