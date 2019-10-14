import React, { useState, useEffect } from 'react'
import { timers } from '../util'
import './index.scss'

export default function (props) {
  const onFinish = timers.debounce(props.onFinish, 2000)
  const [content, setContent] = useState('')
  useEffect(() => {
    if (content.length && props.onFinish) onFinish(content)
  })
  return (
    <div className='texteditor'>
      <div className='editor-scroll flex-container'>
        <div className='lines'>{content.split(/\n/).map((x, i) => i + 1).join('\n')}</div>
        <textarea value={content} onChange={e => setContent(e.target.value)} />
      </div>
    </div>
  )
}
