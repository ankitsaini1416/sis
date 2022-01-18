import { Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { ArrowRight, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROLE_SELECTION_TYPES } from '../../../../helpers/constants'
import useStyles from '../User.Style'
import { AGMSchema } from './../../../../../clientFiles/validations'
import { mapWithState } from './../../../../helpers/utils'
import FormikAutoComplete from './../../../common/formikComponents/FormikAutoComplete'
import SelectOrgType from './../../administration/SelectOrgType'

const initialState = {
  districtId: '',
  schoolId: '',
}

function SchoolDistrict({
  districts,
  schools,
  searchSchools,
  toggleOrgPayload,
  orgPayload,
  orgType,
  setOrgType,
  authUser,
}) {
  const classes = useStyles()
  const districtCode = useRef('')
  const [org, setOrg] = useState('')
  const { t } = useTranslation()
  const onSubmit = function (values, { setErrors }) {
    toggleOrgPayload(values, { setErrors })
  }
  return orgType ? (
    <Formik
      onSubmit={onSubmit}
      initialValues={mapWithState(initialState, orgPayload)}
      validationSchema={AGMSchema.assignEntitiesToUser}
      enableReinitialize={true}
    >
      {({ values }) => {
        if (values.districtId && values.districtId !== districtCode.current) {
          searchSchools(values.districtId)
          districtCode.current = values.districtId
        }
        return (
          <Form className={classes.form} noValidate autoComplete="off">
            <Box width="100%">
              <Typography component="h1" align="left" variant="h4" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight="fontWeightMedium" fontSize="24px">
                  {t('schoolsAndDistricts')}
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
                  {t('attachSchoolsAndDistricts')}
                </Box>
              </Typography>
              <Box mt={3} width="100%">
                <Box mt={2} mb={2}>
                  <Typography
                    component="p"
                    variant="body2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600">
                      {t('fields:selectDistrict')}
                    </Box>
                    <Box component="span" className="mandatory">
                      ({t('fields:mandatory')})
                    </Box>
                  </Typography>
                  <Field
                    className={classes.selectIcon + ' custom-input-field'}
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
                  <Box mb={2}>
                    <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                      <Box component="span" fontWeight="600">
                        {t('fields:selectSchool')}
                      </Box>
                      <Box component="span" className="mandatory">
                        ({t('fields:mandatory')})
                      </Box>
                    </Typography>
                    <Field
                      id="schoolId"
                      component={FormikAutoComplete}
                      options={schools}
                      className={classes.selectIcon + ' custom-input-field'}
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
                            <Tooltip title={t('fields:helpIconSelectSchoolsHelp')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:selectSchool')}) ({t('fields:optional')}) (
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
              </Box>
            </Box>
            <Box pt={{ xs: 3, sm: 4 }} pb={3} display="flex" justifyContent="flex-end">
              <Box>
                <Button
                  classes="text-transform-none"
                  variant="contained"
                  color="primary"
                  disableElevation
                  type="submit"
                  className="text-transform-none"
                  size="large"
                  disabled={
                    (orgType === ROLE_SELECTION_TYPES.DISTRICT && !values.districtId) ||
                    (orgType === ROLE_SELECTION_TYPES.SCHOOL && !values.schoolId)
                  }
                  endIcon={<ArrowRight />}
                >
                  Create User
                </Button>
              </Box>
            </Box>
          </Form>
        )
      }}
    </Formik>
  ) : (
    <>
      <Box width="100%">
        <Box mb={3}>
          <Typography component="h1" align="left" variant="h4" color="textPrimary" tabIndex={0}>
            <Box component="span" fontWeight="fontWeightMedium" fontSize="24px">
              {t('schoolsAndDistricts')}
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
              {t('attachSchoolsAndDistricts')}
            </Box>
          </Typography>
        </Box>
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
      </Box>
      <Box pt={{ xs: 3, sm: 4 }} pb={3} display="flex" justifyContent="flex-end">
        <Box>
          <Button
            classes="text-transform-none"
            variant="contained"
            color="primary"
            disableElevation
            className="text-transform-none"
            size="large"
            disabled={!org}
            onClick={() => setOrgType(org)}
            endIcon={<ArrowRight />}
          >
            {t('proceed')}
          </Button>
        </Box>
      </Box>
    </>
  )
}

SchoolDistrict.propTypes = {
  districts: PropTypes.array,
  schools: PropTypes.array,
  searchSchools: PropTypes.func,
  toggleOrgPayload: PropTypes.func,
  orgPayload: PropTypes.object,
  orgType: PropTypes.string,
  setOrgType: PropTypes.func,
  authUser: PropTypes.object,
}

SchoolDistrict.defaultProps = {
  districts: [],
  schools: [],
  searchSchools: () => {},
  toggleOrgPayload: () => {},
  orgPayload: {},
  orgType: '',
  setOrgType: () => {},
  authUser: {},
}

export default SchoolDistrict
