import React, { Component } from 'react'
import { connect } from 'react-redux'
import { money } from '../util'
import './dashboard.scss'

class Orders extends Component {
  renderOrderRow (o, i, a) {
    return (
      <tr key={i}>
        <td>{o.customer.name}</td>
        <td>{money.fmt(o.price)}</td>
        <td>{o.items.length}</td>
        <td>{o.discount ? o.discount.code : ''}</td>
        <td>{o.createdAt}</td>
      </tr>
    )
  }
  render () {
    return (
      <div className='dashboard orders'>
        <h1>Orders</h1>
        <table cellSpacing='0' cellPadding='0' className='hover'>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Price</th>
              <th># Items</th>
              <th>Discount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.orders.map(this.renderOrderRow)}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ storefronts }, props) => {
  return {
    store: storefronts.stores.find(x => x.id === props.id),
    orders: storefronts.orders[props.id]
  }
}

export default connect(mapStateToProps)(Orders)
