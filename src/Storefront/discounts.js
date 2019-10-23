import React, { Component } from 'react'
import { connect } from 'react-redux'
import { money } from '../util'
import { Route, Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import Modal from '../Modal'
import { Select } from '../Input'
import './dashboard.scss'

const dateInputConvert = {
  from (x) { return (new Date(x)).getTime() },
  to (x) { return (new Date(x)).toISOString().substr(0, 10) }
}

class Discounts extends Component {
  constructor () {
    super()
    this.renderDiscountRow = this.renderDiscountRow.bind(this)
  }
  renderDiscountRow (o, i, a) {
    const amount = o.type === 'percent' ? `${o.amount}% off` : `${money.fmt(o.amount)} off`
    const now = Date.now()
    return (
      <tr key={i} onClick={e => this.props.dispatch(push(`discounts/${o.id}`))}>
        <td>{o.code}</td>
        <td>{amount}</td>
        <td>{o.uses === -1 ? '' : o.uses}</td>
        {/*<td>{o.exemptProducts.length}</td>*/}
        <td>{o.validFrom <= now && now < o.validTo ? 'Yes' : ''}</td>
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

        <Route path='/store/*/discounts/create' children={({ match }) => {
          return (
            <Modal
              active={match !== null}
              onClose={e => this.props.dispatch(push('../discounts'))}
              onSave={data => console.log(data)}
              data={modalData(null)} />
          )
        }} />
        <Route path='/store/*/discounts/:id' children={({ match }) => {
          if (match && match.params.id === 'create') return null
          const discount = match ? this.props.discounts.find(x => x.id === match.params.id) : null
          return (
            <Modal
              active={match !== null}
              onClose={e => this.props.dispatch(push('../discounts'))}
              onSave={data => console.log(data)}
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
    subtitle: discount ? discount.id : ''
  },
  footer: {},
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
    value: discount ? discount.validFrom : Date.now(),
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
    value: discount ? discount.validTo : Date.now() + (1000 * 60 * 60 * 24 * 7), // 1 week
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

const mapStateToProps = ({ storefronts }, props) => {
  return {
    store: storefronts.stores.find(x => x.id === props.id),
    discounts: storefronts.discounts[props.id]
  }
}

export default connect(mapStateToProps)(Discounts)
