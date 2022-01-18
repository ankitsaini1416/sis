import { Box, Button, Chip, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { ChevronDown } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { makeFakeEvent } from './../../helpers/utils'

/**
 * Defines a component InputTextFilter
 * @param props
 * @returns {*}
 * @constructor
 */

function InputTextFilter({ name, filter, setFilterValue, label, labelFallback }) {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const selectField = () => {
    setShow((prev) => !prev)
  }

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
        {filter[name] ? (
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
              label={t(`reference:${filter.f_filename}`)}
              variant="outlined"
              className="custom-chip"
            />
          </Box>
        ) : (
          <>{labelFallback}</>
        )}
      </Button>
      <Box
        display={show ? 'flex' : 'none'}
        className="filter-dropdown auto-search"
        minWidth={{ xs: '100%', sm: '150px' }}
      >
        <TextField
          className="custom-input-filter input-search"
          variant="outlined"
          fullWidth
          size="small"
          id="f_filename"
          name="f_filename"
          value={filter.f_filename}
          onChange={setFilterValue}
          placeholder={t('fields:fileName')}
        />
      </Box>
    </Box>
  )
}

InputTextFilter.propTypes = {
  name: PropTypes.string.isRequired,
  filter: PropTypes.object,
  setFilterValue: PropTypes.func.isRequired,
  label: PropTypes.string,
  labelFallback: PropTypes.string,
}
InputTextFilter.defaultProps = {
  name: '',
  filter: {},
  setFilterValue: () => {},
  label: '',
  labelFallback: '',
}
/**
 /**
 * InputTextFilter modal component
 */
export default InputTextFilter
