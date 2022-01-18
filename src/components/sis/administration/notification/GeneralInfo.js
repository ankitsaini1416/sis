import { Box, Checkbox, FormControlLabel, MenuItem } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { visuallyHidden } from '@mui/utils'
// import Autocomplete from '@material-ui/lab/Autocomplete'
import { ErrorMessage, Field } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Check, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'

import useStyles from '../Administration.Style'

function GeneralInfo({ processorList, values, setFieldValue }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const CheckboxWithGreenCheck = withStyles({})(Checkbox)

  return (
    <Box width="100%">
      <Typography component="h1" align="left" variant="h4" color="textPrimary" tabIndex={0}>
        <Box component="span" fontWeight="fontWeightMedium" fontSize="24px">
          {t('generalInformation')}
        </Box>
      </Typography>
      <Typography
        component="h6"
        align="left"
        variant="subtitle2"
        color="Primary"
        gutterBottom
        tabIndex={0}
      >
        <Box component="span" fontWeight="600">
          {t('enterGeneralInformationOfUser')}
        </Box>
      </Typography>

      <Box mt={3} width="100%">
        <Box mt={2} mb={2}>
          <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
            <Box component="span" fontWeight="600">
              {t('fields:topicName')}
            </Box>
            <Box component="span" className="mandatory">
              {t('fields:mandatory')}
            </Box>
          </Typography>
          <Field
            className="custom-input-field"
            name="name"
            id="name"
            as={TextField}
            variant="outlined"
            fullWidth
            size="small"
            autoComplete="name"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title={t('fields:helpIconTopicName')} placement="top">
                    <HelpCircle className="help-icon" />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            label={
              <span style={visuallyHidden}>
                ({t('fields:topicName')}) ({t('fields:mandatory')}) ({t('fields:helpIconTopicName')}
                )
              </span>
            }
          />
          <ErrorMessage name="name">
            {(msg) => (
              <span className="error" tabIndex={0}>
                {t(msg, { field: t('fields:topicName') })}
              </span>
            )}
          </ErrorMessage>
        </Box>
        <Box mb={2}>
          <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
            <Box component="span" fontWeight="600">
              {t('fields:processor')}
            </Box>
            <Box component="span" className="mandatory">
              {t('fields:mandatory')}
            </Box>
          </Typography>
          <Field
            as={TextField}
            fullWidth
            id="processor"
            name="processor"
            variant="outlined"
            size="small"
            select
            className={classes.selectIcon + ' custom-input-field'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title={t('fields:helpIconSelectProcessor')} placement="top">
                    <HelpCircle className="help-icon" />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            label={
              <span style={visuallyHidden}>
                ({t('fields:processor')}) ({t('fields:mandatory')}) (
                {t('fields:helpIconSelectProcessor')})
              </span>
            }
          >
            {processorList.map((key) => (
              <MenuItem value={key} key={key}>
                {key}
              </MenuItem>
            ))}
          </Field>
          <ErrorMessage name="processor">
            {(msg) => (
              <span className="error" tabIndex={0}>
                {t(msg, { field: t('message:processor') })}
              </span>
            )}
          </ErrorMessage>
        </Box>
        <Box mb={2}>
          <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
            <Box component="span" fontWeight="600">
              {t('fields:description')}
            </Box>
            <Box component="span" className="mandatory">
              {t('fields:mandatory')}
            </Box>
          </Typography>

          <Field
            className="custom-input-field"
            name="description"
            as={TextField}
            multiline
            rows={4}
            autoComplete="description"
            fullWidth
            size="small"
            variant="outlined"
            id="description"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title={t('fields:helpIconDescription')} placement="top">
                    <HelpCircle className="help-icon" />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            label={
              <span style={visuallyHidden}>
                ({t('fields:description')}) ({t('fields:mandatory')}) (
                {t('fields:helpIconDescription')})
              </span>
            }
          />
          <ErrorMessage name="description">
            {(msg) => (
              <span className="error" tabIndex={0}>
                {t(msg, { field: t('fields:description') })}
              </span>
            )}
          </ErrorMessage>
        </Box>
        <Box mb={2} className="custom-checkbox">
          <Box minWidth={{ xs: 'auto', sm: 'auto', md: '150px' }} align="left">
            <FormControlLabel
              control={
                <CheckboxWithGreenCheck
                  checkedIcon={<Check />}
                  color="Primary"
                  id="keep_logs"
                  name="keep_logs"
                  checked={values.keep_logs}
                  onChange={(e) => {
                    setFieldValue('keep_logs', e.target.checked)
                  }}
                />
              }
              label={t('fields:keepLogs')}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
GeneralInfo.propTypes = {
  processorList: PropTypes.array,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
}
GeneralInfo.defaultProps = {
  processorList: [],
  values: {},
  setFieldValue: () => {},
}
export default GeneralInfo
