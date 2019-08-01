import React from 'react'
import { UserProvider } from 'context/UserContext'
import AppointmentForm from 'components/AppointmentForm'

import 'styles/main.scss'
import Layout from 'components/Layout'

const App = () => {
  return (
    <div className="app">
      <UserProvider>
        <Layout>
          <AppointmentForm />
        </Layout>
      </UserProvider>
    </div>
  )
}

export default App
