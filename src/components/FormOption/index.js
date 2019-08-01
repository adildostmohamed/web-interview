import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const FormOption = ({
  option,
  formName,
  componentType,
  changeHandler,
  checked,
}) => {
  return (
    <div className={checked ? 'option--selected' : 'option'}>
      <input
        className="option__input"
        id={option.id}
        type={componentType}
        name={formName}
        value={option.id}
        checked={checked}
        onChange={changeHandler}
      />
      <label className="option__label" htmlFor={option.id}>
        {option.label}
      </label>
    </div>
  )
}

FormOption.propTypes = {
  componentType: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
}

export default FormOption
