import React, { useContext } from 'react'
import { UserContext } from 'context/UserContext'

import './index.scss'
const Avatar = () => {
  const user = useContext(UserContext)
  return (
    <div className="avatar">
      <img
        src={user.avatar}
        className="avatar__img"
        alt={`Profile avatar for ${user.firstName} ${user.lastName}`}
      />
      <p className="avatar__name">
        {user.firstName} {user.lastName}
      </p>
    </div>
  )
}

export default Avatar
