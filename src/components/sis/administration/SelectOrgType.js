import { FormControl, MenuItem, Select } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React from 'react'
import { HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'

import useStyles from './Administration.Style'

function SelectOrgType({ org, setOrg, fieldData, selectOrgTypes }) {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Box>
      <Typography component="p" variant="body2" color="textPrimary" gutterBottom tabIndex={0}>
        <Box component="span" fontWeight="600">
          {fieldData.title}
        </Box>
      </Typography>
      <FormControl size="small" variant="outlined" fullWidth>
        <Select
          className={classes.selectIcon + ' custom-input-field custom-select-field'}
          fullWidth
          variant="outlined"
          size="small"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          name="roles"
          id="roles"
          limitTags={2}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title={t('fields:helpIconSelectSchool')} placement="top">
                <HelpCircle className="help-icon" />
              </Tooltip>
            </InputAdornment>
          }
        >
          {selectOrgTypes.map((type) => (
            <MenuItem value={type} key={type}>
              {t(`reference:${type}`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

SelectOrgType.propTypes = {
  org: PropTypes.string,
  setOrg: PropTypes.func,
  fieldData: PropTypes.object,
  selectOrgTypes: PropTypes.array,
}

SelectOrgType.defaultProps = {
  org: '',
  setOrg: () => {},
  fieldData: {},
  selectOrgTypes: [],
}

export default SelectOrgType
