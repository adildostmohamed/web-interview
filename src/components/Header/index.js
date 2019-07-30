import React from 'react'
import logo from 'assets/images/logo.png'

import './Header.scss'
const Header = () => {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Babylon Health Logo" />
    </header>
  )
}

export default Header
