import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'
const Textarea = ({ id, label, formValue, changeHandler, placeholder }) => {
  return (
    <div className="textarea__wrapper">
      <label htmlFor={id} className="textarea__label">
        {label}
      </label>
      <textarea
        className="textarea__input"
        name={id}
        rows="4"
        id={id}
        placeholder={placeholder}
        value={formValue}
        onChange={changeHandler}
      />
    </div>
  )
}

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  formValue: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

Textarea.defaultProps = {
  placeholder: 'Tell us more',
}

export default Textarea
