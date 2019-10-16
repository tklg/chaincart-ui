import React, { Component } from 'react'
import { connect } from 'react-redux'
import { money } from '../util'
import './dashboard.scss'

class Discounts extends Component {
  renderDiscountRow (o, i, a) {
    const amount = o.type === 'percent' ? `${o.amount}% off` : `${money.fmt(o.amount)} off`
    return (
      <tr key={i}>
        <td>{o.code}</td>
        <td>{amount}</td>
        <td>{o.uses === -1 ? '' : o.uses}</td>
        <td>{o.exemptProducts.length}</td>
        <td>{o.expired ? 'Yes' : ''}</td>
      </tr>
    )
  }
  render () {
    return (
      <div className='dashboard discounts'>
        <nav className='flex-container'>
          <h1 className='flex'>Discounts</h1>
          <input placeholder='Search' />
          <button className='btn'>Create discount</button>
        </nav>
        <table cellSpacing='0' cellPadding='0' className='hover'>
          <thead>
            <tr>
              <th>Code</th>
              <th>Amount</th>
              <th>Remaining</th>
              <th>Exempt products</th>
              <th>Expired</th>
            </tr>
          </thead>
          <tbody>
            {this.props.discounts.map(this.renderDiscountRow)}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ storefronts }, props) => {
  return {
    store: storefronts.stores.find(x => x.id === props.id),
    discounts: storefronts.discounts[props.id]
  }
}

export default connect(mapStateToProps)(Discounts)
