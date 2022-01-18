import RadioGroup from '@material-ui/core/RadioGroup'
import { useField } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'

function FormikRadioGroup(props) {
  const [{ onChange, onBlur, ...field }] = useField(props.name)
  return (
    <RadioGroup
      row
      {...props}
      {...field}
      labelledBy={props.name}
      onBlur={onBlur(props.name)}
      onChange={onChange(props.name)}
    />
  )
}

FormikRadioGroup.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
}

export default FormikRadioGroup
