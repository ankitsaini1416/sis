import DateFnsUtils from '@date-io/date-fns'
import { Box, Button, Chip, Grid } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Calendar, ChevronDown } from 'react-feather'

import { makeFakeEvent } from './../../helpers/utils'

/**
 * Defines a component Confirm Box
 * @param props
 * @returns {*}
 * @constructor
 */

function DateRange({
  fromDateName,
  toDateName,
  filter,
  setFilterValue,
  primaryLabel,
  fromLabel,
  toLabel,
  fromLabelFallback,
  toLabelFallback,
  primaryLabelSize,
}) {
  const [isToOpen, setIsToOpen] = useState(false)
  const [isFromOpen, setIsFromOpen] = useState(false)
  /**
   * Render JSX of  confirm Box modal
   */
  return (
    <Box
      display="flex"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      flexDirection={{ xs: 'column', sm: 'row' }}
    >
      <Box
        tabIndex={0}
        mb={{ xs: 1, sm: 0 }}
        ml={{ xs: 0, sm: 1 }}
        width={primaryLabelSize}
        fontSize="14px"
        fontWeight={500}
      >
        {primaryLabel}
      </Box>

      <Box width={{ xs: '100%', sm: 'auto' }} className="filter-date">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm="auto">
              <Button
                className="filter-select-button"
                aria-controls="created-date"
                aria-haspopup="true"
                endIcon={<ChevronDown className="color-blue-grey" />}
                variant="text"
                fullWidth
                onClick={() => setIsFromOpen(true)}
              >
                {filter[fromDateName] ? (
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Box mr={1}>{fromLabel}</Box>
                    <Chip
                      size="small"
                      onDelete={() => {
                        setFilterValue(
                          makeFakeEvent({
                            name: fromDateName,
                            value: '',
                          })
                        )
                      }}
                      label={moment(filter[fromDateName]).format('MM/DD/YYYY')}
                      variant="outlined"
                      className="custom-chip"
                    />
                  </Box>
                ) : (
                  <>{fromLabelFallback}</>
                )}
              </Button>
              <KeyboardDatePicker
                className="custom-picker"
                open={isFromOpen}
                onOpen={() => setIsFromOpen(true)}
                onClose={() => setIsFromOpen(false)}
                autoOk
                disableFuture
                variant="inline"
                inputVariant="outlined"
                keyboardIcon={<Calendar />}
                size="small"
                format="MM/dd/yyyy"
                id={fromDateName}
                name={fromDateName}
                value={filter[fromDateName] || null}
                onChange={(value) =>
                  setFilterValue({
                    target: {
                      name: [fromDateName],
                      value,
                    },
                  })
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={12} sm="auto">
              <Button
                className="filter-select-button"
                aria-controls="created-date"
                aria-haspopup="true"
                endIcon={<ChevronDown className="color-blue-grey" />}
                variant="text"
                fullWidth
                onClick={() => setIsToOpen(true)}
              >
                {filter[toDateName] ? (
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Box mr={1}> {toLabel}</Box>
                    <Chip
                      size="small"
                      onDelete={() => {
                        setFilterValue(
                          makeFakeEvent({
                            name: toDateName,
                            value: '',
                          })
                        )
                      }}
                      label={moment(filter[toDateName]).format('MM/DD/YYYY')}
                      variant="outlined"
                      className="custom-chip"
                    />
                  </Box>
                ) : (
                  <>{toLabelFallback}</>
                )}
              </Button>
              <KeyboardDatePicker
                className="custom-picker"
                open={isToOpen}
                onOpen={() => setIsToOpen(true)}
                onClose={() => setIsToOpen(false)}
                autoOk
                disableFuture
                variant="inline"
                inputVariant="outlined"
                keyboardIcon={<Calendar />}
                size="small"
                format="MM/dd/yyyy"
                id={toDateName}
                name={toDateName}
                value={filter[toDateName] || null}
                onChange={(value) =>
                  setFilterValue({
                    target: {
                      name: toDateName,
                      value,
                    },
                  })
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </Box>
    </Box>
  )
}

DateRange.propTypes = {
  fromDateName: PropTypes.string,
  toDateName: PropTypes.string,
  filter: PropTypes.object,
  setFilterValue: PropTypes.func.isRequired,
  primaryLabel: PropTypes.string,
  fromLabel: PropTypes.string,
  toLabel: PropTypes.string,
  fromLabelFallback: PropTypes.string,
  toLabelFallback: PropTypes.string,
  primaryLabelSize: PropTypes.any,
}
DateRange.defaultProps = {
  fromDateName: '',
  toDateName: '',
  filter: {},
  setFilterValue: () => {},
  primaryLabel: '',
  fromLabel: '',
  toLabel: '',
  fromLabelFallback: '',
  toLabelFallback: '',
  primaryLabelSize: '',
}
/**
 /**
 * Confirm Box modal component
 */
export default DateRange
