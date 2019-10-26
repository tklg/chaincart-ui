import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import ErrorBoundary from './ErrorBoundary'
import { createBrowserHistory } from 'history'
import { routerMiddleware, ConnectedRouter as Router } from 'connected-react-router'
import reducers from './reducers'
import App from './App'

const history = createBrowserHistory({
  basename: '/app/'
})

const store = createStore(
  reducers(history),
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    )
  )
)

ReactDOM.render(<ErrorBoundary>
  <Provider store={store}>
    <Router history={history} >
      <App />
    </Router>
  </Provider>
</ErrorBoundary>, document.getElementById('app'))
