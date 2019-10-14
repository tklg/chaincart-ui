import React, { useState, useEffect, useRef } from 'react'
import { react, color, timers } from '../util'
import './index.scss'

export default function (props) {
  const barRef = useRef(null)
  const onFinish = timers.debounce(props.onFinish, 1000)
  const { onChange } = props

  const [isFocused, setIsFocused] = useState(false)
  const [hsl, setHSL] = useState(color.hex2hsl(props.color))
  const [hex, setHex] = useState(props.color.toUpperCase())
  useEffect(() => {
    if (/^#([0-9a-f]){6}$/i.test(hex) && isFocused) {
      setHSL(color.hex2hsl(hex))
      return
    }
    if (onChange) onChange(hex)
    if (onFinish) onFinish(hex)
    if (!hex.length) setHex('#')
  }, [hex, isFocused, onFinish, onChange])

  const onDrag = timers.throttle(function (e, i) {
    const width = barRef.current ? barRef.current.offsetWidth : 0
    const left = barRef.current ? barRef.current.getBoundingClientRect().left : 0
    const dist = e.clientX - left
    if (dist < 0) return
    if (dist > width) return
    const t = { ...hsl }
    t[i] = dist / width
    t[i] = Math.max(0, Math.min(t[i], 1))
    setHSL(t)
    setHex(color.hsl2hex(t))
  }, 10)

  function onMouseDown (e, i) {
    e.preventDefault()
    document.body.onmousemove = ev => {
      ev.preventDefault()
      onDrag(ev, i)
    }
    document.body.onmouseup = ev => {
      document.body.onmousemove = document.body.onmouseup = null
    }
  }

  return (
    <form className={react.classes(props.className, 'colorpicker')} onSubmit={e => e.preventDefault()}>
      <div className='details flex-container'>
        <div className='stack flex'>
          <span>{props.title}</span>
          <input
            placeholder={props.placeholder || ''}
            value={hex}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setHex(e.target.value.toUpperCase())}
            maxLength='7' />
        </div>
        <div className='swatch' style={{ background: hex }} />
      </div>
      <div className='picker'>
        <div
          className='select hue'
          onMouseDown={e => onMouseDown(e, 'h')}
          ref={barRef} />
        <div
          className='thumb'
          style={{ left: `${hsl.h * 100}%` }} />
      </div>
      <div className='picker'>
        <div
          className='select saturation'
          onMouseDown={e => onMouseDown(e, 's')}
          style={{ background: `linear-gradient(to right, hsl(${Math.round(hsl.h * 360)}, 0%, ${Math.round(hsl.l * 100)}%) 0%, hsl(${hsl.h * 360}, 100%, ${Math.round(hsl.l * 100)}%) 100%)` }} />
        <div
          className='thumb'
          style={{ left: `${hsl.s * 100}%` }} />
      </div>
      <div className='picker'>
        <div
          className='select lightness'
          onMouseDown={e => onMouseDown(e, 'l')}
          style={{ background: `linear-gradient(to right, hsl(${Math.round(hsl.h * 360)}, ${Math.round(hsl.s * 100)}%, 0%) 0%, hsl(${hsl.h * 360}, ${Math.round(hsl.s * 100)}%, 100%) 100%)` }} />
        <div
          className='thumb'
          style={{ left: `${hsl.l * 100}%` }} />
      </div>
    </form>
  )
}
