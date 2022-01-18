import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import FormikErrorFocus from 'formik-error-focus'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { Check, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { CoreSchema } from '../../../../clientFiles/validations'
import { ROUTES } from '../../../helpers/constants'
import EditorMediaAdapter from '../../../helpers/editorMediaAdapter'
import Breadcrumb from '../../breadcrumbs/Breadcrumbs'
import EditTransriptSkeleton from './EditTranScriptSkeleton'
import useStyles from './TranScript.Style'

const CheckboxWithGreenCheck = withStyles({})(Checkbox)

function EditTranScript({ transcript, editTranscript, formState, masterData, app }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()
  const editorRef = useRef(null)
  const editorReference = useRef(null)

  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbTranScript'),
      href: ROUTES.TRANSCRIPT,
    },
    {
      title: t('breadcrumbEditTranScript'),
      href: '',
    },
  ]

  const onSubmit = function (values, { setErrors }) {
    editTranscript(
      transcript.tt_id,
      { ...values, tt_content: editorReference.current.getData() },
      { setErrors }
    )
  }
  React.useEffect(() => {
    if (editorRef.current !== null && !isEmpty(transcript?.tt_school?.sch_school_public_id)) {
      window.ClassicEditor.create(editorRef.current, {
        licenseKey: '3NItAV1binWQCPcWEMkMLCsaDR1aTizIWuQv3HObPAnUR3Tj1NhXc1Pz2A==',
        sidebar: {
          container: document.querySelector('#sidebar'),
        },
        image: {
          toolbar: [
            'imageStyle:block',
            'imageStyle:inline',
            'imageStyle:side',
            'imageStyle:alignLeft',
            'imageStyle:alignRight',
            'imageStyle:alignBlockLeft',
            'imageStyle:alignBlockRight',
            'imageStyle:alignCenter',
            '|',
            'toggleImageCaption',
            'imageTextAlternative',
          ],
        },
        toolbar: [
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          'highlight',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'code',
          'subscript',
          'superscript',
          'link',
          '|',
          'bulletedList',
          'numberedList',
          'indentList',
          'outdentList',
          'pageBreak',
          'sourceEditing',
          '|',
          'specialCharacters',
          'specialCharactersEssentials',
          'specialCharactersEmoji',
          '|',
          'horizontalLine',
          'outdent',
          'indent',
          '|',
          'uploadImage',
          'imageCaption',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo',
          'texttransform',
          '|',
          'findAndReplace',
          'basicStyles',
        ],
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties',
          ],

          // Configuration of the TableProperties plugin.
          tableProperties: {
            // ...
          },

          // Configuration of the TableCellProperties plugin.
          tableCellProperties: {
            // ...
          },
        },
      }).then((editor) => {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          // Configure the URL to the upload script in your back-end here!
          return new EditorMediaAdapter(
            loader,
            transcript?.tt_school.sch_school_public_id,
            app.baseURL
          )
        }
        editor.setData(transcript?.tt_content)
        editorReference.current = editor
      })
    }
  }, [transcript])
  if (isEmpty(transcript)) {
    return <EditTransriptSkeleton />
  }
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={formState}
      enableReinitialize={true}
      validationSchema={CoreSchema.addTranscript}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className={classes.form} noValidate autoComplete="off">
            <Box py={2}>
              <Breadcrumb data={breadcrumbData} />
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12} sm="auto">
                  <Typography
                    tabIndex={0}
                    component="h4"
                    align="left"
                    variant="h5"
                    color="textPrimary"
                  >
                    <Box component="span" fontWeight="700" fontSize="24px">
                      {t('editTranscript')}
                    </Box>
                    <Box
                      ml={1}
                      component="span"
                      fontWeight="500"
                      fontSize="20px"
                      className="user-name"
                    >
                      ({transcript.tt_template_name})
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm="auto">
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
                      onClick={history.goBack}
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
                        {t('update')}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Paper rounded={true} elevation={1} className="paper-round">
              <Box px={{ xs: 2, lg: 3 }} pt={{ xs: 2, lg: 2 }} pb={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} lg={8} xl={6}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:district')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          disabled
                          id="tt_district_name"
                          name="tt_district_name"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          pr={0}
                          InputProps={{
                            readonly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:transcriptDistrictHelp')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:district')}) ({t('fields:required')}) (
                              {t('fields:transcriptDistrictHelp')})
                            </span>
                          }
                        />
                        <ErrorMessage name="tt_district_name">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:selectDistrict') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:school')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          disabled
                          name="tt_school_name"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="tt_school_name"
                          pr={0}
                          InputProps={{
                            readonly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:transcriptSchoolHelp')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:school')}) ({t('fields:required')}) (
                              {t('fields:transcriptSchoolHelp')})
                            </span>
                          }
                        />
                        <ErrorMessage name="tt_school_name">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:selectSchool') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:transcriptTemplateName')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="tt_template_name"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="tt_template_name"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:transcriptTemplateNameHelp')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:transcriptTemplateName')}) ({t('fields:required')}) (
                              {t('fields:transcriptTemplateNameHelp')})
                            </span>
                          }
                        />
                        <ErrorMessage name="tt_template_name">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, {
                                field: t('fields:transcriptTemplateName'),
                              })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:transcriptLayout')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          name="tt_layout"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="tt_layout"
                          select
                          pr={0}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:transcriptLayoutHelp')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:transcriptLayout')}) ({t('fields:required')}) (
                              {t('fields:transcriptLayoutHelp')})
                            </span>
                          }
                        >
                          {masterData?.transcript_layout.map((type) => (
                            <MenuItem key={type} value={type}>
                              {t(`reference:${type}`)}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="tt_layout">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:transcriptLayout') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} md={12} className="custom-checkbox">
                        <Box mt={1} mb={1}>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
                            <Box component="span" fontWeight="600">
                              {t('fields:status')}
                            </Box>
                            <Box component="span" className="mandatory">
                              {t('fields:mandatory')}
                            </Box>
                          </Typography>
                        </Box>
                        <Box minWidth={{ xs: 'auto', sm: 'auto', md: '150px' }} align="left">
                          <FormControlLabel
                            control={
                              <CheckboxWithGreenCheck
                                checked={values.tt_is_active}
                                onChange={(e) => {
                                  setFieldValue('tt_is_active', e.target.checked)
                                }}
                                checkedIcon={<Check />}
                                color="primary"
                                aria-label={t('status')}
                              />
                            }
                            label={t('fields:active')}
                          />
                        </Box>
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
                            {t('fields:transcriptDescription')}
                          </Box>
                          <Box component="span" className="optional">
                            ({t('fields:optional')})
                          </Box>
                        </Typography>
                        <Box className="custom-editor">
                          <div ref={editorRef} id="ck-editor" />
                        </Box>
                        <ErrorMessage name="tt_content">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:transcriptDescription') })}
                            </span>
                          )}
                        </ErrorMessage>
                        {/*<FormHelperText component="p" variant="body2">
                          {t('fields:transcriptDescriptionHelp')}
                        </FormHelperText>*/}
                      </Grid>
                    </Grid>
                    <Box mt={2} textAlign="right">
                      <Button
                        className="custom-default-button text-transform-none"
                        disableElevation
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          editorReference.current.execute('exportPdf')
                        }}
                      >
                        {t('preview')}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
            <FormikErrorFocus
              offset={0}
              align={'top'}
              focusDelay={5}
              ease={'linear'}
              duration={5}
            />
          </Form>
        )
      }}
    </Formik>
  )
}

EditTranScript.propTypes = {
  editTranscript: PropTypes.func,
  transcript: PropTypes.object,
  formState: PropTypes.object,
  masterData: PropTypes.object,
  app: PropTypes.object,
}

EditTranScript.defaultProps = {
  editTranscript: () => {},
  transcript: {},
  formState: {},
  masterData: {},
  app: {},
}

export default EditTranScript
