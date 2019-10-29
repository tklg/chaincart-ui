import React, { Component } from 'react'
import { connect } from 'react-redux'
import { money } from '../util'
import { Route, Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import Modal from '../Modal'
import { Checkbox } from '../Input'
import { doSuccess, createProduct, fetchProducts, deleteProduct, saveProduct } from '../actions'
import './dashboard.scss'

class Products extends Component {
  constructor () {
    super()
    this.renderProductRow = this.renderProductRow.bind(this)
    this.onButtonInputClick = this.onButtonInputClick.bind(this)
  }
  componentDidMount () {
    if (!this.props.products.length) this.props.dispatch(fetchProducts(this.props.store.id))
  }
  onButtonInputClick (e) {
    e.stopPropagation()
    e.target.select()
    document.execCommand('copy')
    this.props.dispatch(doSuccess('Copied to clipboard'))
  }
  renderProductRow (product, i, a) {
    return (
      <tr key={i} onClick={e => this.props.dispatch(push(`/store/${this.props.store.id}/products/${product.hash}`))}>
        <td>{product.name}</td>
        <td className='hide-small'>{product.description}</td>
        <td>{money.fmt(product.price)}</td>
        <td>{product.infinite ? 'Infinite' : product.available}</td>
        <td><input onClick={this.onButtonInputClick} defaultValue={`<button data-ccart-product="${product.hash}">Add to Cart</button>`} /></td>
      </tr>
    )
  }
  render () {
    return (
      <div className='dashboard products'>
        <nav className='flex-container'>
          <h1 className='flex'>Products</h1>
          <input placeholder='Search' />
          <Link className='btn' to='products/create'>Add product</Link>
        </nav>
        {this.props.products.length ? <div className='table-container'>
          <table cellSpacing='0' cellPadding='0' className='hover'>
            <thead>
              <tr>
                <th>Name</th>
                <th className='hide-small'>Description</th>
                <th>Price</th>
                <th>Available</th>
                <th>Button code</th>
              </tr>
            </thead>
            <tbody>
              {this.props.products.map(this.renderProductRow)}
            </tbody>
          </table>
        </div> : <div className='table-empty'>No products added</div>}

        <Route path='/store/*/products/create' children={({ match }) => {
          return (
            <Modal
              active={match !== null}
              onClose={e => this.props.dispatch(push('../products'))}
              onSave={data => this.props.dispatch(createProduct(this.props.store.id, data))}
              data={modalData(null)} />
          )
        }} />
        <Route path='/store/*/products/:id' children={({ match }) => {
          if (match && match.params.id === 'create') return null
          const product = match ? this.props.products.find(x => x.hash === match.params.id) : null
          return (
            <Modal
              active={product !== null}
              onDelete={e => this.props.dispatch(deleteProduct(this.props.store.id, product.hash))}
              onClose={e => this.props.dispatch(push('../products'))}
              onSave={data => this.props.dispatch(saveProduct(this.props.store.id, product.hash, data))}
              data={product ? modalData(product) : null} />
          )
        }} />
      </div>
    )
  }
}

const modalData = product => ({
  id: product ? product.id : 'create',
  header: {
    title: product ? product.name : 'New product',
    subtitle: product ? product.sku : ''
  },
  footer: {
    hideDelete: product ? false : true
  },
  values: [{
    name: 'Product name',
    key: 'name',
    value: product ? product.name : '',
    component: {
      type: 'input',
      props: {
        required: true,
        placeholder: 'My product'
      }
    }
  }, {
    name: 'Description',
    key: 'description',
    value: product ? product.description : '',
    component: {
      type: 'textarea',
      props: {
        placeholder: 'Describe it!'
      }
    }
  }, {
    name: 'Price',
    key: 'price',
    value: product ? product.price : 0,
    convert: {
      from (x) { return x * 100 },
      to (x) { return x / 100 }
    },
    component: {
      type: 'input',
      props: {
        type: 'number',
        placeholder: '0.00'
      }
    }
  }, {
    name: 'Stock',
    key: 'available',
    value: product ? product.available : 0,
    component: {
      type: 'input',
      props: {
        type: 'number',
        placeholder: '0'
      }
    }
  }, {
    name: 'Infinite stock?',
    key: 'infinite',
    value: product ? product.infinite : false,
    component: {
      type: Checkbox,
      props: {
        id: 'product-infinite-' + (product ? product.id : 'create')
      }
    }
  }]
})

const mapStateToProps = ({ storefronts, products }, props) => {
  return {
    store: storefronts.find(x => x.id === props.id),
    products: products[props.id] || []
  }
}

export default connect(mapStateToProps)(Products)
