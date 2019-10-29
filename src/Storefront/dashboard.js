import React, { Component } from 'react'
import { connect } from 'react-redux'
import { money } from '../util'
import './dashboard.scss'

class Dashboard extends Component {
  render () {
    const { store } = this.props
    if (!store) return <div />
    return (
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <div className='tiles tiles-3'>
          <div className='tile flex-container flex-center'>
            <span className='key'>Sales</span>
            <span className='value'>{store.orderCount || 0}</span>
          </div>
          <div className='tile flex-container flex-center'>
            <span className='key'>Revenue</span>
            <span className='value'>{money.fmt(store.revenue || 0)}</span>
          </div>
          <div className='tile flex-container flex-center'>
            <span className='key'>Customers</span>
            <span className='value'>{store.customerCount || 0}</span>
          </div>
          <div className='tile flex-container flex-center'>
            <span className='key'>Average purchase</span>
            <span className='value'>{money.fmt(store.averagePurchase || 0)}</span>
          </div>
          {/*<div className='tile flex-container flex-center'>
            <span className='key'>Discounts</span>
            <span className='value'>{money.fmt(0)}</span>
          </div>
          <div className='tile flex-container flex-center'>
            <span className='key'>Recovered</span>
            <span className='value'>{money.fmt(0)}</span>
          </div>*/}
        </div>

        <h1>Sales over time</h1>
        <div className='graph'>
          <div className='graph-content'>
            graph
          </div>
        </div>

        <h1>Purchase completion</h1>
        <div className='graph'>
          <div className='graph-content'>
            created -> complete or abandoned cart
          </div>
        </div>

        <h1>Recovered from campaigns</h1>
        <div className='graph'>
          <div className='graph-content'>
            abandoned -> recovered carts
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ storefronts }, props) => {
  return {
    store: storefronts.find(x => x.id === props.id)
  }
}

export default connect(mapStateToProps)(Dashboard)
