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
import React, { useRef } from 'react'
import { HelpCircle, Paperclip, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'

import { CoreSchema } from '../../../../../clientFiles/validations'
import { get, isEmpty } from '../../../../helpers/utils'
import useStyles from '../Enrollment.Style'

const mapStateWithData = function (initialState, data) {
  const state = {
    sn_note: data.sn_note || initialState.sn_note,
    sn_note_type: data.sn_note_type || initialState.sn_note_type,
    sn_description: data.sn_description || initialState.sn_description,
    sn_enrollment_id: data.sn_enrollment_id || initialState.sn_enrollment_id,
    snf_file: data.sn_student_note_file || initialState.snf_file,
  }
  return state
}

const initialState = {
  sn_note: '',
  sn_note_type: '',
  sn_description: '',
  snf_file: [],
}

function AddEditNote({ onClose, actionType, details, addEditStudentNote, masterData }) {
  const { t } = useTranslation()
  const classes = useStyles()
  const removedItems = React.useRef([])

  const editorRef = useRef(null)
  const editorReference = useRef(null)
  const [renderer, setRenderer] = React.useState(Math.random())

  const download = (item) => {
    const element = document.createElement('a')
    element.setAttribute('href', item.name)
    element.setAttribute('download', item.name)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const onSubmit = function (values, { setErrors }) {
    CoreSchema.addEnrollmentNote
      .validate(
        { ...values, sn_description: editorReference.current.getData() },
        { abortEarly: false }
      )
      .then(() => {
        addEditStudentNote(
          details.sn_id,
          {
            ...values,
            sn_description: editorReference.current.getData(),
            removedItems: removedItems.current,
          },
          {
            setErrors,
            callback: () => {
              onClose()
            },
          }
        )
      })
      .catch((err) => {
        const errors = Array.from(err.inner || []).reduce((val, curr) => {
          val[curr.path] = curr.message
          return val
        }, {})
        setErrors(errors)
      })
  }

  React.useEffect(() => {
    if (
      (actionType === 'add' && editorRef.current !== null && editorReference.current === null) ||
      (actionType === 'edit' &&
        editorRef.current !== null &&
        !isEmpty(details) &&
        editorReference.current === null)
    ) {
      window.ClassicEditor.create(editorRef.current, {
        // licenseKey: '3NItAV1binWQCPcWEMkMLCsaDR1aTizIWuQv3HObPAnUR3Tj1NhXc1Pz2A==',
        sidebar: {
          container: document.querySelector('#sidebar'),
        },
        toolbar: [
          'heading',
          'fontSize',
          'fontFamily',
          'bold',
          'italic',
          'underline',
          'bulletedList',
          'numberedList',
          'fontColor',
          'fontBackgroundColor',
        ],
      }).then((editor) => {
        editor.model.document.on('change:data', () => {
          setRenderer(Math.random())
        })
        if (actionType === 'edit') {
          editor.setData(details.sn_description)
        }
        editorReference.current = editor
      })
    }
  }, [details])

  return (
    <Box px={3} pt={2} pb={5} width="100%">
      <Grid container>
        <Grid item xs={12} lg={10} xl={8}>
          <Formik
            onSubmit={onSubmit}
            initialValues={
              actionType === 'add' ? initialState : mapStateWithData(initialState, details)
            }
            enableReinitialize={true}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form className={classes.form} noValidate autoComplete="off">
                  <Box mb={2}>
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item xs={12} sm="auto">
                        <Typography
                          component="h5"
                          variant="subtitle1"
                          color="textPrimary"
                          tabIndex={0}
                        >
                          <Box component="span" fontWeight="600">
                            {actionType === 'add' ? t('addNote') : t('editNote')}
                          </Box>
                        </Typography>
                      </Grid>
                      <Grid item xs="auto">
                        <Box
                          mt={{ xs: 1, sm: 0 }}
                          display="flex"
                          alignItems="center"
                          justifyContent={{
                            xs: 'flex-start',
                            sm: 'flex-end',
                            md: 'space-between',
                          }}
                        >
                          <Button
                            className="custom-default-button text-transform-none"
                            size="large"
                            variant="contained"
                            disableElevation
                            onClick={onClose}
                          >
                            {t('cancel')}
                          </Button>
                          <Box ml={2}>
                            <Button
                              className="text-transform-none"
                              size="large"
                              variant="contained"
                              disableElevation
                              color="primary"
                              type="submit"
                            >
                              {t('save')}
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  <Grid container spacing={3} direction="column">
                    <Grid item xs={12} md={8} lg={6}>
                      <Typography
                        component="p"
                        variant="body2"
                        color="textPrimary"
                        gutterBottom
                        aria-label="Notes title"
                      >
                        <Box component="span" fontWeight="600">
                          {t('fields:notesTitle')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:notesTitle')}) ({t('fields:required')}) (
                            {t('fields:notesTitleHelp')})
                          </span>
                        }
                        className="custom-input-field"
                        name="sn_note"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="sn_note"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:notesTitleHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <ErrorMessage name="sn_note">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:notesTitle') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:notesType')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:notesType')}) ({t('fields:required')}) (
                            {t('fields:notesTypeHelp')})
                          </span>
                        }
                        className={classes.selectIcon + ' custom-input-field'}
                        name="sn_note_type"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="sn_note_type"
                        select
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:notesTypeHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                      >
                        {masterData.student_notes_type?.map((type) => (
                          <MenuItem key={type} value={type}>
                            {t(`reference:${type}`)}
                          </MenuItem>
                        ))}
                      </Field>
                      <ErrorMessage name="sn_note_type">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:notesType') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        tabIndex={0}
                        component="p"
                        variant="body2"
                        color="textPrimary"
                        gutterBottom
                      >
                        <Box component="span" fontWeight="600">
                          {t('fields:notesDescription')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                        <Box component="span" className="optional">
                          ({t('fields:notesDescriptionHelp')})
                        </Box>
                      </Typography>
                      <Box className="custom-editor">
                        <div ref={editorRef} id="ck-editor" />
                      </Box>
                      <ErrorMessage name="sn_description">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:notesDescription') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:notesAttachments')}
                        </Box>
                        <Box component="span" className="optional">
                          ({t('fields:optional')})
                        </Box>
                      </Typography>
                      <Box className="upload-drag-drop">
                        <input
                          onChange={(e) => {
                            const { files } = e.currentTarget
                            let newFiles = []
                            let counter = 0
                            function setupReader(file) {
                              let reader = new FileReader()
                              if (!file || !reader.readAsDataURL) {
                                return
                              }
                              reader.onloadend = function () {
                                counter += 1
                                file.tempId = uuid()
                                newFiles.push(file)
                                if (files.length === counter) {
                                  setFieldValue('snf_file', [...values.snf_file, ...newFiles])
                                }
                              }
                              reader.readAsText(file, 'UTF-8')
                            }
                            for (let i = 0; i < files.length; i++) {
                              setupReader(files[i])
                            }
                          }}
                          id="snf_file"
                          name="snf_file"
                          type="file"
                          // accept="image/jpeg,image/jpg,image/png,image/svg"
                          multiple
                        />
                        <label tabIndex={0} htmlFor="contained-button-file">
                          <Box
                            display="flex"
                            width="100%"
                            minHeight="100%"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box width="150px" display="flex" alignItems="center">
                              <Paperclip width={22} height={22} />
                              {t('fields:attachFile')}
                            </Box>
                            <span style={visuallyHidden}>({t('fields:optional')})</span>
                            <Tooltip title={t('fields:notesAttachmentsHelp')} placement="top">
                              <HelpCircle width={24} height={24} className="help-icon" />
                            </Tooltip>
                          </Box>
                        </label>
                      </Box>
                      <ErrorMessage name="snf_file">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {get(
                              values.snf_file.find((item) => item.isValid === false),
                              'name',
                              ''
                            )}
                            :
                            {t(msg, {
                              field: t('fields:notesAttachments'),
                            })}
                          </span>
                        )}
                      </ErrorMessage>
                      <Box display="flex" flexWrap="wrap">
                        {!isEmpty(values.snf_file) &&
                          values.snf_file.map((item) => (
                            <Box
                              mt={2}
                              display="flex"
                              alignItems="flex-start"
                              key={item.snf_id || item.tempId}
                            >
                              <Box
                                className="upload-chip"
                                display="flex"
                                alignItems="center"
                                flexDirection="row"
                                justifyContent="flex-start"
                              >
                                <Typography
                                  variant="body2"
                                  component="span"
                                  onClick={() => download(item)}
                                  tabIndex={0}
                                >
                                  {item.name || item.snf_file_name}
                                </Typography>
                                <IconButton
                                  aria-label={t('remove')}
                                  edge="end"
                                  size="small"
                                  color="primary"
                                >
                                  <X
                                    width="16px"
                                    height="16px"
                                    onClick={() => {
                                      if (item.snf_id) {
                                        setFieldValue(
                                          'snf_file',
                                          values.snf_file.filter(
                                            (file) => file.snf_id !== item.snf_id
                                          )
                                        )
                                        removedItems.current.push(item.snf_id)
                                      } else {
                                        setFieldValue(
                                          'snf_file',
                                          values.snf_file.filter(
                                            (file) => file.tempId !== item.tempId
                                          )
                                        )
                                      }
                                    }}
                                  />
                                </IconButton>
                              </Box>
                            </Box>
                          ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              )
            }}
          </Formik>
          <div style={{ visibility: 'hidden', display: 'none' }}>{renderer}</div>
        </Grid>
      </Grid>
    </Box>
  )
}

AddEditNote.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  addEditStudentNote: PropTypes.func,
  actionType: PropTypes.func,
  details: PropTypes.object,
  masterData: PropTypes.object,
}

AddEditNote.defaultProps = {
  open: false,
  onClose: () => {},
  addEditStudentNote: () => {},
  actionType: () => {},
  details: {},
  masterData: {},
}

export default AddEditNote
