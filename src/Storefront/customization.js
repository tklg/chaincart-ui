import React, { Component } from 'react'
import Colorpicker from '../Colorpicker'
import { connect } from 'react-redux'
import { money } from '../util'
import Icon from '@mdi/react'
import { mdiImage } from '@mdi/js'
import Texteditor from '../Texteditor'
import './dashboard.scss'

class Customization extends Component {
  render () {
    const { primary, primaryText, secondary, secondaryText, accent, accentText } = this.props.colors
    return (
      <div className='dashboard customization'>
        <h1>Customization</h1>
        <div className='preview' style={{ background: secondary, color: secondaryText }}>
          <header style={{ background: primary, color: primaryText }}>Shopping cart preview</header>
          <main>
            <form>
              <table cellSpacing='0' cellPadding='0'>
                <thead>
                  <tr>
                    <th />
                    <th style={{ color: secondaryText }}>Item</th>
                    <th style={{ color: secondaryText }}>Amount</th>
                    <th style={{ color: secondaryText }}>Price</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Icon path={mdiImage} /></td>
                    <td style={{ color: secondaryText }}>Apple</td>
                    <td style={{ color: secondaryText }}><input readOnly value='2' type='number' /></td>
                    <td style={{ color: secondaryText }}>{money.fmt(50)}</td>
                    <td><button href='#' className='remove'>Remove</button></td>
                  </tr>
                  <tr>
                    <td><Icon path={mdiImage} /></td>
                    <td style={{ color: secondaryText }}>Bread</td>
                    <td style={{ color: secondaryText }}><input readOnly value='1' type='number' /></td>
                    <td style={{ color: secondaryText }}>{money.fmt(300)}</td>
                    <td><button href='#' className='remove'>Remove</button></td>
                  </tr>
                </tbody>
              </table>
            </form>
          </main>
          <footer className='flex-container'>
            <div className='total flex'>Total: <span>{money.fmt(350)}</span></div>
            <button className='btn' style={{ background: accent, color: accentText }}>Checkout</button>
          </footer>
        </div>

        <h1>Primary colors</h1>
        <div className='tiles tiles-2'>
          <Colorpicker className='tile' title='Background' color={primary} />
          <Colorpicker className='tile' title='Text' color={primaryText} />
        </div>

        <h1>Secondary colors</h1>
        <div className='tiles tiles-2'>
          <Colorpicker className='tile' title='Background' color={secondary} />
          <Colorpicker className='tile' title='Text' color={secondaryText} />
        </div>

        <h1>Accent colors</h1>
        <div className='tiles tiles-2'>
          <Colorpicker className='tile' title='Background' color={accent} />
          <Colorpicker className='tile' title='Text' color={accentText} />
        </div>

        <h1>Custom CSS</h1>
        <Texteditor />
      </div>
    )
  }
}

const mapStateToProps = ({ storefronts }, props) => {
  return {
    store: storefronts.stores.find(x => x.id === props.id),
    colors: storefronts.customization[props.id]
  }
}

export default connect(mapStateToProps)(Customization)
