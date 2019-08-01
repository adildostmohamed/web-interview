import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FormOptionsGroup from 'components/FormOptionsGroup'
import Textarea from 'components/Textarea'
import Avatar from 'components/Avatar'

import './index.scss'

const Form = ({
  initialFormState,
  formDefinition,
  handleFormSubmit,
  handleFormChange,
}) => {
  // declare the form initial state which allows you to provide any defaults you want to provide to the user
  const [formState, setFormState] = useState({ ...initialFormState })

  useEffect(() => {
    const onFormStateChange = () => {
      return handleFormChange(formState)
    }
    onFormStateChange()
  }, [formState, handleFormChange])

  const handleRadioOptionChange = event => {
    event.preventDefault()
    // pull off some variables to be explit about their purpose and usage
    const optionValue = event.target.value
    const optionGroupName = event.target.name
    // unlike setState with hooks state you need to update the state object to also account for the previous state and apply the change to it
    // if you have a deeply nested form state then you might need to use a deep merge solution like lodash.merge instead
    const newFormState = {
      ...formState,
      [optionGroupName]: optionValue,
    }
    // call the set state function of the hook to update the form state
    return setFormState(newFormState)
  }

  const onFormSubmit = event => {
    event.preventDefault()
    return handleFormSubmit(formState)
  }

  const handleCheckboxOptionChange = event => {
    event.preventDefault()
    // pull off some variables to be explit about their purpose and usage
    const optionValue = event.target.value
    const optionGroupName = event.target.name
    const optionGroupFormState = formState[optionGroupName]
    // check if the value already existed
    const optionIndex = optionGroupFormState.indexOf(optionValue)
    // if it wasnt present already then add it to the existing state for those checkbox options and combine the state
    if (optionIndex === -1) {
      optionGroupFormState.push(optionValue)
      const newFormState = {
        ...formState,
        [optionGroupName]: optionGroupFormState,
      }
      return setFormState(newFormState)
    }
    // if it was present then remove it to the existing state for those checkbox options and combine the state
    else {
      optionGroupFormState.splice(optionIndex, 1)
      const newFormState = {
        ...formState,
        [optionGroupName]: optionGroupFormState,
      }
      // call the set state function of the hook to update the form state
      return setFormState(newFormState)
    }
  }

  const handleTextareaChange = event => {
    // pull off some variables to  make it easier to handle
    const textValue = event.target.value
    const textAreaName = event.target.name

    // update the appropriate form state with the new text value
    const newFormState = {
      ...formState,
      [textAreaName]: textValue,
    }
    // call the set state function of the hook to update the form state
    return setFormState(newFormState)
  }

  const formComponentsDict = {
    checkbox: {
      component: FormOptionsGroup,
      changeHandler: handleCheckboxOptionChange,
    },
    radio: {
      component: FormOptionsGroup,
      changeHandler: handleRadioOptionChange,
    },
    textarea: {
      component: Textarea,
      changeHandler: handleTextareaChange,
    },
  }
  return (
    <div className="form-wrapper">
      <h1 className="form__title">{formDefinition.formTitle}</h1>
      <Avatar />
      <form className="form">
        {formDefinition.formComponents.map(item => {
          const formComponentType = formComponentsDict[item.component]
          return React.createElement(formComponentType.component, {
            ...item,
            changeHandler: formComponentType.changeHandler,
            formValue: formState[item.formName],
            key: item.id,
          })
        })}
        <button className="form__submit" type="submit" onClick={onFormSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}
Form.propTypes = {
  initialFormState: PropTypes.shape().isRequired,
  formDefinition: PropTypes.shape().isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func,
}
Form.defaultProps = {
  handleFormChange: null,
}
export default Form
