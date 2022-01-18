import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React from 'react'

const FormikAutocomplete = (props) => {
  const {
    form,
    options,
    field,
    label,
    nameKey,
    valueKey,
    optionId,
    onKeyssDown,
    InputProps,
    ...others
  } = props
  const { name } = field
  return (
    <Autocomplete
      {...props}
      {...field}
      getOptionLabel={(option) => option[nameKey] || ''}
      value={
        options.find((option) => {
          return option[optionId] === form.values[name]
        }) || {}
      }
      onInputChange={(_, newInputValue, reason) => {
        onKeyssDown(event, newInputValue, reason, form)
      }}
      onChange={(_, value) => {
        value && form.setFieldValue(name, value[valueKey])
      }}
      renderInput={(props) => {
        return <TextField variant={others.variant} label={label} {...props} {...InputProps} />
      }}
    />
  )
}

FormikAutocomplete.propTypes = {
  form: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.array,
  field: PropTypes.object,
  nameKey: PropTypes.string,
  optionId: PropTypes.string,
  valueKey: PropTypes.string,
  onKeyssDown: PropTypes.func,
  InputProps: PropTypes.object,
}
FormikAutocomplete.defaultProps = {
  form: {},
  label: '',
  options: [],
  field: {},
  nameKey: 'name',
  optionId: 'id',
  valueKey: '',
  onKeyssDown: () => {},
}

export default FormikAutocomplete
