import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const FormOption = ({
  option,
  optionGroupName,
  optionGroupType,
  handleOptionChange,
  selected,
}) => {
  return (
    <div className={selected ? 'option--selected' : 'option'}>
      <input
        className="option__input"
        id={option.id}
        type={optionGroupType}
        name={optionGroupName}
        value={option.id}
        checked={selected}
        onChange={handleOptionChange}
      />
      <label className="option__label" htmlFor={option.id}>
        {option.label}
      </label>
    </div>
  )
}

FormOption.propTypes = {
  optionGroupType: PropTypes.string.isRequired,
  optionGroupName: PropTypes.string.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  selectedOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
}

export default FormOption
