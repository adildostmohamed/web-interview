import React from 'react'
import PropTypes from 'prop-types'
import FormOption from 'components/FormOption'

import './index.scss'

const FormOptionsGroup = ({
  optionGroupTitle,
  optionGroupType,
  optionGroupName,
  handleOptionChange,
  formValue,
  options,
}) => {
  return (
    <div className="option-group__wrapper">
      <fieldset className="option-group">
        <legend className="option-group__legend">{optionGroupTitle}</legend>
        <div className="option-group__options">
          {options.map(option => {
            return (
              <FormOption
                key={option.id}
                option={option}
                optionGroupType={optionGroupType}
                optionGroupName={optionGroupName}
                handleOptionChange={handleOptionChange}
                selected={formValue.indexOf(option.id) !== -1}
              />
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}

FormOptionsGroup.propTypes = {
  optionGroupTitle: PropTypes.string.isRequired,
  optionGroupType: PropTypes.string.isRequired,
  optionGroupName: PropTypes.string.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
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
