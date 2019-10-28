import React from 'react'
import { CSSTransition } from 'react-transition-group'
import ConfigModal from './ConfigModal'
import { react } from '../util'
import './index.scss'

export default function Modal (props) {
  return (
    <CSSTransition
      in={props.active}
      timeout={200}
      unmountOnExit
      classNames='modal-container'>
      <div className='modal-container flex-container flex-center' onClick={e => props.onClose(e)}>
        <div className={react.classes('modal', props.className)} onClick={e => e.stopPropagation()}>
          {props.data ? <ConfigModal {...props} /> : props.children}
        </div>
      </div>
    </CSSTransition>
  )
}

// Modal.propTypes = {
//   oneOf (props, name, componentName) {
//     if (props['active'] && !props['children'] && !props['data']) throw new Error(`${componentName} requires either 'children' or 'data'`)
//   }
// }
