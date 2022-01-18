/* eslint-disable no-unused-vars */
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
import { Archive, Check, Edit2, HelpCircle, Plus, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { CoreSchema } from '../../../../../clientFiles/validations'
import { isEmpty } from '../../../../helpers/utils'
import { get, mapStateWithData } from '../../../../helpers/utils'
import ConfirmBox from '../../../common/ConfirmBox'
import useStyles from '../Programs.Style'

const ADDID = '0dc3cb6c-0559-11ec-9a03-0242ac130003'
const initialState = {
  pt_transcript_name: '',
  pt_transcript_template_id: '',
  pt_id: ADDID,
}

function CertificatesDetail({
  addTranscripts,
  transcripts,
  details,
  openDeletePopup,
  toggleDeletePopup,
  deleteCertificateItems,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const [certificates, setCertificates] = React.useState([
    ...get(details, 'pgm_program_transcripts', []).map((item) => ({ ...item, isEdit: false })),

    {
      pt_transcript_name: '',
      pt_transcript_template_id: '',
      isEdit: true,
    },
  ])
  React.useEffect(() => {
    setCertificates([
      ...get(details, 'pgm_program_transcripts', []).map((item) => ({ ...item, isEdit: false })),

      {
        pt_transcript_name: '',
        pt_transcript_template_id: '',
        isEdit: true,
      },
    ])
  }, [get(details, 'pgm_program_transcripts', [])])
  const onSubmit = function (values, { setErrors }) {
    if (values.pt_id !== ADDID) {
      addTranscripts({ update: [values] }, { setErrors })
    } else {
      delete values.pt_id
      addTranscripts({ add: [values] }, { setErrors })
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={11} lg={8} xl={7}>
        <Typography component="" align="left" variant="body2" gutterBottom tabIndex={0}>
          <Box component="span" fontWeight="600" fontSize="16px">
            {t('certificateTranscripts')}
          </Box>
        </Typography>

        {certificates.map((data) => {
          return (
            <Formik
              key={data.id}
              onSubmit={onSubmit}
              initialValues={mapStateWithData(data, initialState)}
              enableReinitialize={true}
              validationSchema={CoreSchema.CertificatesDetail}
            >
              {({ values, handleSubmit, resetForm }) => (
                <Form className={classes.form} noValidate autoComplete="off">
                  <Box
                    mt={2}
                    px={3}
                    py={2}
                    position="relative"
                    className="certificate-list"
                    hover
                    data-id={data.id}
                    key={data.id}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Box mb={{ xs: 2, lg: 0 }}>
                          <Typography
                            tabIndex={0}
                            component="h6"
                            align="left"
                            variant="h6"
                            color="textPrimary"
                          >
                            {/* <Box component="span" fontWeight="600" fontSize="14px">
                              {t('defaultDocument')}
                            </Box> */}
                            {!data.isEdit ? (
                              <Box component="span" fontWeight="600" fontSize="14px">
                                {t('fields:defaultDocument')}
                              </Box>
                            ) : (
                              <Box component="span" fontWeight="600" fontSize="14px">
                                {t('fields:documentName')}
                              </Box>
                            )}
                          </Typography>
                          <Typography
                            component="h6"
                            align="left"
                            variant="subtitle2"
                            color="textPrimary"
                            gutterBottom
                          >
                            {!data.isEdit ? (
                              <Box
                                className="break-word"
                                component="span"
                                fontWeight="fontWeightRegular"
                                fontSize="16px"
                                tabIndex={0}
                              >
                                {data.pt_transcript_name}
                              </Box>
                            ) : (
                              <Field
                                className="custom-input-field"
                                as={TextField}
                                variant="outlined"
                                fullWidth
                                size="small"
                                name={`pt_transcript_name`}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip title={t('fields:documentNameHelp')} placement="top">
                                        <HelpCircle className="help-icon" />
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                }}
                                label={
                                  <span style={visuallyHidden}>
                                    ({data.pt_transcript_name}) ({t('fields:required')}) (
                                    {t('fields:documentNameHelp')})
                                  </span>
                                }
                              />
                            )}
                            <ErrorMessage name="pt_transcript_name">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:documentName') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box mb={{ xs: 2, lg: 0 }}>
                          <Typography
                            component="h6"
                            align="left"
                            variant="h6"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="600" fontSize="14px">
                              {t('template')}
                            </Box>
                          </Typography>
                          <Typography
                            component="h6"
                            align="left"
                            variant="subtitle2"
                            color="textPrimary"
                          >
                            {!data.isEdit ? (
                              <Box
                                component="span"
                                fontWeight="fontWeightRegular"
                                fontSize="16px"
                                tabIndex={0}
                              >
                                {data?.pt_transcript_template?.tt_template_name}
                              </Box>
                            ) : (
                              <Field
                                className={classes.selectIcon + ' custom-input-field'}
                                as={TextField}
                                variant="outlined"
                                fullWidth
                                size="small"
                                select
                                name="pt_transcript_template_id"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title={t('fields:selectTemplateHelp')}
                                        placement="top"
                                      >
                                        <HelpCircle className="help-icon" />
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                }}
                                label={
                                  <span style={visuallyHidden}>
                                    ({data?.pt_transcript_template?.tt_template_name}) (
                                    {t('fields:required')}) ({t('fields:selectTemplateHelp')})
                                  </span>
                                }
                              >
                                {transcripts.map((row) => (
                                  <MenuItem key={row.tt_id} value={row.tt_id}>
                                    {row.tt_template_name}
                                  </MenuItem>
                                ))}
                              </Field>
                            )}
                            <ErrorMessage name="pt_transcript_template_id">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:selectTemplate') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {!data.isEdit ? (
                      <Box
                        mt={{ xs: 1, sm: 0 }}
                        display="flex"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        justifyContent={{ xs: 'flex-start', sm: 'center' }}
                        flexDirection={{ xs: 'row', sm: 'column' }}
                        className="certificate-edit"
                      >
                        <Tooltip title={t('edit')}>
                          <IconButton
                            aria-label={t('edit')}
                            onClick={() => {
                              setCertificates((oldState) => {
                                return oldState.map((item) => {
                                  if (data.pt_id === item.pt_id) {
                                    return {
                                      ...item,
                                      isEdit: true,
                                    }
                                  }
                                  return {
                                    ...item,
                                    isEdit: !item.pt_id,
                                  }
                                })
                              })
                            }}
                            data-id={data.pt_id}
                            color="primary"
                            className="icon-button-primary"
                          >
                            <Edit2 width={16} height={16} />
                          </IconButton>
                        </Tooltip>
                        <Box ml={{ xs: 1, sm: 0 }} mt={{ xs: 0, sm: 1 }}>
                          <Tooltip title={t('archive')}>
                            <IconButton
                              aria-label={t('archive')}
                              data-id={data.pt_id}
                              className="icon-button-secondary"
                              disableElevation
                              disabled={!data.pt_id}
                              color="secondary"
                              onClick={toggleDeletePopup}
                            >
                              <Archive width="16px" height="16px" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        mt={{ xs: 1, sm: 1.5 }}
                        display="flex"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        justifyContent={{ xs: 'flex-start', sm: 'center' }}
                        flexDirection={{ xs: 'row', sm: 'column' }}
                        className="certificate-edit"
                      >
                        <Tooltip title={t('save')}>
                          <IconButton
                            aria-label={t('save')}
                            disableElevation
                            color="primary"
                            className="icon-button-primary"
                            onClick={handleSubmit}
                            disabled={
                              !values.pt_transcript_name || !values.pt_transcript_template_id
                            }
                          >
                            <Check width={16} height={16} />
                          </IconButton>
                        </Tooltip>
                        <Box ml={{ xs: 1, sm: 0 }} mt={{ xs: 0, sm: 1 }}>
                          <Tooltip title={t('remove')}>
                            <IconButton
                              aria-label={t('remove')}
                              data-id={data.pt_id}
                              className="icon-button-secondary"
                              disableElevation
                              disabled={!data.pt_id}
                              color="secondary"
                              onClick={() => {
                                resetForm()
                                setCertificates(
                                  certificates.map((item) => {
                                    if (item.id === ADDID) {
                                      return {
                                        ...item,
                                        isEdit: true,
                                      }
                                    }
                                    return {
                                      ...item,
                                      isEdit: !item.pt_id,
                                    }
                                  })
                                )
                              }}
                            >
                              <X width={16} height={16} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Form>
              )}
            </Formik>
          )
        })}
      </Grid>
      <ConfirmBox
        maxWidth="xs"
        open={openDeletePopup}
        close={toggleDeletePopup}
        onConfirm={deleteCertificateItems}
        defaultProps={{ message: 'archiveConfirmation', buttonText: 'archive' }}
      />
    </Grid>
  )
}

CertificatesDetail.propTypes = {
  addTranscripts: PropTypes.func,
  transcripts: PropTypes.array,
  details: PropTypes.object,
  openDeletePopup: PropTypes.bool,
  toggleDeletePopup: PropTypes.func,
  deleteCertificateItems: PropTypes.func,
}
CertificatesDetail.defaultProps = {
  addTranscripts: () => {},
  transcripts: [],
  details: {},
  openDeletePopup: false,
  toggleDeletePopup: () => {},
  deleteCertificateItems: () => {},
}
export default CertificatesDetail
