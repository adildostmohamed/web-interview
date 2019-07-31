import React, { Component } from 'react'

import Header from 'components/Header'
import { UserProvider } from './context/UserContext'
import AppointmentForm from 'components/AppointmentForm'
import { API_ENDPOINT } from './config'

import 'styles/main.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      selectedAppointmentType: 'gp',
      availableSlots: [],
    }
  }

  componentDidMount() {
    // Add a click handler to the GP button below so we can avoid needing to add an event handler to the GP button
    // document
    //   .querySelectorAll('button')
    //   .querySelectorAll('[id=GP-button]')
    //   .attachEventHandler('click', this.onClick)

    fetch(`${API_ENDPOINT}/availableSlots`)
      .then(res => res.json())
      .then(json => {
        this.setState({ availableSlots: json })
      })
      .catch(() => {
        // TODO: Handle error here
      })
  }

  // Dont need this function for now as we call set state on the GP button directly for now
  // onClick() {
  //   this.setState({ selectedAppointmentType: 'gp' })
  // }

  render() {
    // calculate matching slots
    let slots = []
    for (let i = 0; i < this.state.availableSlots.length; i++) {
      for (
        let j = 0;
        j < this.state.availableSlots[i]['consultantType'].length;
        j++
      ) {
        if (
          this.state.availableSlots[j]['consultantType'][i] ===
          this.state.selectedAppointmentType
        ) {
          slots.push(this.state.availableSlots[j])
        }
      }
    }

    return (
      <div className="app">
        <UserProvider>
          <Header />
          <AppointmentForm />
          {/* <h2 className="h6">New appointment</h2> */}
          {/* <div style={{ maxWidth: 600, margin: '24px auto' }}>
            <div
              className="button"
              id="GP-button"
              onClick={e => {
                this.setState({ selectedAppointmentType: 'gp' })
              }}
            >
              GP
            </div>
            <div
              className="button"
              onClick={e => {
                this.setState({ selectedAppointmentType: 'Therapist' })
              }}
            >
              Therapist
            </div>
            <div
              className="button"
              onClick={e => {
                this.setState({ selectedAppointmentType: 'Physio' })
              }}
            >
              Physio
            </div>
            <div
              className="button"
              onClick={e => {
                this.setState({ selectedAppointmentType: 'specialist' })
              }}
            >
              Specialist
            </div>
            <div>
              <strong>Appointments</strong>
              {slots.map(slot => (
                <li
                  key={slot.id}
                  className="appointment-button"
                  onClick={() => {
                    this.setState({ selectedAppointment: slot })
                  }}
                >
                  {slot.time}
                </li>
              ))}
            </div>
          </div> */}
        </UserProvider>
      </div>
    )
  }
}

export default App
