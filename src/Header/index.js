import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Progress from '../Progress'
import './index.scss'

class Header extends Component {
  render () {
    return (
      <header className='header'>
        <Progress working={this.props.working} />

        <div className='width-limit flex-container'>
          <div className='header--logo flex'>
            <img src='/logo.svg' alt='logo' />
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

const mapStateToProps = ({ app }) => {
  return {
    working: app.working.length > 0
  }
}

export default connect(mapStateToProps)(Header)
