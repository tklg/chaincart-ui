import React, { Component } from 'react'
import { connect } from 'react-redux'
import './dashboard.scss'

class Settings extends Component {
  render () {
    const { settings } = this.props
    return (
      <div className='dashboard settings'>
        <h1>Settings</h1>
        <div className='rows'>
          <div className='row'>
            <h2 className='key'>Storefront name</h2>
            <div className='value'>
              <input placeholder='My cool store' />
            </div>
          </div>

          <div className='row'>
            <h2 className='key'>Cart style</h2>
            <div className='value'>
              <form>
                <input className='radio' type='radio' name='cart-type' checked={settings.cartType === 0} />
                <label class='cart-type-preview' data-type='modal'>
                  <div className='window flex-container flex-center'>
                    <div className='minimodal'>
                      <header />
                      <div className='bars' />
                    </div>
                  </div>
                </label>
                <input className='radio' type='radio' name='cart-type' checked={settings.cartType === 1} />
                <label class='cart-type-preview' data-type='drawer'>
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ storefronts }, props) => {
  return {
    store: storefronts.stores.find(x => x.id === props.id),
    settings: storefronts.settings[props.id]
  }
}

export default connect(mapStateToProps)(Settings)
