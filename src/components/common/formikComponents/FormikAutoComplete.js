/* eslint-disable no-unused-vars */
import { TextField } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React from 'react'

import { isEmpty } from './../../../helpers/utils'

const FormikAutocomplete = (props) => {
  const {
    form,
    options,
    field,
    label,
    nameKey,
    valueKey,
    onKeyDown,
    optionId,
    fValue,
    fType,
    nameKey2,
    onChangeFx,
  } = props
  const { name } = field

  if (isEmpty(options) || (fValue == '' && fType == 'edit')) {
    return <TextField variant="outlined" onKeyDown={onKeyDown} label={label} {...props} />
  }
  return (
    <Autocomplete
      {...props}
      {...field}
      getOptionLabel={(option) =>
        !isEmpty(nameKey2) && option[nameKey]
          ? option[nameKey] + ` rev.` + option[nameKey2]
          : option[nameKey]
          ? option[nameKey]
          : ''
      }
      value={options.find((option) => option[optionId] === form.values[name]) || {}}
      onChange={(_, value) => {
        value && form.setFieldValue(name, value[valueKey]), onChangeFx(value || '')
      }}
      renderInput={(props) => {
        return <TextField variant="outlined" label={label} {...props} />
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
  onKeyDown: PropTypes.func,
  optionId: PropTypes.string,
  fValue: PropTypes.any,
  fType: PropTypes.string,
  nameKey2: PropTypes.string,
  onChangeFx: PropTypes.func,
}
FormikAutocomplete.defaultProps = {
  form: {},
  label: '',
  options: [],
  field: {},
  nameKey: 'name',
  valueKey: '',
  onKeyDown: () => {},
  optionId: 'id',
  fValue: '',
  fType: '',
  nameKey2: '',
  onChangeFx: () => {},
}

export default FormikAutocomplete
