import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from '../Header'
import Storefronts from '../Storefronts'
import './index.scss'

export default class App extends Component {
  render () {
    return (
      <Router basepath='/'>
        <Route path='/'>
          <Header />
          <Storefronts />
        </Route>
      </Router>
    )
  }
}
