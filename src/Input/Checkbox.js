import React from 'react'
import { string } from 'prop-types'

export default function Checkbox (props) {
  const onChangeAdapter = (e) => {
    props.onChange({ ...e, target: { value: e.target.checked } })
  }

  return (
    <div className={'checkbox-container' + (props.children ? '' : ' default')}>
      <input type='checkbox' onChange={onChangeAdapter} checked={props.value} id={props.id} />
      <label htmlFor={props.id} className='checkbox-label'>
        {props.children}
      </label>
    </div>
  )
}

Checkbox.propTypes = {
  id: string.isRequired
}
