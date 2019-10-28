import React, { useState } from 'react'
import ConfirmButton from '../ConfirmButton'
import { object, arrayOf, oneOfType, string, number, bool, shape, func, elementType } from 'prop-types'

export default function ConfigModal ({ data, ...props }) {
  const { header, footer, values } = data
  const [stored, setStored] = useState(values.reduce((a, x) => ({
    ...a,
    [x.key || x.name.toLowerCase().replace(/\s/g, '_')]: x.value
  }), {}))
  if (!data) return <div />
  return [
    (<header key='header'>
      <h1><span className='title'>{header.title}</span><span className='subtitle'>{header.subtitle}</span></h1>
    </header>),
    (<main key='main' className='flex-container'>
      {values && <div className='rows'>
        {values.map((v, i) => {
          const key = v.key || v.name.toLowerCase().replace(/\s/g, '_')
          return (<div className='row' key={`${data.id}-${i}`}>
            <h2 className='key'>{v.name}</h2>
            <div className='value'>
              <v.component.type
                {...v.component.props}
                value={v.convert && stored[key] ? v.convert.to(stored[key]) : stored[key]}
                onChange={e => setStored({ ...stored, [key]: v.convert && e.target.value ? v.convert.from(e.target.value) : e.target.value })} />
            </div>
          </div>)
        })}
      </div>}
    </main>),
    (<footer key='footer' className='flex-container'>
      {footer.buttons == null &&
        <>
          {!footer.hideDelete && <ConfirmButton onClick={props.onDelete}>Delete</ConfirmButton>}
          <div className='flex' />
          <button className='btn btn-clear' onClick={e => props.onClose(e)}>Cancel</button>
          <button className='btn' onClick={e => props.onSave(stored)}>Save</button>
        </>
      }
      {footer.buttons && footer.buttons.map((x, i, a) => (
        <button className={`btn${i !== (a.length - 1) ? ' btn-clear' : ''}`} onClick={e => x.onClick(e, props, stored)} key={i}>{x.title}</button>
      ))}
    </footer>)
  ]
}

ConfigModal.propTypes = {
  data: shape({
    header: shape({
      title: string.isRequired,
      subtitle: string
    }),
    values: arrayOf(shape({
      name: string.isRequired,
      key: string,
      value: oneOfType([string, number, bool]),
      component: shape({
        type: oneOfType([string, object, elementType]).isRequired,
        props: object
      }).isRequired,
      convert: shape({
        from: func.isRequired,
        to: func.isRequired
      })
    })),
    footer: shape({
      buttons: arrayOf(shape({
        title: string.isRequired,
        onClick: func.isRequired
      })),
      hideDelete: bool
    })
  }).isRequired,
  onSave: func,
  onDelete: func,
  onClose: func
}

ConfigModal.defaultProps = {
  header: {
    title: '',
    subtitle: ''
  },
  footer: {},
  values: []
}
