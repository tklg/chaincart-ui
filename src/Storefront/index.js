import React, { Component } from 'react'
import { NavLink, Link, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Dashboard from './dashboard'
import Products from './products'
import Customization from './customization'
import Orders from './orders'
import Discounts from './discounts'
import Settings from './settings'
import Icon from '@mdi/react'
import { mdiChevronLeft } from '@mdi/js'
import { loadStorefronts } from '../actions'
import './index.scss'

const pages = [{ name: 'Dashboard', component: Dashboard },
  { name: 'Products', component: Products },
  { name: 'Customization', component: Customization },
  { name: 'Orders', component: Orders },
  { name: 'Discounts', component: Discounts },
  { name: 'Settings', component: Settings }]

class Storefront extends Component {
  componentDidMount () {
    if (!this.props.store) this.props.dispatch(loadStorefronts())
  }
  render () {
    return (
      <div className='storefront flex'>
        <div className='width-limit flex-container'>
          <nav className='left-nav flex-container flex-vertical'>
            <Link to='/' className='nav-header'><h1>
              <Icon path={mdiChevronLeft} />
              <span>Back to Storefronts</span>
            </h1></Link>
            {pages.map((page, i) => (<NavLink key={i} className='btn btn-clear' to={`/store/${this.props.id}/${page.name.toLowerCase()}`}>{page.name}</NavLink>))}
          </nav>
          <div className='content flex'>
            {this.props.store &&
              <Switch>
                {pages.map((page, i) => (

                  <Route
                    key={i}
                    path={`/store/:id/${page.name}`}
                    render={({ match }) => (
                      <page.component id={match.params.id} />
                    )} />
                ))}
              </Switch>
            }
            {!this.props.store && <div className='loading'>Loading</div>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ storefronts }, props) => {
  return {
    store: storefronts.stores.find(x => x.id === props.id)
  }
}

export default connect(mapStateToProps)(Storefront)
