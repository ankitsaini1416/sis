import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useField } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'

function FormikCheckBox(props) {
  const [field] = useField(props.name)
  return (
    <FormControlLabel
      className={props.className}
      value="end"
      control={
        <Checkbox
          inputProps={{ 'aria-label': 'Keep Active' }}
          checked={field.value}
          color="primary"
          disabled={field.disabled}
          {...field}
        />
      }
      label={props.label}
      labelPlacement="end"
    />
  )
}

FormikCheckBox.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
}

FormikCheckBox.defaultProps = {
  name: '',
  className: '',
  label: '',
  checked: true,
  disabled: false,
}

export default FormikCheckBox
