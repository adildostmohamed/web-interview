import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { API_ENDPOINT } from 'config'

// create a context object that will be used to pass in the user object to child components from the Provider component rendered below
const UserContext = createContext()

const UserProvider = ({ children }) => {
  // use the useState hook to set the value of the user which we will do by getting the data from the endpoint
  // for now setting a default value of !loaded in case you need to check for it in a consumer of this context
  const [user, setUser] = useState({ loaded: false })

  // assumed that authentication has already happened which has provided us with a userId that we are now using to fetch the details about a user
  const fetchUserData = async () => {
    // use the defined endpoint to get data for user id 1 to try and fetch the data from the endpoint and throw an error if it fails
    try {
      const res = await fetch(`${API_ENDPOINT}/users/1`)
      // make sure that the response looks good and if it doesnt pass on the message so it can be caught
      // this would be handy if you have to deal with server errors like a 404 because it wont get caught in the catch for the await block
      if (res.ok) {
        const userData = await res.json()
        return userData
      } else {
        const { status, statusText } = res
        throw new Error({ errorCode: status, message: statusText })
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  // useEffect to call the fetchuser function and if it resolves set the user state value or catch an error
  // errors can be enhanced depending on what has happened but TODO could be to redirect to an error page or provide a retry button
  useEffect(() => {
    fetchUserData()
      .then(data => setUser({ loaded: true, ...data }))
      .catch(error => console.error(error))
  }, [])
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
}

export { UserContext, UserProvider }
