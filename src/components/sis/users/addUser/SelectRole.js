import { Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { AGMSchema } from '../../../../../clientFiles/validations'
import useStyles from '../User.Style'

const initialState = {
  platform_role: '0',
  custom_role: '0',
}

function SelectRole({
  systemRoles,
  customRoles,
  toggleRolePayload,
  handleBack,
  rolePayload,
  authUser,
  orgPayload,
}) {
  const { t } = useTranslation()
  const classes = useStyles()
  const onSubmit = function (values) {
    toggleRolePayload({ customRole: values.custom_role, platformRole: values.platform_role })
  }
  return (
    <Formik
      initialValues={{
        custom_role: rolePayload?.customRole?.name || initialState.custom_role,
        platform_role: rolePayload?.platformRole?.name || initialState.platform_role,
      }}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={AGMSchema.assignRoleToUser}
    >
      {({ values }) => (
        <Form className={classes.form} noValidate autoComplete="off">
          <Box width="100%">
            <Typography component="h1" align="left" variant="h4" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="fontWeightMedium" fontSize="24px">
                {t('selectRoles')}
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
                {t('selectRolesForYourUser')}
              </Box>
            </Typography>

            <Box mt={3} width="100%">
              {authUser.isAdmin && !orgPayload.districtId && !orgPayload.schoolId && (
                <Box mt={2} mb={2}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:selectSystemRoles')}
                    </Box>
                    <Box component="span" className="mandatory">
                      {t('fields:mandatory')}
                    </Box>
                  </Typography>
                  <Field
                    className={classes.selectIcon + ' custom-input-field'}
                    variant="outlined"
                    fullWidth
                    size="small"
                    as={TextField}
                    name="platform_role"
                    id="platform_role"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t('fields:helpIconSystemRoles')} placement="top">
                            <HelpCircle className="help-icon" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:selectSystemRoles')}) ({t('fields:mandatory')}) (
                        {t('fields:helpIconSystemRoles')})
                      </span>
                    }
                    select
                  >
                    <MenuItem value="0">{'None'}</MenuItem>
                    {systemRoles.map((role) => (
                      <MenuItem key={role.urn} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage name="platform_role">
                    {(msg) => (
                      <span className="error" tabIndex={0}>
                        {t(msg, { field: t('fields:selectSystemRoles') })}
                      </span>
                    )}
                  </ErrorMessage>
                </Box>
              )}
              <Box mb={2}>
                <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                  <Box component="span" fontWeight="600">
                    {t('fields:selectCustomRoles')}
                  </Box>
                  <Box component="span" className="mandatory">
                    {t('fields:mandatory')}
                  </Box>
                </Typography>
                <Field
                  className={classes.selectIcon + ' custom-input-field'}
                  variant="outlined"
                  fullWidth
                  size="small"
                  id="custom_role"
                  name="custom_role"
                  as={TextField}
                  limitTags={2}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title={t('fields:helpIconSystemRoles')} placement="top">
                          <HelpCircle className="help-icon" />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  label={
                    <span style={visuallyHidden}>
                      ({t('fields:selectCustomRoles')}) ({t('fields:mandatory')}) (
                      {t('fields:helpIconSystemRoles')})
                    </span>
                  }
                  select
                >
                  <MenuItem value="0">{'None'}</MenuItem>
                  {customRoles.map((role) => (
                    <MenuItem key={role.urn} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="custom_role">
                  {(msg) => (
                    <span className="error" tabIndex={0}>
                      {t(msg, { field: t('message:selectCustomRoles') })}
                    </span>
                  )}
                </ErrorMessage>
              </Box>
            </Box>
          </Box>
          <Box pt={{ xs: 3, sm: 4 }} pb={3} display="flex" justifyContent="flex-end">
            <Box mr={2}>
              <Button
                onClick={handleBack}
                className="custom-default-button text-transform-none"
                size="large"
                variant="contained"
                disableElevation
              >
                {t('previous')}
              </Button>
            </Box>
            <Box>
              <Button
                classes="text-transform-none"
                variant="contained"
                color="primary"
                disableElevation
                type="submit"
                disabled={values.platform_role === '0' && values.custom_role === '0'}
                className="text-transform-none"
                size="large"
                endIcon={<ArrowRight />}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

SelectRole.propTypes = {
  handleBack: PropTypes.func,
  systemRoles: PropTypes.array,
  customRoles: PropTypes.array,
  toggleRolePayload: PropTypes.func,
  rolePayload: PropTypes.object,
  authUser: PropTypes.object,
  orgPayload: PropTypes.object,
}

SelectRole.defaultProps = {
  handleBack: () => {},
  systemRoles: [],
  customRoles: [],
  toggleRolePayload: () => {},
  rolePayload: {},
  authUser: {},
  orgPayload: {},
}

export default SelectRole
