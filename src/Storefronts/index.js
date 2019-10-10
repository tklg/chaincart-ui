import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { money } from '../util'
import './index.scss'

const stores = [{
  name: 'Test', items: 2, sales: 5000, revenue: 5000
}, {
  name: 'Test 2', items: 2, sales: 50, revenue: 50
}]

export default class Storefronts extends Component {
  constructor () {
    super()
    this.renderStorefront = this.renderStorefront.bind(this)
  }

  renderStorefront (data, i) {
    return (
      <Link key={i} className='storefront' to={`store/${data.id}`}>
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
      <div className='storefronts'>
        <div className='width-limit'>
          <nav className='flex-container'>
            <h1 className='flex'>Your storefronts</h1>
            <button className='btn'>Create</button>
          </nav>
          <div className='items'>
            {stores.map(this.renderStorefront)}
          </div>
        </div>
      </div>
    )
  }
}
