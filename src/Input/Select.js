import React from 'react'
import { arrayOf, string, number } from 'prop-types'
import './index.scss'

export default class Select extends React.Component {
  constructor () {
    super()
    this.state = {
      active: false
    }
    this.open = this.open.bind(this)
    this.select = this.select.bind(this)
    this.tryClose = this.tryClose.bind(this)
    window.addEventListener('click', this.tryClose)
  }
  componentWillUnmount () {
    window.removeEventListener('click', this.tryClose)
  }
  open (open, e) {
    e.stopPropagation()
    this.setState({
      active: open
    })
  }
  tryClose (e) {
    e.stopPropagation()
    if (this.state.active) this.open(false, e)
  }
  select (i, e) {
    this.open(false, e)
    this.props.onChange({ ...e, target: { value: i } })
  }
  render () {
    return (
      <div className={'select-container' + (this.state.active ? ' active' : '')}>
        <div className='select-current flex-container' onClick={(e) => this.open(true, e)}>
          <span className='flex'>{this.props.value > -1 ? this.props.items[this.props.value] : 'Select'}</span>
          <span className='icon' dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>' }} />
        </div>
        <ul className='select-items' style={{ top: -(40 * this.props.value + 10) }}>
          {this.props.items.map((item, i) =>
            <li key={i} onClick={(e) => this.select(i, e)}>{item}</li>
          )}
        </ul>
      </div>
    )
  }
}

Select.propTypes = {
  value: number.isRequired,
  items: arrayOf(string).isRequired
}
