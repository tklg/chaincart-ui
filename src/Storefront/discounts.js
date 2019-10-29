import React, { Component } from 'react'
import { connect } from 'react-redux'
import { money } from '../util'
import { Route, Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import Modal from '../Modal'
import { Select } from '../Input'
import { createDiscount, fetchDiscounts, deleteDiscount, saveDiscount } from '../actions'
import './dashboard.scss'

const dateInputConvert = {
  from (x) { return +((new Date(x)).getTime() / 1000).toFixed(2) },
  to (x) { return (new Date(x * 1000)).toISOString().substr(0, 10) }
}

class Discounts extends Component {
  constructor () {
    super()
    this.renderDiscountRow = this.renderDiscountRow.bind(this)
  }
  componentDidMount () {
    if (!this.props.discounts.length) this.props.dispatch(fetchDiscounts(this.props.store.id))
  }
  renderDiscountRow (o, i, a) {
    const amount = o.type === 0 ? `${o.amount / 100}% off` : `${money.fmt(o.amount)} off`
    const now = Date.now()
    return (
      <tr key={i} onClick={e => this.props.dispatch(push(`discounts/${o.hash}`))}>
        <td>{o.code}</td>
        <td>{amount}</td>
        <td>{o.uses === -1 ? '' : o.uses}</td>
        {/*<td>{o.exemptProducts.length}</td>*/}
        <td>{+o.validFrom <= now && now < +o.validTo ? 'Yes' : ''}</td>
      </tr>
    )
  }
  render () {
    return (
      <div className='dashboard discounts'>
        <nav className='flex-container'>
          <h1 className='flex'>Discounts</h1>
          <input placeholder='Search' />
          <Link className='btn' to='discounts/create'>Create discount</Link>
        </nav>
        {this.props.discounts.length ? <div className='table-container'>
          <table cellSpacing='0' cellPadding='0' className='hover'>
            <thead>
              <tr>
                <th>Code</th>
                <th>Amount</th>
                <th>Remaining</th>
                {/*<th>Exempt products</th>*/}
                <th>Expired</th>
              </tr>
            </thead>
            <tbody>
              {this.props.discounts.map(this.renderDiscountRow)}
            </tbody>
          </table>
        </div> : <div className='table-empty'>No discounts created</div>}

        <Route path='/store/*/discounts/create' children={({ match }) => {
          return (
            <Modal
              active={match !== null}
              onClose={e => this.props.dispatch(push('../discounts'))}
              onSave={data => this.props.dispatch(createDiscount(this.props.store.id, data))}
              data={modalData(null)} />
          )
        }} />
        <Route path='/store/*/discounts/:id' children={({ match }) => {
          if (match && match.params.id === 'create') return null
          const discount = match ? this.props.discounts.find(x => x.hash === match.params.id) : null
          return (
            <Modal
              active={match !== null}
              onDelete={e => this.props.dispatch(deleteDiscount(this.props.store.id, discount.hash))}
              onClose={e => this.props.dispatch(push('../discounts'))}
              onSave={data => this.props.dispatch(saveDiscount(this.props.store.id, discount.hash, data))}
              data={discount ? modalData(discount) : null} />
          )
        }} />
      </div>
    )
  }
}

const modalData = discount => ({
  header: {
    title: discount ? discount.code : 'Create discount code',
    subtitle: discount ? discount.hash : ''
  },
  footer: {
    hideDelete: discount ? false : true
  },
  values: [{
    name: 'Code',
    value: discount ? discount.code : '',
    component: {
      type: 'input',
      props: {
        placeholder: 'SAVEBIG'
      }
    }
  }, {
    name: 'Amount',
    value: discount ? discount.amount : 0,
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
    name: 'Discount type',
    key: 'type',
    value: discount ? discount.type : 1,
    component: {
      type: Select,
      props: {
        items: ['Percent off', 'Dollars off']
      }
    }
  }, {
    name: 'Uses remaining',
    key: 'uses',
    value: discount ? discount.uses : 100,
    component: {
      type: 'input',
      props: {
        type: 'number'
      }
    }
  }, {
    name: 'Valid from',
    key: 'validFrom',
    value: discount ? +discount.validFrom : +(Date.now() / 1000).toFixed(0),
    convert: dateInputConvert,
    component: {
      type: 'input',
      props: {
        type: 'date'
      }
    }
  }, {
    name: 'Valid to',
    key: 'validTo',
    value: discount ? +discount.validTo : (+(Date.now() / 1000).toFixed(0) + (60 * 60 * 24 * 7)), // 1 week
    convert: dateInputConvert,
    component: {
      type: 'input',
      props: {
        type: 'date'
      }
    }
  }/*, {
    name: 'Exempt products',
    key: 'exemptProducts',
    value: 0,
    component: {
      type: 'ul',
      props: {
        children: ''
      }
    }
  }*/]
})

const mapStateToProps = ({ storefronts, discounts }, props) => {
  return {
    store: storefronts.find(x => x.id === props.id),
    discounts: discounts[props.id] || []
  }
}

export default connect(mapStateToProps)(Discounts)
