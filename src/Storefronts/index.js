import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { money } from '../util'
import Modal from '../Modal'
import './index.scss'

class Storefronts extends Component {
  constructor () {
    super()
    this.renderStorefront = this.renderStorefront.bind(this)
  }

  renderStorefront (data, i) {
    return (
      <Link key={i} className='tile hover' to={`store/${data.id}/dashboard`}>
        <h2 className='flex'>{data.name}</h2>
        <div className='stats'>
          <div className='stat'>
            <span className='stat-key'>Products</span>
            <span className='stat-value'>{data.items}</span>
          </div>
          <div className='stat'>
            <span className='stat-key'>Sales</span>
            <span className='stat-value'>{data.sales}</span>
          </div>
          <div className='stat'>
            <span className='stat-key'>Revenue</span>
            <span className='stat-value'>{money.fmt(data.revenue)}</span>
          </div>
        </div>
      </Link>
    )
  }

  render () {
    return (
      <div className='storefronts flex'>
        <div className='width-limit'>
          <nav className='flex-container'>
            <h1 className='flex'>Your storefronts</h1>
            <Link className='btn' to='/store/create'>Create</Link>
          </nav>
          <div className='tiles'>
            {this.props.stores.map(this.renderStorefront)}
          </div>
        </div>

        <Route path='/store/create' children={({ match }) => {
          return (
            <Modal
              className='small'
              active={match !== null}
              onClose={e => this.props.dispatch(push('../../'))}
              onSave={data => console.log(data)}
              data={modalData(null)} />
          )
        }} />
      </div>
    )
  }
}

const mapStateToProps = ({ storefronts }, props) => {
  return {
    stores: storefronts.stores
  }
}

const modalData = () => ({
  header: {
    title: 'Open a new storefront',
    subtitle: ''
  },
  footer: {},
  values: [{
    name: 'Name',
    value: '',
    component: {
      type: 'input',
      props: {
        placeholder: 'Store name'
      }
    }
  }]
})

export default connect(mapStateToProps)(Storefronts)
