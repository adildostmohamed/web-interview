import React from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'

import './index.scss'

const Layout = ({ children }) => {
  return (
    <div className="page">
      <Header />
      <main className="page__body">{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
}

export default Layout
