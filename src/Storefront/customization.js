import React, { Component } from 'react'
import Colorpicker from '../Colorpicker'
import { connect } from 'react-redux'
import { money, react } from '../util'
import Icon from '@mdi/react'
import { mdiImage } from '@mdi/js'
import Texteditor from '../Texteditor'
import { saveCustomization } from '../actions'
import './dashboard.scss'

class Customization extends Component {
  constructor () {
    super()
    this.state = null
    this.update = this.update.bind(this)
    this.previewID = 'preview-' + Date.now().toString(16)
  }
  componentDidMount () {
    this.setState(this.props.store.colors)
  }
  update (key, value) {
    this.setState({
      [key]: value
    })
  }
  render () {
    if (!this.state) return <div />
    const { primary, primaryText, secondary, secondaryText, accent, accentText, css } = this.state
    const colors = this.props.store.colors
    return (
      <div className='dashboard customization'>
        <style type='text/css' dangerouslySetInnerHTML={{ __html: react.cssNamespace(`header {background: ${primary}; color: ${primaryText}} thead th {color: ${secondaryText}} tbody td {color: ${secondaryText}} footer .btn {background: ${accent}; color: ${accentText}}`, `#${this.previewID}`) }} />
        <style type='text/css' dangerouslySetInnerHTML={{ __html: react.cssNamespace(css, `#${this.previewID}`) }} />
        <h1>Customization</h1>
        <div className='preview' id={this.previewID} style={{ background: secondary, color: secondaryText }}>
          <header className='cart--header'>{this.props.store.name} preview</header>
          <main className='cart--container'>
            <form className='table-container'>
              <table cellSpacing='0' cellPadding='0' className='cart--items'>
                <thead>
                  <tr className='cart--items-header'>
                    <th />
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr className='cart--item'>
                    <td><Icon path={mdiImage} /></td>
                    <td>Apple</td>
                    <td><input readOnly value='2' type='number' /></td>
                    <td>{money.fmt(50)}</td>
                    <td><button href='#' className='remove'>Remove</button></td>
                  </tr>
                  <tr className='cart--item'>
                    <td><Icon path={mdiImage} /></td>
                    <td>Bread</td>
                    <td><input readOnly value='1' type='number' /></td>
                    <td>{money.fmt(300)}</td>
                    <td><button href='#' className='remove'>Remove</button></td>
                  </tr>
                </tbody>
              </table>
            </form>
          </main>
          <footer className='cart--footer flex-container'>
            <div className='cart--total flex'>Total: <span>{money.fmt(350)}</span></div>
            <button className='cart--btn btn'>Checkout</button>
          </footer>
        </div>

        <h1>Primary colors</h1>
        <div className='tiles tiles-2'>
          <Colorpicker className='tile' title='Background' color={colors.primary} onFinish={c => this.update('primary', c)} />
          <Colorpicker className='tile' title='Text' color={colors.primaryText} onFinish={c => this.update('primaryText', c)} />
        </div>

        <h1>Secondary colors</h1>
        <div className='tiles tiles-2'>
          <Colorpicker className='tile' title='Background' color={colors.secondary} onFinish={c => this.update('secondary', c)} />
          <Colorpicker className='tile' title='Text' color={colors.secondaryText} onFinish={c => this.update('secondaryText', c)} />
        </div>

        <h1>Accent colors</h1>
        <div className='tiles tiles-2'>
          <Colorpicker className='tile' title='Background' color={colors.accent} onFinish={c => this.update('accent', c)} />
          <Colorpicker className='tile' title='Text' color={colors.accentText} onFinish={c => this.update('accentText', c)} />
        </div>

        <h1>Custom CSS</h1>
        <Texteditor value={colors.css} onFinish={s => this.update('css', s)} />

        <div className='rows'>
          <div className='row buttons'>
            <span />
            <button className='btn' onClick={e => this.props.dispatch(saveCustomization(this.props.store.id, this.state))}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ storefronts }, props) => {
  return {
    store: storefronts.find(x => x.id === props.id)
  }
}

export default connect(mapStateToProps)(Customization)
