import React, { useState } from 'react'
import Avatar from 'components/Avatar'
import FormOptionsGroup from 'components/FormOptionsGroup'
import Textarea from 'components/Textarea'

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
    label: 'nurse',
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
    dateTime: undefined,
    notes: '',
    appointmentType: ['video', 'audio'],
  })

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

  const appointmentTypeFormState = appointmentFormState['appointmentType']

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
          selectedOptions={appointmentFormState['consultantType']}
        />
        <FormOptionsGroup
          optionGroupTitle="Appointment Type"
          options={appointmentTypes}
          optionGroupType="checkbox"
          optionGroupName="appointmentType"
          handleOptionChange={handleCheckboxOptionChange}
          selectedOptions={[...appointmentTypeFormState]}
        />
        <Textarea
          id="notes"
          label="Notes"
          value={appointmentFormState['notes']}
          handleTextareaChange={handleTextareaChange}
          placeholder="Describe your symptoms"
        />
        {JSON.stringify(appointmentFormState['notes'])}
      </form>
    </div>
  )
}

export default AppointmentForm
