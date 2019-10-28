import React, { useState, useEffect } from 'react'
import './index.scss'

export default function (props) {
  const [pending, setPending] = useState(false)
  useEffect(() => {
    let timer
    if (pending) {
      timer = setTimeout(() => {
        setPending(false)
      }, 3000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [pending])

  const onClick = e => {
    if (pending) {
      props.onClick(e)
    } else {
      setPending(true)
    }
  }
  return (
    <button
      className='btn btn-confirm btn-delete'
      onClick={onClick}>{pending ? ('Confirm?') : (props.children || props.text)}</button>
  )
}
