import React from 'react'
import PropTypes from 'prop-types'
import FormOption from 'components/FormOption'

import './index.scss'

const FormOptionsGroup = ({
  label,
  componentType,
  formName,
  changeHandler,
  formValue,
  options,
}) => {
  return (
    <div className="option-group__wrapper">
      <fieldset className="option-group">
        <legend className="option-group__legend">{label}</legend>
        <div className="option-group__options">
          {options.map(option => {
            return (
              <FormOption
                key={option.id}
                option={option}
                componentType={componentType}
                formName={formName}
                changeHandler={changeHandler}
                checked={formValue.indexOf(option.id) !== -1}
              />
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}

FormOptionsGroup.propTypes = {
  label: PropTypes.string.isRequired,
  componentType: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  formValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default FormOptionsGroup
