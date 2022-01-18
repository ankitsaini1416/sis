import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { AGMSchema } from '../../../../../clientFiles/validations'
import { ROLE_SELECTION_TYPES } from '../../../../helpers/constants'
import FormikAutocomplete from '../../../common/formikComponents/FormikAutoComplete'
import SelectOrgType from './../SelectOrgType'
import useStyles from './Roles.Style'

const initialState = {
  districtId: '',
  schoolId: '',
  name: '',
  description: '',
}

/**
 * Defines a component Create Role
 * @param props
 * @returns {*}
 * @constructor
 */

function CreateRole({
  open,
  onClose,
  addCustomRole,
  districts,
  fetchSchool,
  addRoleSchools,
  orgType,
  setOrgType,
  authUser,
}) {
  const { t } = useTranslation()
  const classes = useStyles()
  const [org, setOrg] = useState('')
  const districtCode = useRef('')
  const onSubmit = function (values, { setErrors }) {
    addCustomRole(values, {
      setErrors,
      callback: () => {
        close()
      },
    })
  }

  const close = function () {
    onClose()
    setOrg('')
    setOrgType('')
  }

  /**
   * Render JSX of  Create Role modal
   */
  return (
    <Dialog
      paper
      className="custom-dialog"
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle disableTypography id="customized-dialog-title" onClose={close}>
        <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" tabIndex={0}>
            <Box component="span" fontWeight="fontWeightBold">
              {t('addNewCustomRole')}
            </Box>
          </Typography>
          {onClose ? (
            <IconButton aria-label="close" className="close-button" onClick={close} tabIndex={-1}>
              <X />
            </IconButton>
          ) : null}
        </Box>
      </DialogTitle>
      {orgType ? (
        <>
          <Formik
            onSubmit={onSubmit}
            validationSchema={AGMSchema.createCustomRole}
            enableReinitialize={true}
            initialValues={initialState}
          >
            {({ values, setFieldValue }) => {
              if (values.districtId !== districtCode.current) {
                fetchSchool(values.districtId)
                districtCode.current = values.districtId
              }
              return (
                <Form>
                  <DialogContent>
                    <>
                      {orgType !== ROLE_SELECTION_TYPES.ROOT && (
                        <>
                          <Box mb={2}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                              tabIndex={0}
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:district')}
                              </Box>
                              <Box component="span" className="mandatory">
                                {t('fields:mandatory')}
                              </Box>
                            </Typography>
                            <Field
                              className={classes.selectIcon + ' custom-input-field'}
                              id="districtId"
                              name="districtId"
                              options={districts}
                              component={FormikAutocomplete}
                              nameKey="dst_name"
                              valueKey="dst_id"
                              optionId="dst_id"
                              variant="outlined"
                              fullWidth
                              size="small"
                              select
                              pr={0}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip
                                      title={t('fields:selectDistrictHelp')}
                                      placement="top"
                                      aria-label={t('fields:selectDistrictHelp')}
                                      tabIndex={0}
                                    >
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <ErrorMessage name="districtId">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:selectDistrict') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Box>
                          {orgType === ROLE_SELECTION_TYPES.SCHOOL && (
                            <Box mb={2}>
                              <Typography
                                component="p"
                                variant="body2"
                                color="textPrimary"
                                gutterBottom
                                tabIndex={0}
                              >
                                <Box component="span" fontWeight="600">
                                  {t('fields:selectSchool')}
                                </Box>
                                <Box component="span" className="mandatory">
                                  {t('fields:mandatory')}
                                </Box>
                              </Typography>
                              <FormControl size="small" variant="outlined" fullWidth>
                                <Select
                                  className={
                                    classes.selectIcon + ' custom-input-field custom-select-field'
                                  }
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  value={values.schoolId}
                                  name="schoolId"
                                  id="schoolId"
                                  onChange={(e) => {
                                    setFieldValue('schoolId', e.target.value)
                                  }}
                                  limitTags={2}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title={t('fields:helpIconSelectSchool')}
                                        placement="top"
                                      >
                                        <HelpCircle className="help-icon" />
                                      </Tooltip>
                                    </InputAdornment>
                                  }
                                >
                                  {addRoleSchools.map((school) => (
                                    <MenuItem
                                      key={school.sch_school_public_id}
                                      value={school.sch_school_public_id}
                                    >
                                      {school.sch_name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <ErrorMessage name="schoolId">
                                {(msg) => (
                                  <span className="error">
                                    {t(msg, { field: t('fields:selectSchool') })}
                                  </span>
                                )}
                              </ErrorMessage>
                            </Box>
                          )}
                        </>
                      )}
                      <Box mb={2}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:roleName')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="name"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="name"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconRoleName')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:roleName')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconRoleName')})
                            </span>
                          }
                        />
                        <ErrorMessage name="name">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:roleName') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                      <Box>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:roleDescription')}
                          </Box>
                          <Box component="span" className="optional">
                            ({t('fields:optional')})
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field CreateRole"
                          fullWidth
                          as={TextField}
                          id="description"
                          variant="outlined"
                          size="small"
                          multiline
                          rows={4}
                          name="description"
                          InputProps={{
                            endAdornment: (
                              <>
                                <InputAdornment position="end">
                                  <Tooltip
                                    title={t('fields:helpIconRoleDescription')}
                                    placement="top"
                                  >
                                    <HelpCircle className="help-icon" />
                                  </Tooltip>
                                </InputAdornment>
                              </>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:roleDescription')}) ({t('fields:optional')}) (
                              {t('fields:helpIconRoleDescription')})
                            </span>
                          }
                        />
                        <ErrorMessage name="description">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:roleDescription') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      className="text-transform-none custom-default-button"
                      onClick={close}
                      size="large"
                      variant="contained"
                      disableElevation
                    >
                      {t('cancel')}
                    </Button>
                    <Button
                      className="text-transform-none"
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="large"
                      disableElevation
                      disabled={
                        !values.name ||
                        (orgType === ROLE_SELECTION_TYPES.DISTRICT && !values.districtId) ||
                        (orgType === ROLE_SELECTION_TYPES.SCHOOL && !values.schoolId)
                      }
                    >
                      {t('save')}
                    </Button>
                  </DialogActions>
                </Form>
              )
            }}
          </Formik>
        </>
      ) : (
        <>
          <DialogContent>
            <SelectOrgType
              fieldData={{
                title: t('fields:whereRoleYouWantTo'),
              }}
              org={org}
              setOrg={setOrg}
              selectOrgTypes={
                authUser.isAdmin
                  ? Object.values(ROLE_SELECTION_TYPES)
                  : Object.values(ROLE_SELECTION_TYPES).filter(
                      (item) => item !== ROLE_SELECTION_TYPES.ROOT
                    )
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              className="text-transform-none custom-default-button"
              onClick={close}
              size="large"
              variant="contained"
              disableElevation
            >
              {t('cancel')}
            </Button>
            <Button
              className="text-transform-none"
              type="button"
              color="primary"
              variant="contained"
              size="large"
              disableElevation
              disabled={!org}
              onClick={() => setOrgType(org)}
            >
              {t('proceed')}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

CreateRole.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  addCustomRole: PropTypes.func,
  districts: PropTypes.array,
  addRoleSchools: PropTypes.array,
  fetchSchool: PropTypes.func,
  orgType: PropTypes.string,
  setOrgType: PropTypes.func,
  authUser: PropTypes.object,
}
CreateRole.defaultProps = {
  open: false,
  onClose: () => {},
  addCustomRole: () => {},
  districts: [],
  addRoleSchools: [],
  fetchSchool: () => {},
  orgType: '',
  setOrgType: () => {},
  authUser: {},
}
/**
 /**
 * Upload Files modal component
 */
export default CreateRole
