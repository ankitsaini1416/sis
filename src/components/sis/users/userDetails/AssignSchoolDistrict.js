import { Box, Button, IconButton, InputAdornment, Tooltip, Typography } from '@material-ui/core'
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

import { ROLE_SELECTION_TYPES } from '../../../../helpers/constants'
import { AGMSchema } from './../../../../../clientFiles/validations'
import FormikAutoComplete from './../../../common/formikComponents/FormikAutoComplete'
import SelectOrgType from './../../administration/SelectOrgType'

const initialState = {
  districtId: '',
  schoolId: '',
}
/**
 * Defines a component Assign School District
 * @param props
 * @returns {*}
 * @constructor
 */

function AssignSchoolDistrict({
  open,
  onClose,
  districts,
  schools,
  searchSchools,
  attachOrganization,
  authUser,
  orgType,
  setOrgType,
}) {
  const { t } = useTranslation()
  const districtCode = useRef('')
  const [org, setOrg] = useState('')

  const onSubmit = function (values) {
    attachOrganization(values, { callback: close })
  }

  const close = function () {
    onClose()
    setOrg('')
    setOrgType('')
  }
  /**
   * Render JSX of  Assign School District modal
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
              {t('assignSchoolsAndDistricts')}
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
        <Formik
          onSubmit={onSubmit}
          initialValues={initialState}
          validationSchema={AGMSchema.assignEntitiesToUser}
        >
          {({ values, dirty }) => {
            if (values.districtId && values.districtId !== districtCode.current) {
              searchSchools(values.districtId)
              districtCode.current = values.districtId
            }
            return (
              <Form>
                <DialogContent>
                  <>
                    <Box>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:selectDistrict')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        id="districtId"
                        name="districtId"
                        options={districts}
                        valueKey="dst_id"
                        nameKey="dst_name"
                        optionId="dst_id"
                        component={FormikAutoComplete}
                        variant="outlined"
                        fullWidth
                        size="small"
                        select
                        pr={0}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconSelectDistrict')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:selectDistrict')}) ({t('fields:mandatory')}) (
                            {t('fields:helpIconSelectDistrict')})
                          </span>
                        }
                      />
                      <ErrorMessage name="districtId">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:district') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Box>
                    {orgType === ROLE_SELECTION_TYPES.SCHOOL && (
                      <Box mt={2}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:selectSchool')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>

                        <Field
                          id="schoolId"
                          component={FormikAutoComplete}
                          options={schools}
                          className="custom-input-field"
                          name="schoolId"
                          nameKey="sch_name"
                          valueKey="sch_school_public_id"
                          optionId="sch_school_public_id"
                          variant="outlined"
                          fullWidth
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:helpIconSelectSchoolsHelp')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:selectSchool')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconSelectSchoolsHelp')})
                            </span>
                          }
                        />
                        <ErrorMessage name="schoolId">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:country') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    )}
                  </>
                </DialogContent>
                <DialogActions>
                  <Button
                    className="custom-default-button text-transform-none"
                    onClick={close}
                    size="large"
                    variant="contained"
                    disableElevation
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    disableElevation
                    disabled={!dirty}
                    type="submit"
                    className="text-transform-none"
                  >
                    {t('add')}
                  </Button>
                </DialogActions>
              </Form>
            )
          }}
        </Formik>
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
              className="custom-default-button text-transform-none"
              onClick={close}
              size="large"
              variant="contained"
              disableElevation
            >
              {t('cancel')}
            </Button>
            <Button
              color="primary"
              variant="contained"
              className="text-transform-none"
              size="large"
              disableElevation
              disabled={!org}
              onClick={() => {
                if (org === ROLE_SELECTION_TYPES.ROOT) {
                  onSubmit(initialState)
                } else {
                  setOrgType(org)
                }
              }}
            >
              {t('proceed')}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

AssignSchoolDistrict.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  districts: PropTypes.array,
  schools: PropTypes.array,
  searchSchools: PropTypes.func,
  attachOrganization: PropTypes.func,
  authUser: PropTypes.object,
  orgType: PropTypes.string,
  setOrgType: PropTypes.func,
}
AssignSchoolDistrict.defaultProps = {
  open: false,
  onClose: () => {},
  districts: [],
  schools: [],
  searchSchools: () => {},
  attachOrganization: () => {},
  authUser: {},
  orgType: () => {},
  setOrgType: () => {},
}
/**
 /**
 * Assign School District modal component
 */
export default AssignSchoolDistrict
