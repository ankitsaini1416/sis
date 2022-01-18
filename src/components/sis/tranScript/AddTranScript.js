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
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { Check, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROUTES } from '../../../helpers/constants'
import Breadcrumb from '../../breadcrumbs/Breadcrumbs'
import FormikAutoComplete from '../../common/formikComponents/FormikAutoComplete'
import EditorMediaAdapter from './../../../helpers/editorMediaAdapter'
import useStyles from './TranScript.Style'

const initialState = {
  tt_district_id: null,
  tt_school_id: null,
  tt_template_name: '',
  tt_content: '',
  tt_layout: 'portrait',
  tt_is_active: false,
}
const CheckboxWithGreenCheck = withStyles({})(Checkbox)

function AddTranScript({ addTranscript, districts, schools, getSchools, masterData, app }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()
  const districtCode = useRef('')
  const schoolPublicId = useRef('')

  const editorRef = useRef(null)
  const editorReference = useRef(null)

  const onSubmit = function (values, { setErrors }) {
    addTranscript({ ...values, tt_content: editorReference.current.getData() }, { setErrors })
  }

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
      title: t('breadcrumbAddTranScript'),
      href: '',
    },
  ]

  React.useEffect(() => {
    if (editorRef.current !== null) {
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
          return new EditorMediaAdapter(loader, schoolPublicId.current, app.baseURL)
        }
        editorReference.current = editor
      })
    }
  }, [])

  return (
    <Formik onSubmit={onSubmit} initialValues={initialState} enableReinitialize={true}>
      {({ values, setFieldValue }) => {
        if (values.tt_district_id && values.tt_district_id !== districtCode.current) {
          getSchools(values.tt_district_id)
          districtCode.current = values.tt_district_id
        }
        if (editorReference.current) {
          if (values.tt_school_id) {
            editorReference.current.isReadOnly = false
          } else {
            editorReference.current.isReadOnly = true
          }
        }
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
                      {t('addNewTranscript')}
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
                        {t('save')}
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
                            {t('fields:selectDistrict')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          id="tt_district_id"
                          name="tt_district_id"
                          options={districts}
                          component={FormikAutoComplete}
                          onChangeFx={() => {
                            setFieldValue('tt_school_id', '')
                          }}
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
                        <ErrorMessage name="tt_district_id">
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
                            {t('fields:selectSchool')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          name="tt_school_id"
                          component={FormikAutoComplete}
                          as={TextField}
                          options={schools}
                          nameKey="sch_name"
                          onChangeFx={(value) => {
                            if (value) {
                              schoolPublicId.current = value.sch_school_public_id
                            }
                          }}
                          disabled={!values.tt_district_id}
                          valueKey="sch_id"
                          optionId="sch_id"
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="tt_school_id"
                          select
                          pr={0}
                          InputProps={{
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
                              ({t('fields:selectSchool')}) ({t('fields:required')}) (
                              {t('fields:transcriptSchoolHelp')})
                            </span>
                          }
                        />
                        <ErrorMessage name="tt_school_id">
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
                          select
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="tt_layout"
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
                          {masterData.transcript_layout.map((type) => (
                            <MenuItem key={type} value={type}>
                              {t(`reference:${type}`)}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="transcriptLayout">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:transcriptLayout') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} md={12} className="custom-checkbox">
                        <Box>
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

AddTranScript.propTypes = {
  addTranscript: PropTypes.func,
  districts: PropTypes.array,
  schools: PropTypes.array,
  getSchools: PropTypes.func,
  masterData: PropTypes.object,
  app: PropTypes.object,
}

AddTranScript.defaultProps = {
  addTranscript: () => {},
  districts: [],
  schools: [],
  getSchools: () => {},
  masterData: {},
  app: {},
}

export default AddTranScript
