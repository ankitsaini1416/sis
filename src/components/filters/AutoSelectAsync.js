import { Box, Button, Chip, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { ChevronDown } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { makeFakeEvent } from './../../helpers/utils'

/**
 * Defines a component Autocomplete Select
 * @param props
 * @returns {*}
 * @constructor
 */

function AutoSelectAsync({
  name,
  filter,
  setFilterValue,
  options,
  search,
  optionId,
  optionName,
  label,
  labelFallback,
}) {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const selectField = () => {
    setShow((prev) => !prev)
  }

  const handleClose = () => {
    setShow(false)
  }
  const value = options.find((option) => option[optionId] === filter[name]) || {}
  /**
   * Render JSX of  confirm Box modal
   */
  return (
    <Box position="relative">
      <Button
        className="filter-select-button"
        aria-controls="select-district-menu"
        aria-haspopup="true"
        endIcon={<ChevronDown className="color-blue-grey" />}
        onClick={selectField}
        variant="text"
        fullWidth
      >
        {filter[name] && value[optionName] ? (
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start">
            <Box mr={1}>{label}</Box>
            <Chip
              size="small"
              onDelete={() => {
                setFilterValue(
                  makeFakeEvent({
                    name,
                    value: '',
                  })
                )
              }}
              label={t(`reference:${value[optionName]}`)}
              variant="outlined"
              className="custom-chip"
            />
          </Box>
        ) : (
          <>{labelFallback}</>
        )}
      </Button>
      {show && (
        <Box open onClose={handleClose} className="filter-dropdown auto-search">
          <Autocomplete
            className="custom-input-filter"
            open
            onClose={handleClose}
            size="small"
            options={options}
            onInputChange={() => {
              search(event)
            }}
            fullWidth
            getOptionLabel={(option) => option[optionName] || ''}
            value={value}
            onChange={(_, value) => {
              if (!value) {
                return
              }
              setFilterValue(
                makeFakeEvent({
                  name,
                  value: value[optionId],
                })
              )
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <React.Fragment>{params.InputProps.endAdornment}</React.Fragment>,
                }}
              />
            )}
          />
        </Box>
      )}
    </Box>
  )
}

AutoSelectAsync.propTypes = {
  name: PropTypes.string.isRequired,
  filter: PropTypes.object,
  setFilterValue: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired,
  optionId: PropTypes.string,
  optionName: PropTypes.string,
  label: PropTypes.string,
  labelFallback: PropTypes.string,
}
AutoSelectAsync.defaultProps = {
  name: '',
  filter: {},
  setFilterValue: () => {},
  options: [],
  search: () => {},
  optionId: '',
  optionName: '',
  label: '',
  labelFallback: '',
}
/**
 /**
 * Confirm Box modal component
 */
export default AutoSelectAsync
