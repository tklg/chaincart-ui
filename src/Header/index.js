import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

export default class Header extends Component {
  render () {
    return (
      <header className='header'>
        <div className='width-limit flex-container'>
          <div className='header--logo flex'>
            <span>Chaincart</span>
          </div>

          <nav className='header--nav'>
            <Link className='btn btn-clear header--link' to='/account'>My account</Link>
          </nav>
        </div>
      </header>
    )
  }
}
