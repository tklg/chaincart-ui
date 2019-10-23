import React, { useState, useEffect } from 'react'
import { timers } from '../util'
import './index.scss'

const handleKeyDown = e => {
  let key = e.keyCode || e.which
  if (key === 9) {
    e.preventDefault()
    document.execCommand('insertText', false, '  ')
  }
}

export default function (props) {
  const onFinish = timers.debounce(props.onFinish, 500)
  const [content, setContent] = useState(props.value)
  useEffect(() => {
    if (props.onFinish) onFinish(content)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])
  return (
    <div className='texteditor'>
      <div className='editor-scroll flex-container'>
        <div className='lines'>{content.split(/\n/).map((x, i) => i + 1).join('\n')}</div>
        <textarea value={content} onChange={e => setContent(e.target.value)} onKeyDown={handleKeyDown} />
      </div>
    </div>
  )
}
