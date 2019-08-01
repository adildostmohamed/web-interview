import React, { useState, useEffect } from 'react'
import Avatar from 'components/Avatar'
import FormOptionsGroup from 'components/FormOptionsGroup'
import Textarea from 'components/Textarea'
import { API_ENDPOINT } from 'config'

import './index.scss'

const consultantTypes = [
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
]

const appointmentTypes = [
  {
    id: 'video',
    label: 'Video',
  },
  {
    id: 'audio',
    label: 'Audio',
  },
]

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
      // use the defined endpoint to get data for user id 1 to try and fetch the data from the endpoint and throw an error if it fails
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

  const handleRadioOptionChange = event => {
    event.preventDefault()
    // pull off some variables to be explit about their purpose and usage
    const optionValue = event.target.value
    const optionGroupName = event.target.name
    // unlike setState with hooks state you need to update the state object to also account for the previous state and apply the change to it
    // if you have a deeply nested form state then you might need to use a deep merge solution like lodash.merge instead
    const newAppointmentFormState = {
      ...appointmentFormState,
      [optionGroupName]: optionValue,
    }
    // call the set state function of the hook to update the form state
    return setAppointmentFormState(newAppointmentFormState)
  }

  const handleCheckboxOptionChange = event => {
    event.preventDefault()
    // pull off some variables to be explit about their purpose and usage
    const optionValue = event.target.value
    const optionGroupName = event.target.name
    const optionGroupFormState = appointmentFormState[optionGroupName]
    // check if the value already existed
    const optionIndex = optionGroupFormState.indexOf(optionValue)
    // if it wasnt present already then add it to the existing state for those checkbox options and combine the state
    if (optionIndex === -1) {
      optionGroupFormState.push(optionValue)
      const newAppointmentFormState = {
        ...appointmentFormState,
        [optionGroupName]: optionGroupFormState,
      }
      return setAppointmentFormState(newAppointmentFormState)
    }
    // if it was present then remove it to the existing state for those checkbox options and combine the state
    else {
      optionGroupFormState.splice(optionIndex, 1)
      const newAppointmentFormState = {
        ...appointmentFormState,
        [optionGroupName]: optionGroupFormState,
      }
      // call the set state function of the hook to update the form state
      return setAppointmentFormState(newAppointmentFormState)
    }
  }

  const handleTextareaChange = event => {
    // pull off some variables to  make it easier to handle
    const textValue = event.target.value
    const textAreaName = event.target.name

    // update the appropriate form state with the new text value
    const newAppointmentFormState = {
      ...appointmentFormState,
      [textAreaName]: textValue,
    }
    // call the set state function of the hook to update the form state
    return setAppointmentFormState(newAppointmentFormState)
  }

  const formatAvailableSlots = slots => {
    return slots.map(slot => {
      const formattedTime = new Date(slot.time)
      return { id: slot.time, label: formattedTime.toLocaleDateString('en-US') }
    })
  }

  return (
    <div className="form-wrapper">
      <h1 className="form__title">New Appointment</h1>
      <Avatar />
      <form className="form">
        <FormOptionsGroup
          optionGroupTitle="Consultant Type"
          options={consultantTypes}
          optionGroupType="radio"
          optionGroupName="consultantType"
          handleOptionChange={handleRadioOptionChange}
          formValue={appointmentFormState['consultantType']}
        />
        <FormOptionsGroup
          optionGroupTitle="Appointment Type"
          options={appointmentTypes}
          optionGroupType="checkbox"
          optionGroupName="appointmentType"
          handleOptionChange={handleCheckboxOptionChange}
          formValue={appointmentFormState['appointmentType']}
        />
        <FormOptionsGroup
          optionGroupTitle="Date & Time"
          options={formatAvailableSlots(matchingSlots)}
          optionGroupType="radio"
          optionGroupName="dateTime"
          handleOptionChange={handleRadioOptionChange}
          formValue={appointmentFormState['dateTime']}
        />
        <Textarea
          id="notes"
          label="Notes"
          formValue={appointmentFormState['notes']}
          handleTextareaChange={handleTextareaChange}
          placeholder="Describe your symptoms"
        />
      </form>
    </div>
  )
}

export default AppointmentForm
