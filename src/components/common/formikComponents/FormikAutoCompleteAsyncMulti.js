/* eslint-disable no-unused-vars */
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React from 'react'

const FormikAutocomplete = (props) => {
  const { form, options, field, label, nameKey, valueKey, onKeyssDown, InputProps } = props
  const { name } = field

  return (
    <Autocomplete
      {...props}
      {...field}
      getOptionLabel={(option) => option[nameKey] || ''}
      filterSelectedOptions={true}
      value={form.values[name]}
      getOptionDisabled={(option) => {
        return form.values[name].findIndex((item) => item.id === option.id) !== -1
      }}
      onInputChange={() => {
        onKeyssDown(event)
      }}
      onChange={(_, value) => {
        value && form.setFieldValue(name, value)
      }}
      renderInput={(props) => {
        return <TextField label={label} variant="outlined" {...props} {...InputProps} />
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
  valueKey: '',
  onKeyssDown: () => {},
}

export default FormikAutocomplete
