import React, { Component } from 'react'
import { connect } from 'react-redux'
import { money } from '../util'
import './dashboard.scss'

class Products extends Component {
  renderProductRow (product, i, a) {
    return (
      <tr key={i}>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{money.fmt(product.price)}</td>
        <td>{product.available}</td>
        <td>{product.sku}</td>
      </tr>
    )
  }
  render () {
    return (
      <div className='dashboard products'>
        <nav className='flex-container'>
          <h1 className='flex'>Products</h1>
          <button className='btn'>Add product</button>
        </nav>
        <table cellSpacing='0' cellPadding='0' className='hover'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Available</th>
              <th>SKU</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(this.renderProductRow)}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ storefronts }, props) => {
  return {
    store: storefronts.stores.find(x => x.id === props.id),
    products: storefronts.products[props.id]
  }
}

export default connect(mapStateToProps)(Products)
