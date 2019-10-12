import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from '../Header'
import Storefronts from '../Storefronts'
import Storefront from '../Storefront'
import './index.scss'

export default class App extends Component {
  render () {
    return (
      <Router basepath='/'>
        <Header />
        <Route path='/' exact>
          <Storefronts />
        </Route>
        <Route
          path='/store/:id'
          render={({ match }) => (
            <Storefront id={match.params.id} />
          )} />
      </Router>
    )
  }
}
