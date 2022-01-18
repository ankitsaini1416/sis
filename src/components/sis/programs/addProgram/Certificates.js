import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, HelpCircle, Plus, Trash } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'

import { CoreSchema } from '../../../../../clientFiles/validations'
import { get } from '../../../../helpers/utils'
import useStyles from '../Programs.Style'

const initialState = {
  add: [
    {
      pt_transcript_name: '',
      pt_transcript_template_id: '',
      id: '6112ae1c-9b3e-7e7a-8198-7a890bca512e',
    },
  ],
}

// eslint-disable-next-line no-unused-vars
function Certificates({ addTranscripts, transcripts }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const onSubmit = function (values, { setErrors }) {
    addTranscripts(values, { setErrors })
  }
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialState}
      enableReinitialize={true}
      validationSchema={CoreSchema.addProgramCertificate}
    >
      {({ values, setFieldValue }) => {
        let usedAttributes = values.add.map((item) => item.pt_transcript_template_id)
        return (
          <Form className={classes.form} noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={10} lg={8} xl={8}>
                <Box mb={2} width="100%">
                  <Typography
                    component=""
                    align="left"
                    variant="body2"
                    color="Primary"
                    className="bg-color-surface"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="16px">
                      {t('certificateTranscripts')}
                    </Box>
                  </Typography>
                </Box>
                {get(values, 'add', []).map((attribute, index) => {
                  return (
                    <Box position="relative" key={`${attribute.id}`}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box mt={1} mb={1}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              {index === 0 ? (
                                <Box component="span" fontWeight="600">
                                  {t('fields:defaultDocument')}
                                </Box>
                              ) : (
                                <Box component="span" fontWeight="600">
                                  {t('fields:documentName')}
                                </Box>
                              )}

                              <Box component="span" className="mandatory">
                                {t('fields:mandatory')}
                              </Box>
                            </Typography>
                            <Field
                              className="custom-input-field"
                              as={TextField}
                              fullWidth
                              id={`add[${index}].pt_transcript_name`}
                              name={`add[${index}].pt_transcript_name`}
                              value={attribute.pt_transcript_name}
                              onChange={(e) => {
                                setFieldValue(
                                  'add',
                                  values.add.map((item) => {
                                    if (item.id === attribute.id) {
                                      return {
                                        ...attribute,
                                        pt_transcript_name: e.target.value,
                                      }
                                    }
                                    return item
                                  })
                                )
                              }}
                              variant="outlined"
                              size="small"
                              label={
                                <span style={visuallyHidden}>
                                  {index === 0 ? (
                                    <>({t('fields:defaultDocument')})</>
                                  ) : (
                                    <>({t('fields:documentName')})</>
                                  )}
                                  ({t('fields:required')})
                                </span>
                              }
                            />
                            <ErrorMessage name={`add[${index}].pt_transcript_name`}>
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:documentName') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Box>
                        </Grid>
                        <Grid item xs={index !== 0 ? 10 : 12} sm={12} md={6}>
                          <Box mt={1} mb={1}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:selectTemplate')}
                              </Box>
                              <Box component="span" className="mandatory">
                                {t('fields:mandatory')}
                              </Box>
                            </Typography>
                            <Field
                              as={TextField}
                              className={classes.selectIcon + ' custom-input-field'}
                              type="text"
                              id={`add[${index}].pt_transcript_template_id`}
                              name={`add[${index}].pt_transcript_template_id`}
                              value={attribute.pt_transcript_template_id}
                              onChange={(e) => {
                                setFieldValue(
                                  'add',
                                  values.add.map((item) => {
                                    if (item.id === attribute.id) {
                                      return {
                                        ...attribute,
                                        pt_transcript_template_id: e.target.value,
                                      }
                                    }
                                    return item
                                  })
                                )
                              }}
                              defaultValue=""
                              variant="outlined"
                              size="small"
                              pr={0}
                              fullWidth
                              select
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip title={t('fields:selectTemplateHelp')} placement="top">
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:selectTemplate')}) ({t('fields:required')}) (
                                  {t('fields:selectTemplateHelp')})
                                </span>
                              }
                            >
                              {transcripts.map((row) => (
                                <MenuItem
                                  disabled={usedAttributes.includes(row.tt_id)}
                                  key={row.tt_id}
                                  value={row.tt_id}
                                >
                                  {row.tt_template_name}
                                </MenuItem>
                              ))}
                            </Field>
                            <ErrorMessage name={`add[${index}].pt_transcript_template_id`}>
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, {
                                    field: t('fields:selectTemplate'),
                                  })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Box>
                        </Grid>
                        {index !== 0 ? (
                          <Grid item xs="auto" className={classes.removeField}>
                            <Box mt={{ xs: 4, sm: 0 }}>
                              <IconButton
                                aria-label={t('remove')}
                                disableElevation
                                data-id={attribute.id}
                                onClick={() => {
                                  setFieldValue(
                                    'add',
                                    values.add.filter((item) => item.id !== attribute.id)
                                  )
                                }}
                                color="secondary"
                              >
                                <Trash width={16} height={16} />
                              </IconButton>
                            </Box>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Box>
                  )
                })}
                <Box width="100%" display="flex" alignItems="flex-end" justifyContent="flex-end">
                  <Button
                    className="text-transform-none"
                    color="primary"
                    disableElevation
                    data-id={1}
                    onClick={() => {
                      setFieldValue('add', [
                        ...values.add,
                        {
                          pt_transcript_template_id: '',
                          pt_transcript_name: '',
                          id: uuid(),
                        },
                      ])
                    }}
                    disabled={
                      values.add[values.add.length - 1].pt_transcript_template_id === '' ||
                      values.add[values.add.length - 1].pt_transcript_name === ''
                    }
                    startIcon={<Plus width={16} height={16} />}
                  >
                    {t('addMore')}
                  </Button>
                </Box>
                <Box
                  mt={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  flexDirection="row"
                >
                  {/* <Box mr={1}>
                    <Button
                      onClick={handleBack}
                      className="custom-default-button text-transform-none"
                      size="large"
                      variant="contained"
                      disableElevation
                    >
                      {t('previous')}
                    </Button>
                  </Box> */}
                  <Button
                    className="text-transform-none"
                    size="large"
                    variant="contained"
                    disableElevation
                    endIcon={<ArrowRight />}
                    color="primary"
                    type="submit"
                  >
                    {t('saveAndContinue')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

Certificates.propTypes = {
  // handleBack: PropTypes.func,
  addTranscripts: PropTypes.func,
  transcripts: PropTypes.array,
}

Certificates.defaultProps = {
  // handleBack: () => {},
  addTranscripts: () => {},
  transcripts: [],
}

export default Certificates
