import React from 'react'
import './index.scss'

const Progress = props => (
  <div className={'progress' + (props.working ? ' working' : '')}>
    <div className='indeterminate' />
  </div>
)

export default Progress
