import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { setError } from '../actions'
import Header from '../Header'
import Storefronts from '../Storefronts'
import Storefront from '../Storefront'
import './index.scss'

class App extends Component {
  render () {
    return (
      <div className='app flex-container flex-vertical'>
        <div className='popover-container'>
          <div className={'error' + (this.props.error ? ' active' : '')} onClick={e => this.props.dispatch(setError(''))}>
            {this.props.error}
          </div>
          <div className={'success' + (this.props.success ? ' active' : '')} onClick={e => this.props.dispatch(setError(''))}>
            {this.props.success}
          </div>
        </div>
        <Header />
        <Switch>
          <Route path='/(store/create)?' exact>
            <Storefronts />
          </Route>
          <Route
            path='/store/:id'
            render={({ match }) => (
              match.params.id === 'create'
                ? null
                : <Storefront id={match.params.id} />
            )} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ app }) => {
  return {
    error: app.error,
    success: app.success
  }
}

export default connect(mapStateToProps)(App)
