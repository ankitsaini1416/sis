import { Box, Button, Chip, FormControl, MenuItem, Select } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { ChevronDown } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { makeFakeEvent } from './../../helpers/utils'

/**
 * Defines a component Confirm Box
 * @param props
 * @returns {*}
 * @constructor
 */

function SelectDropDown({
  name,
  filter,
  setFilterValue,
  options,
  label,
  labelFallback,
  optionId,
  optionName,
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
        className="filter-select-button select-dropdown"
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
      <Box className="filter-dropdown">
        <FormControl size="small" variant="outlined" fullWidth>
          <Select
            fullWidth
            className="custom-input-filter"
            value={filter[name]}
            name={name}
            id={name}
            open={show}
            onClose={handleClose}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
              classes: { paper: 'custom-select-list' },
              elevation: 2,
            }}
          >
            {options.map((item) => (
              <MenuItem
                onClick={() => {
                  setFilterValue(
                    makeFakeEvent({
                      name,
                      value: item[optionId],
                    })
                  )
                }}
                key={item[optionId]}
                value={item[optionId]}
              >
                {item[optionName]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

SelectDropDown.propTypes = {
  name: PropTypes.string.isRequired,
  filter: PropTypes.object,
  setFilterValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.element),
  label: PropTypes.string,
  labelFallback: PropTypes.string,
  optionId: PropTypes.string,
  optionName: PropTypes.string,
}
SelectDropDown.defaultProps = {
  name: '',
  filter: {},
  setFilterValue: () => {},
  options: null,
  label: '',
  optionId: '',
  optionName: '',
  labelFallback: '',
}
/**
 /**
 * Confirm Box modal component
 */
export default SelectDropDown
