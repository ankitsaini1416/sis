/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  // MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { isEmpty, values } from 'lodash'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Archive, Check, Edit2, HelpCircle, Plus, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { CoreSchema } from '../../../../../clientFiles/validations'
import { get, mapStateWithData } from '../../../../helpers/utils'
import ConfirmBox from '../../../common/ConfirmBox'
import useStyles from '../Programs.Style'

const ADDID = '0dc3cb6c-0559-11ec-9a03-0242ac130003'
const initialState = {
  pl_name: '',
  pl_url: '',
  pl_id: ADDID,
}

function LinkLibrary({
  addLinkLibrary,
  details,
  openDeletePopup,
  toggleDeletePopup,
  deleteLinkItems,
}) {
  const classes = useStyles()
  const { t } = useTranslation()

  const [libraries, setLibraries] = useState([
    ...get(details, 'pgm_program_libraries', []).map((item) => ({ ...item, isEdit: false })),

    {
      pl_name: '',
      pl_url: '',
      isEdit: true,
      pl_id: ADDID,
    },
  ])

  React.useEffect(() => {
    setLibraries([
      ...get(details, 'pgm_program_libraries', []).map((item) => ({ ...item, isEdit: false })),

      {
        pl_name: '',
        pl_url: '',
        isEdit: true,
      },
    ])
  }, [get(details, 'pgm_program_libraries', [])])

  const onSubmit = function (values, { setErrors }) {
    if (values.pl_id !== ADDID) {
      addLinkLibrary({ update: [values] }, { setErrors })
    } else {
      delete values.pl_id
      addLinkLibrary({ add: [values] }, { setErrors })
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={11} lg={8} xl={7}>
        <Typography component="" align="left" variant="body2" gutterBottom tabIndex={0}>
          <Box component="span" fontWeight="600" fontSize="16px">
            {t('library')}
          </Box>
        </Typography>

        {libraries.map((data) => {
          return (
            <Formik
              key={data.id}
              onSubmit={onSubmit}
              initialValues={mapStateWithData(data, initialState)}
              enableReinitialize={true}
              validationSchema={CoreSchema.LinkLibrary}
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
                          <Typography component="h6" align="left" variant="h6" color="textPrimary">
                            <Box component="span" fontWeight="600" fontSize="14px">
                              {t('libraryName')}
                            </Box>
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
                                {data.pl_name}
                              </Box>
                            ) : (
                              <Field
                                className="custom-input-field"
                                as={TextField}
                                variant="outlined"
                                fullWidth
                                size="small"
                                name={`pl_name`}
                                id={`pl_name`}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip title={t('fields:libraryNameHelp')} placement="top">
                                        <HelpCircle className="help-icon" />
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                }}
                                label={
                                  <span style={visuallyHidden}>
                                    ({t('libraryName')}) ({t('fields:required')}) (
                                    {t('fields:libraryNameHelp')})
                                  </span>
                                }
                              />
                            )}
                            <ErrorMessage name="pl_name">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:libraryName') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box mb={{ xs: 2, lg: 0 }}>
                          <Typography component="h6" align="left" variant="h6" color="textPrimary">
                            <Box component="span" fontWeight="600" fontSize="14px">
                              {t('libraryLink')}
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
                                className="break-word"
                                component="span"
                                fontWeight="fontWeightRegular"
                                fontSize="16px"
                                tabIndex={0}
                              >
                                {data.pl_url}
                              </Box>
                            ) : (
                              <Field
                                className="custom-input-field"
                                as={TextField}
                                variant="outlined"
                                fullWidth
                                size="small"
                                name="pl_url"
                                id="pl_url"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip title={t('fields:libraryLinkHelp')} placement="top">
                                        <HelpCircle className="help-icon" />
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                }}
                                label={
                                  <span style={visuallyHidden}>
                                    ({t('libraryLink')}) ({t('fields:required')}) (
                                    {t('fields:libraryLinkHelp')})
                                  </span>
                                }
                              />
                            )}
                            <ErrorMessage name="pl_url">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:libraryLink') })}
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
                              setLibraries((oldState) => {
                                return oldState.map((item) => {
                                  if (data.pl_id === item.pl_id) {
                                    return {
                                      ...item,
                                      isEdit: true,
                                    }
                                  }
                                  return {
                                    ...item,
                                    isEdit: !item.pl_id,
                                  }
                                })
                              })
                            }}
                            data-id={data.pl_id}
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
                              data-id={data.pl_id}
                              className="icon-button-secondary"
                              disableElevation
                              disabled={!data.pl_id}
                              color="secondary"
                              onClick={(e) => {
                                toggleDeletePopup(e)
                              }}
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
                            data-id={data.pl_id}
                            disableElevation
                            disabled={!values.pl_name || !values.pl_url}
                            color="primary"
                            className="icon-button-primary"
                            onClick={handleSubmit}
                          >
                            <Check width={16} height={16} />
                          </IconButton>
                        </Tooltip>
                        <Box ml={{ xs: 1, sm: 0 }} mt={{ xs: 0, sm: 1 }}>
                          <Tooltip title={t('remove')}>
                            <IconButton
                              aria-label={t('remove')}
                              data-id={data.pl_id}
                              className="icon-button-secondary"
                              disableElevation
                              disabled={!data.pl_id}
                              color="secondary"
                              onClick={() => {
                                resetForm()
                                setLibraries(
                                  libraries.map((item) => {
                                    if (item.id === ADDID) {
                                      return {
                                        ...item,
                                        isEdit: true,
                                      }
                                    }
                                    return {
                                      ...item,
                                      isEdit: !item.pl_id,
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
        onConfirm={deleteLinkItems}
        defaultProps={{ message: 'archiveConfirmation', buttonText: 'archive' }}
      />
    </Grid>
  )
}
LinkLibrary.propTypes = {
  addLinkLibrary: PropTypes.func,
  details: PropTypes.object,
  openDeletePopup: PropTypes.bool,
  toggleDeletePopup: PropTypes.func,
  deleteLinkItems: PropTypes.func,
}

LinkLibrary.defaultProps = {
  addLinkLibrary: () => {},
  details: {},
  openDeletePopup: false,
  toggleDeletePopup: () => {},
  deleteLinkItems: () => {},
}
export default LinkLibrary
