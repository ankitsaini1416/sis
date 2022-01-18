import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { CoreSchema } from '../../../../../clientFiles/validations'
import { ROUTES } from '../../../../helpers/constants'
import { serviceCode } from '../../../../helpers/stub'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import useStyles from '../Settings.Style'
import FormikAutoComplete from './../../../common/formikComponents/FormikAutoComplete'

function AddTemplate({ addTemplate, groups, searchSchools, districts, schools }) {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation()
  const districtCode = useRef('')

  const newFormInitialState = {
    content: '',
    name: '',
    nickname: '',
    skin: '',
    group: '',
    service_code: '',
    collection: '',
  }

  const onSubmit = function (values, { setErrors }) {
    addTemplate(values, { setErrors })
  }
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbSettings'),
      href: ROUTES.TEMPLATE,
    },
    {
      title: t('breadcrumbTemplates'),
      href: ROUTES.TEMPLATE,
    },
    {
      title: t('breadcrumbAddTemplate'),
      href: '',
    },
  ]
  //   const ButtonEnhanced = withRedirect(Button)
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="fontWeightBold" fontSize="24px">
                {t('addANewTemplate')}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box mb={2} mt={3} display="flex" width="100%" alignItems="center" justifyContent="center">
        <Paper rounded={true} elevation={1} className={classes.stepperTop + ' paper-round'}>
          <Box width="100%" py={2} px={{ xs: 2, sm: 3, lg: 5 }}>
            <Formik
              onSubmit={onSubmit}
              initialValues={newFormInitialState}
              validationSchema={CoreSchema.createTemplate}
            >
              {({ values }) => {
                if (values.districtId && values.districtId !== districtCode.current) {
                  searchSchools(values.districtId)
                  districtCode.current = values.districtId
                }
                return (
                  <Form className={classes.form} noValidate autoComplete="off">
                    <Box width="100%">
                      <Typography
                        component="h1"
                        align="left"
                        variant="h4"
                        color="textPrimary"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="fontWeightMedium" fontSize="24px">
                          {t('addANewTemplate')}
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
                          {t('enterAddANewTemplate')}
                        </Box>
                      </Typography>

                      <Box mt={3} width="100%">
                        <Box mt={2} mb={2}>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
                            <Box component="span" fontWeight="600">
                              {t('fields:templateFileName')}
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
                            autoFocus
                            autoComplete="name"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip
                                    title={t('fields:helpIconTemplateFileName')}
                                    placement="top"
                                  >
                                    <HelpCircle className="help-icon" />
                                  </Tooltip>
                                </InputAdornment>
                              ),
                            }}
                            label={
                              <span style={visuallyHidden}>
                                ({t('fields:templateFileName')}) ({t('fields:mandatory')}) (
                                {t('fields:helpIconTemplateFileName')})
                              </span>
                            }
                          />

                          <ErrorMessage name="name">
                            {(msg) => (
                              <span className="error" tabIndex={0}>
                                {t(msg, { field: t('fields:templateFileName') })}
                              </span>
                            )}
                          </ErrorMessage>
                        </Box>
                        <Box mb={2}>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
                            <Box component="span" fontWeight="600">
                              {t('fields:templateName')}
                            </Box>
                            <Box component="span" className="mandatory">
                              {t('fields:mandatory')}
                            </Box>
                          </Typography>
                          <Field
                            className="custom-input-field"
                            name="nickname"
                            as={TextField}
                            fullWidth
                            size="small"
                            id="nickname"
                            autoComplete="off"
                            variant="outlined"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip title={t('fields:helpIconTemplateName')} placement="top">
                                    <HelpCircle className="help-icon" />
                                  </Tooltip>
                                </InputAdornment>
                              ),
                            }}
                            label={
                              <span style={visuallyHidden}>
                                ({t('fields:templateName')}) ({t('fields:mandatory')}) (
                                {t('fields:helpIconTemplateName')})
                              </span>
                            }
                          />
                          <ErrorMessage name="nickname">
                            {(msg) => (
                              <span className="error" tabIndex={0}>
                                {t(msg, { field: t('fields:templateName') })}
                              </span>
                            )}
                          </ErrorMessage>
                        </Box>
                        <Box mt={2} mb={2}>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
                            <Box component="span" fontWeight="600">
                              {t('fields:uploadIntoEmailTemplateGroup')}
                            </Box>
                            <Box component="span" className="mandatory">
                              {t('fields:mandatory')}
                            </Box>
                          </Typography>
                          <Field
                            as={TextField}
                            className={classes.selectIcon + ' custom-input-field'}
                            select
                            variant="outlined"
                            fullWidth
                            size="small"
                            id="group"
                            name="group"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip
                                    title={t('fields:helpIconSelectTemplate')}
                                    placement="top"
                                  >
                                    <HelpCircle className="help-icon" />
                                  </Tooltip>
                                </InputAdornment>
                              ),
                            }}
                            label={
                              <span style={visuallyHidden}>
                                ({t('fields:uploadIntoEmailTemplateGroup')}) (
                                {t('fields:mandatory')}) ({t('fields:helpIconSelectTemplate')})
                              </span>
                            }
                          >
                            {groups.map((item) => (
                              <MenuItem key={item} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </Field>
                          <ErrorMessage name="group">
                            {(msg) => (
                              <span className="error" tabIndex={0}>
                                {t(msg, { field: t('fields:templateGroup') })}
                              </span>
                            )}
                          </ErrorMessage>
                        </Box>
                        <Box mt={3} width="100%">
                          <Box mt={2} mb={2}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:selectDistrict')}
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
                              as={TextField}
                              component={FormikAutoComplete}
                              variant="outlined"
                              fullWidth
                              size="small"
                              select
                              pr={0}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip
                                      title={t('fields:helpIconSelectDistrict')}
                                      placement="top"
                                    >
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
                                  {t(msg, { field: t('fields:selectDistrict') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Box>
                          <Box mb={2}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:selectSchool')}
                              </Box>
                            </Typography>
                            <Field
                              id="collection"
                              component={FormikAutoComplete}
                              as={TextField}
                              options={schools}
                              className={classes.selectIcon + ' custom-input-field'}
                              name="collection"
                              nameKey="sch_name"
                              disabled={!values.districtId}
                              valueKey="sch_school_public_id"
                              optionId="sch_school_public_id"
                              variant="outlined"
                              fullWidth
                              select
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
                            <ErrorMessage name="collection">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:selectSchool') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Box>
                          <Box mb={2}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:selectTemplateService')}
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
                              id="service_code"
                              name="service_code"
                              as={TextField}
                              limitTags={2}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip
                                      title={t('fields:helpIconTemplateService')}
                                      placement="top"
                                    >
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:selectTemplateService')}) ({t('fields:mandatory')}) (
                                  {t('fields:helpIconTemplateService')})
                                </span>
                              }
                              select
                            >
                              {serviceCode.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                  {t(`${item.name}`)}
                                </MenuItem>
                              ))}
                            </Field>
                            <ErrorMessage name="service_code" tabIndex={0}>
                              {(msg) => (
                                <span className="error">
                                  {t(msg, { field: t('fields:templateService') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent={{
                            xs: 'flex-start',
                            sm: 'flex-end',
                            md: 'flex-end',
                          }}
                          pt={{ xs: 3, sm: 4 }}
                          pb={3}
                        >
                          <Button
                            onClick={() => {
                              history.goBack()
                            }}
                            className="custom-default-button text-transform-none"
                            size="large"
                            variant="contained"
                            disableElevation
                          >
                            {t('cancel')}
                          </Button>
                          <Box ml={2}>
                            <Button
                              classes="text-transform-none"
                              variant="contained"
                              color="primary"
                              disableElevation
                              className="text-transform-none"
                              size="large"
                              type="submit"
                            >
                              {t('Save')}
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Form>
                )
              }}
            </Formik>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

AddTemplate.propTypes = {
  addTemplate: PropTypes.func,
  groups: PropTypes.array,
  districts: PropTypes.array,
  schools: PropTypes.array,
  searchSchools: PropTypes.func,
}
AddTemplate.propTypes = {
  addTemplate: () => {},
  groups: [],
  districts: [],
  schools: [],
  searchSchools: () => {},
}

export default AddTemplate
