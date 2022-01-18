/* eslint-disable react/prop-types */
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React from 'react'

const DatePickerField = ({ field, form, onChangeCustom, ...other }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        name={field.name}
        value={field.value}
        format="dd MM yyyy"
        InputProps={{ readOnly: true }}
        // if you are using custom validation schema you probably want to pass `true` as third argument
        onChange={(date) => {
          form.setFieldValue(field.name, date, false)
          if (typeof onChangeCustom === 'function') {
            onChangeCustom({ date })
          }
        }}
        {...other}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePickerField
