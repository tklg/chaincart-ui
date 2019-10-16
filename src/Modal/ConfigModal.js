import React, { useState } from 'react'
import Modal from '.'

export default function KVModal ({ data, ...props }) {
  const { header, footer, values } = data
  const [stored, setStored] = useState(values.reduce((a, x) => ({
    ...a,
    [x.name]: x.value
  }), {}))

  return (
    <Modal {...props}>
      {header && <header>
        <h1><span className='product-name'>{header.title}</span><span className='product-sku'>{header.subtitle}</span></h1>
      </header>}
      <main className='flex-container' key={data.id}>
        {values && <div className='rows'>
          {values.map(v => (
            <div className='row'>
              <h2 className='key'>{v.name}</h2>
              <div className='value'>
                <v.component.type
                  {...v.component.props}
                  value={v.convert && stored[v.name] ? v.convert.to(stored[v.name]) : stored[v.name]}
                  onChange={e => setStored({ ...stored, [v.name]: v.convert && e.target.value ? v.convert.from(e.target.value) : e.target.value })} />
              </div>
            </div>
          ))}
        </div>}
      </main>
      <footer>
        <button className='btn btn-clear'>Cancel</button>
        <button className='btn'>Save</button>
      </footer>
    </Modal>
  )
}
