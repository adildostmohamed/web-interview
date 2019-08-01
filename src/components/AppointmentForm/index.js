import React, { useState, useEffect } from 'react'
import Form from 'components/Form'
import { API_ENDPOINT } from 'config'

const appointmentFormDefinition = {
  formTitle: 'New Appointment',
  inititalState: {
    consultantType: 'gp',
    dateTime: '',
    notes: '',
    appointmentType: ['video', 'audio'],
  },
  formComponents: [
    {
      component: 'radio',
      label: 'Consultant Type',
      formName: 'consultantType',
      componentType: 'radio',
      id: 'consultantType',
      options: [
        {
          id: 'gp',
          label: 'GP',
        },
        {
          id: 'specialist',
          label: 'Specialist',
        },
        {
          id: 'nurse',
          label: 'Nurse',
        },
        {
          id: 'therapist',
          label: 'Therapist',
        },
        {
          id: 'triageNurse',
          label: 'Triage Nurse',
        },
      ],
    },
    {
      component: 'checkbox',
      label: 'Appointment Type',
      formName: 'appointmentType',
      componentType: 'checkbox',
      id: 'appointmentType',
      options: [
        {
          id: 'video',
          label: 'Video',
        },
        {
          id: 'audio',
          label: 'Audio',
        },
      ],
    },
    {
      component: 'textarea',
      label: 'Notes',
      id: 'notes',
      formName: 'notes',
      placeholder: 'Describe your symptoms',
    },
  ],
}

const AppointmentForm = () => {
  // declare the form initial state which allows you to provide any defaults you want to provide to the user
  // as an added enhancement can abstract this into a separate form component if you want to dynamically generate a form for multiple areas
  const [appointmentFormState, setAppointmentFormState] = useState({
    consultantType: 'gp',
    dateTime: '',
    notes: '',
    appointmentType: ['video', 'audio'],
  })

  const [allAvailableSlots, setAllAvailableSlots] = useState([])
  const [matchingSlots, setMatchingSlots] = useState([])
  const [availableSlotsLoaded, setAvailableSlotsLoaded] = useState(false)

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      // use the defined endpoint to get available slots
      try {
        const res = await fetch(`${API_ENDPOINT}/availableSlots`)
        // make sure that the response looks good and if it doesnt pass on the message so it can be caught
        // this would be handy if you have to deal with server errors like a 404 because it wont get caught in the catch for the await block
        if (res.ok) {
          const availableSlots = await res.json()
          return availableSlots
        } else {
          const { status, statusText } = res
          throw new Error({ errorCode: status, message: statusText })
        }
      } catch (e) {
        throw new Error(e)
      }
    }

    const findMatchingAvailableSlots = slots => {
      return slots.filter(
        slot =>
          slot.consultantType.indexOf(appointmentFormState.consultantType) !==
          -1
      )
      // .filter(slot =>
      //   appointmentFormState.appointmentType.map(
      //     type => slot.appointmentType.indexOf(type) !== -1
      //   )
      // )
    }

    if (!availableSlotsLoaded) {
      fetchAvailableSlots()
        .then(data => {
          setAvailableSlotsLoaded(true)
          setAllAvailableSlots(data)
          setMatchingSlots(findMatchingAvailableSlots(data))
        })
        .catch(error => console.error(error))
    } else {
      setMatchingSlots(findMatchingAvailableSlots(allAvailableSlots))
    }
  }, [
    appointmentFormState.consultantType,
    availableSlotsLoaded,
    allAvailableSlots,
  ])

  const formatAvailableSlots = slots => {
    return slots.map(slot => {
      const formattedTime = new Date(slot.time)
      return { id: slot.time, label: formattedTime.toLocaleDateString('en-US') }
    })
  }

  const handleFormChange = formState => {
    console.log(formState)
  }

  const handleFormSubmit = formState => {
    console.log(formState)
  }

  return (
    <div className="appointment-form">
      <Form
        initialFormState={appointmentFormDefinition.inititalState}
        formDefinition={appointmentFormDefinition}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  )
}

export default AppointmentForm
