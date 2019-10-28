import React, { Component } from 'react'
import { connect } from 'react-redux'
import { money, time } from '../util'
import { Route, Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import { fetchOrders } from '../actions'
import Modal from '../Modal'
import './dashboard.scss'

class Orders extends Component {
  constructor () {
    super()
    this.renderOrderRow = this.renderOrderRow.bind(this)
  }
  componentDidMount () {
    if (!this.props.orders.length) this.props.dispatch(fetchOrders(this.props.store.id))
  }
  renderOrderRow (o, i, a) {
    return (
      <tr key={i} onClick={e => this.props.dispatch(push(`/store/${this.props.store.id}/orders/${o.id}`))}>
        <td>{o.customer.name}</td>
        <td>{money.fmt(o.price)}</td>
        <td>{o.products.length}</td>
        <td>{o.status}</td>
        <td>{time.fmt(o.createdAt)}</td>
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
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.orders.map(this.renderOrderRow)}
          </tbody>
        </table>

        <Route path='/store/*/orders/:id' children={({ match }) => {
          const order = match ? this.props.orders.find(x => x.id === match.params.id) : null
          return (
            <Modal
              active={match !== null}
              onClose={e => this.props.dispatch(push('../orders'))}
              onSave={data => console.log(data)}
              data={order ? {
                header: {
                  title: `Order ${order.id}`,
                  subtitle: order.status
                },
                footer: {
                  buttons: [{
                    title: 'close',
                    onClick: (e) => this.props.dispatch(push('../orders'))
                  }]
                },
                values: [{
                  name: 'Customer',
                  component: {
                    type: 'span',
                    props: {
                      children: order.customer.name
                    }
                  }
                }, {
                  name: 'Price',
                  component: {
                    type: 'span',
                    props: {
                      children: money.fmt(order.price)
                    }
                  }
                }, {
                  name: 'Products',
                  component: {
                    type: 'ul',
                    props: {
                      className: 'rows hover dividers',
                      children: order.products.map((x, i) => <li key={i} className='row' onClick={e => this.props.dispatch(push(`../products/${x.id}`))}><span>{x.name}</span><span>{money.fmt(x.price)}</span><span>{`x${x.count}`}</span></li>)
                    }
                  }
                }, {
                  name: 'Discount',
                  component: {
                    type: Link,
                    props: {
                      to: `../discounts/${order.discount && order.discount.id}`,
                      children: order.discount ? order.discount.code : null
                    }
                  }
                }, {
                  name: 'Created at',
                  component: {
                    type: 'span',
                    props: {
                      children: time.fmt(order.createdAt)
                    }
                  }
                }]
              } : null} />
          )
        }} />
      </div>
    )
  }
}

const mapStateToProps = ({ storefronts, orders }, props) => {
  return {
    store: storefronts.stores.find(x => x.id === props.id),
    orders: orders[props.id] || []
  }
}

export default connect(mapStateToProps)(Orders)
