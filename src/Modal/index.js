import React from 'react'
// import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import './index.scss'

export default function Modal (props) {
  return (
    <CSSTransition
      in={props.active}
      timeout={200}
      unmountOnExit
      classNames='modal-container'>
      <div className='modal-container flex-container flex-center' onClick={e => props.onClose(e)}>
        <div className='modal' onClick={e => e.stopPropagation()}>
          {props.children}
        </div>
      </div>
    </CSSTransition>
  )
}

// function mapStateToProps (state) {
//   return {}
// }

// export default connect(mapStateToProps)(Modal)
