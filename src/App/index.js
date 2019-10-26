import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header'
import Storefronts from '../Storefronts'
import Storefront from '../Storefront'
import './index.scss'

export default class App extends Component {
  render () {
    return (
      <div className='app flex-container flex-vertical'>
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
