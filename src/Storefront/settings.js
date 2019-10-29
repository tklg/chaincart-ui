import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmButton from '../ConfirmButton'
import { deleteStorefront, editStorefront } from '../actions'
import './dashboard.scss'

class Settings extends Component {
  constructor () {
    super()
    // this.state = { name: 'Loading', items: 0, sales: 0, revenue: 0, cartType: 0, drawerDirection: 1 }
    this.state = {}
    this.setValue = this.setValue.bind(this)
  }
  componentDidMount () {
    const { name, cartType } = this.props.store
    this.setState({ name, cartType })
  }
  setValue (key, value) {
    this.setState({
      [key]: value
    })
  }
  render () {
    const store = this.state
    if (!store) return <div />
    return (
      <div className='dashboard settings'>
        <h1>Settings</h1>
        <div className='rows'>
          <div className='row'>
            <h2 className='key'>Storefront name</h2>
            <div className='value'>
              <input placeholder='My cool store' value={store.name || ''} onChange={e => this.setValue('name', e.target.value)} />
            </div>
          </div>

          <div className='row'>
            <h2 className='key'>Cart style</h2>
            <div className='value'>
              <form>
                <input className='radio' type='radio' name='cart-type' id='cart-type-0' checked={store.cartType === 0} onChange={e => this.setValue('cartType', 0)} />
                <label className='cart-type-preview' data-type='modal' htmlFor='cart-type-0'>
                  <div className='window flex-container flex-center'>
                    <div className='minimodal'>
                      <header />
                      <div className='bars' />
                    </div>
                  </div>
                </label>
                <input className='radio' type='radio' name='cart-type' id='cart-type-1' checked={store.cartType === 1} onChange={e => this.setValue('cartType', 1)} />
                <label className='cart-type-preview' data-type='drawer' htmlFor='cart-type-1'>
                  <div className='window'>
                    <div className='minidrawer'>
                      <header />
                      <div className='bars' />
                    </div>
                  </div>
                </label>
              </form>
            </div>
          </div>

          <div className='row buttons'>
            <span />
            <button className='btn' onClick={e => this.props.dispatch(editStorefront(this.props.store.id, store))}>Save</button>
          </div>
        </div>

        <h1 className='dangerzone'>Danger zone</h1>
        <div className='rows'>
          <div className='row'>
            <h2 className='key'>Disable storefront</h2>
            <div className='value'>
              <ConfirmButton onClick={console.log}>Disable</ConfirmButton>
            </div>
          </div>
          <div className='row'>
            <h2 className='key'>Delete storefront</h2>
            <div className='value'>
              <ConfirmButton onClick={e => this.props.dispatch(deleteStorefront(store.id))}>Delete</ConfirmButton>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ storefronts }, props) => {
  const store = storefronts.find(x => x.id === props.id)
  return {
    store
  }
}

export default connect(mapStateToProps)(Settings)
