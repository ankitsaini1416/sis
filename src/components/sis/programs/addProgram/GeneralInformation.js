import DateFnsUtils from '@date-io/date-fns'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
// import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { ArrowRight, Calendar, Check, Edit2, HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { CoreSchema } from '../../../../../clientFiles/validations'
import UploadImg from '../../../../assets/images/upload-logo.png'
import { get, isEmpty, mapStateWithData } from '../../../../helpers/utils'
import FormikAutocomplete from '../../../common/formikComponents/FormikAutoComplete'
import useStyles from '../Programs.Style'

const CheckboxWithGreenCheck = withStyles({})(Checkbox)
function GeneralInformation({
  districts,
  schools,
  fetchSchool,
  addProgram,
  getProgramsCategory,
  programsCategory,
  programsTemplate,
  getProgramTemplate,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()
  const districtCode = useRef('')
  const schoolId = useRef('')
  const [initialState, setInitialState] = useState({
    pgm_logo: '',
    pgm_canvas_access: true,
    pgm_ttb_access: false,
    pgm_require_transcript: false,
    pgm_show_results: true,
    pgm_file_access: false,
    pgm_is_template_program: false,
    districtId: '',
    pgm_is_active: false,
    pgm_school_id: '',
    pgm_name: '',
    pgm_program_category_id: '',
    pgm_transcript_grade: '',
    pgm_minimum_age: '',
    pgm_start_date: '',
    pgm_end_date: '',
    pgm_expiration: '',
    pgm_description: '',
    pgm_prerequisites: '',
  })
  const [template, setTemplate] = useState('')
  const onSubmit = function (values, { setErrors }) {
    addProgram(values, { setErrors })
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialState}
      enableReinitialize={true}
      validationSchema={CoreSchema.addProgramGeneralInformation}
    >
      {({ values, setFieldValue }) => {
        if (values.districtId !== districtCode.current) {
          fetchSchool(values.districtId)
          districtCode.current = values.districtId
        } else if (values.pgm_school_id && values.pgm_school_id !== schoolId.current) {
          getProgramsCategory(values.pgm_school_id)
          getProgramTemplate(values.pgm_school_id)
          schoolId.current = values.pgm_school_id
        }
        return (
          <Form className={classes.form} noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={4} xl={2}>
                <Box
                  mx="auto"
                  width={{ xs: '200px', sm: '300px', md: '100%' }}
                  borderRadius={8}
                  className="image-container"
                >
                  <img
                    tabIndex={0}
                    src={
                      values.pgm_logo
                        ? typeof values.pgm_logo === 'string'
                          ? values.pgm_logo
                          : URL.createObjectURL(values.pgm_logo)
                        : UploadImg
                    }
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = UploadImg
                    }}
                    alt="Program logo"
                  />
                </Box>
                <ErrorMessage name="pgm_logo">
                  {(msg) => (
                    <Box tabIndex={0} mt={1} textAlign="center" component="span" className="error">
                      {t(msg, { field: t('file') })}
                    </Box>
                  )}
                </ErrorMessage>
                <Box
                  mt={1}
                  display={!values.pgm_logo ? 'flex' : 'none'}
                  component="div"
                  fontWeight="600"
                  fonSize="14px"
                  align="center"
                  width="100%"
                  color="primary"
                  justifyContent="center"
                  className="upload-link-text"
                >
                  <input
                    accept="image/jpeg,image/png,image/"
                    id="contained-button-file"
                    type="file"
                    title=""
                    onChange={(e) => {
                      let reader = new FileReader()
                      let file = e.currentTarget.files[0]
                      if (!file || !reader.readAsDataURL) {
                        return
                      }
                      reader.onloadend = () => {
                        setFieldValue('pgm_logo', file)
                      }
                      reader.readAsDataURL(file)
                    }}
                  />
                  <label htmlFor="contained-button-file">{t('uploadProgramImage')}</label>
                </Box>
                <Box
                  display={values.pgm_logo ? 'flex' : 'none'}
                  mt={1}
                  component="div"
                  fontWeight="600"
                  fonSize="14px"
                  align="center"
                  width="100%"
                  color="primary"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box mr={1}>
                    <Typography component="span" variant="body2" color="textPrimary" tabIndex={0}>
                      {get(values, 'pgm_logo.name', '')}
                    </Typography>
                  </Box>
                  <Tooltip title={t('editProgramLogo')}>
                    <IconButton
                      aria-label={t('editProgramLogo')}
                      color="primary"
                      className="upload-link-button"
                    >
                      <input
                        accept="image/jpeg,image/png,image/"
                        id="contained-button-file"
                        type="file"
                        onChange={(e) => {
                          let reader = new FileReader()
                          let file = e.currentTarget.files[0]
                          if (!file || !reader.readAsDataURL) {
                            return
                          }
                          reader.onloadend = () => {
                            setFieldValue('pgm_logo', file)
                          }
                          reader.readAsDataURL(file)
                        }}
                        title=""
                      />
                      <label htmlFor="contained-button-file">
                        <Edit2 width="16px" height="16px" />
                      </label>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('deleteProgramLogo')}>
                    <IconButton
                      aria-label={t('deleteProgramLogo')}
                      color="secondary"
                      onClick={() => setFieldValue('pgm_logo', '')}
                    >
                      <X width="16px" height="16px" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box
                  width="100%"
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  flexDirection="column"
                  mt={3}
                >
                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                    tabIndex={0}
                  >
                    <Box className="custom-checkbox">
                      <FormControlLabel
                        control={
                          <CheckboxWithGreenCheck
                            checked={values.pgm_canvas_access}
                            onChange={(e) => {
                              setFieldValue('pgm_canvas_access', e.target.checked)
                            }}
                            checkedIcon={<Check />}
                            color="primary"
                            name="pgm_canvas_access"
                            id="pgm_canvas_access"
                          />
                        }
                        label={t('fields:canvasAccess')}
                      />
                    </Box>
                    <Tooltip title={t('fields:canvasAccessHelp')} placement="top">
                      <HelpCircle width={20} height={20} className="help-icon" />
                    </Tooltip>
                  </Box>

                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                    tabIndex={0}
                  >
                    <Box className="custom-checkbox">
                      <FormControlLabel
                        control={
                          <CheckboxWithGreenCheck
                            checked={values.pgm_ttb_access}
                            onChange={(e) => {
                              setFieldValue('pgm_ttb_access', e.target.checked)
                            }}
                            checkedIcon={<Check />}
                            color="primary"
                            name="pgm_ttb_access"
                            id="pgm_ttb_access"
                          />
                        }
                        label={t('fields:ttbAccess')}
                      />
                    </Box>
                    <Tooltip title={t('fields:ttbAccessHelp')} placement="top">
                      <HelpCircle width={20} height={20} className="help-icon" />
                    </Tooltip>
                  </Box>

                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                    tabIndex={0}
                  >
                    <Box className="custom-checkbox">
                      <FormControlLabel
                        control={
                          <CheckboxWithGreenCheck
                            checked={values.pgm_require_transcript}
                            onChange={(e) => {
                              setFieldValue('pgm_require_transcript', e.target.checked)
                            }}
                            checkedIcon={<Check />}
                            color="primary"
                            name="pgm_require_transcript"
                            id="pgm_require_transcript"
                          />
                        }
                        label={t('fields:requireTranscript')}
                      />
                    </Box>
                    <Tooltip title={t('fields:requireTranscriptHelp')} placement="top">
                      <HelpCircle width={20} height={20} className="help-icon" />
                    </Tooltip>
                  </Box>

                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                    tabIndex={0}
                  >
                    <Box className="custom-checkbox">
                      <FormControlLabel
                        control={
                          <CheckboxWithGreenCheck
                            checked={values.pgm_show_results}
                            onChange={(e) => {
                              setFieldValue('pgm_show_results', e.target.checked)
                            }}
                            checkedIcon={<Check />}
                            color="primary"
                            name="pgm_show_results"
                            id="pgm_show_results"
                          />
                        }
                        label={t('fields:showResult')}
                      />
                    </Box>
                    <Tooltip title={t('fields:showResultHelp')} placement="top">
                      <HelpCircle width={20} height={20} className="help-icon" />
                    </Tooltip>
                  </Box>

                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                    tabIndex={0}
                  >
                    <Box className="custom-checkbox">
                      <FormControlLabel
                        control={
                          <CheckboxWithGreenCheck
                            checked={values.pgm_file_access}
                            onChange={(e) => {
                              setFieldValue('pgm_file_access', e.target.checked)
                            }}
                            checkedIcon={<Check />}
                            color="primary"
                            name="pgm_file_access"
                            id="pgm_file_access"
                          />
                        }
                        label={t('fields:fileAccess')}
                      />
                    </Box>
                    <Tooltip title={t('fields:fileAccessHelp')} placement="top">
                      <HelpCircle width={20} height={20} className="help-icon" />
                    </Tooltip>
                  </Box>

                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                    tabIndex={0}
                  >
                    <Box className="custom-checkbox">
                      <FormControlLabel
                        control={
                          <CheckboxWithGreenCheck
                            checked={values.pgm_is_template_program}
                            onChange={(e) => {
                              setFieldValue('pgm_is_template_program', e.target.checked)
                            }}
                            checkedIcon={<Check />}
                            color="primary"
                            name="pgm_is_template_program"
                            id="pgm_is_template_program"
                          />
                        }
                        label={t('fields:addToTemplate')}
                      />
                    </Box>
                    <Tooltip title={t('fields:addToLibraryHelp')} placement="top">
                      <HelpCircle width={20} height={20} className="help-icon" />
                    </Tooltip>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={8} lg={8} xl={8}>
                <Box width="100%" pl={{ xs: 0, lg: 2, xl: 3 }}>
                  <Box mb={2} width="100%">
                    <Typography
                      component=""
                      tabIndex={0}
                      align="left"
                      variant="body2"
                      color="Primary"
                      className="bg-color-surface"
                    >
                      <Box component="span" fontWeight="600" fontSize="16px">
                        {t('generalInformation')}
                      </Box>
                    </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
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
                              <Tooltip title={t('fields:selectDistrictHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:district')}) ({t('fields:required')}) (
                            {t('fields:selectDistrictHelp')})
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} className="custom-checkbox">
                      <Box mb={1}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
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
                              checked={values.pgm_is_active}
                              onChange={(e) => {
                                setFieldValue('pgm_is_active', e.target.checked)
                              }}
                              checkedIcon={<Check aria-label={t('fields:status')} />}
                              color="Primary"
                              name="pgm_is_active"
                              id="pgm_is_active"
                              aria-label={t('fields:status')}
                            />
                          }
                          label={t('fields:active')}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:selectSchool')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>

                      <FormControl size="small" variant="outlined" fullWidth>
                        <InputLabel style={visuallyHidden} id="select-school-label">
                          ({t('fields:selectSchool')}) ({t('fields:required')}) (
                          {t('fields:selectSchoolHelp')})
                        </InputLabel>
                        <Select
                          labelId="select-school-label"
                          className={classes.selectIcon + ' custom-input-field custom-select-field'}
                          fullWidth
                          size="small"
                          value={values.pgm_school_id}
                          name="pgm_school_id"
                          disabled={!values.districtId}
                          id="pgm_school_id"
                          onChange={(e) => {
                            setFieldValue('pgm_school_id', e.target.value)
                          }}
                          limitTags={2}
                          endAdornment={
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:selectSchoolHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          }
                        >
                          {schools.map((school) => (
                            <MenuItem key={school.sch_id} value={school.sch_id}>
                              {school.sch_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <ErrorMessage name="pgm_school_id">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:school') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:copyProgramTemplate')}
                        </Box>
                        <Box component="span" className="optional">
                          ({t('fields:optional')})
                        </Box>
                      </Typography>
                      <TextField
                        className={classes.selectIcon + ' custom-input-field'}
                        variant="outlined"
                        fullWidth
                        value={template}
                        onChange={(event) => {
                          const template = programsTemplate.find(
                            (item) => item.pgm_id === event.target.value
                          )
                          setInitialState(mapStateWithData(template, values))
                          setTemplate(event.target.value)
                        }}
                        size="small"
                        id="pgm_template"
                        select
                        pr={0}
                        disabled={isEmpty(programsTemplate)}
                        defaultValue={t('fields:programCategoryHelp')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:programCategoryHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:copyProgramTemplate')}) ({t('fields:optional')}) (
                            {t('fields:programCategoryHelp')})
                          </span>
                        }
                      >
                        {programsTemplate.map((row) => (
                          <MenuItem key={row.pgm_id} value={row.pgm_id}>
                            {row.pgm_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:programName')}
                        </Box>
                        <Box style={visuallyHidden}>{t('requiredFields')}</Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="pgm_name"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="pgm_name"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:programNameHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:programName')}) ({t('fields:required')}) (
                            {t('fields:programNameHelp')})
                          </span>
                        }
                      />
                      <ErrorMessage name="pgm_name">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:programName') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:programCategory')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className={classes.selectIcon + ' custom-input-field'}
                        name="pgm_program_category_id"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="pgm_program_category_id"
                        select
                        pr={0}
                        defaultValue={t('fields:programCategoryHelp')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:programCategoryHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:programCategory')}) ({t('fields:required')}) (
                            {t('fields:programCategoryHelp')})
                          </span>
                        }
                      >
                        {programsCategory.map((row) => (
                          <MenuItem key={row.pct_id} value={row.pct_id}>
                            {t(`${row.pct_name}`)}
                          </MenuItem>
                        ))}
                      </Field>
                      <ErrorMessage name="pgm_program_category_id">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:programCategory') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:transcriptGrade')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="pgm_transcript_grade"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="pgm_transcript_grade"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:transcriptGradeHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:transcriptGrade')}) ({t('fields:required')}) (
                            {t('fields:transcriptGradeHelp')})
                          </span>
                        }
                      />
                      <ErrorMessage name="pgm_transcript_grade">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:transcriptGrade') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:minimumAge')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className={classes.selectIcon + ' custom-input-field'}
                        name="pgm_minimum_age"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        type="number"
                        size="small"
                        id="pgm_minimum_age"
                        pr={0}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:minimumAgeHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:minimumAge')}) ({t('fields:required')}) (
                            {t('fields:minimumAgeHelp')})
                          </span>
                        }
                      />
                      <ErrorMessage name="pgm_minimum_age">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:minimumAge') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:programStartDate')}
                              </Box>
                              <Box component="span" className="mandatory">
                                {t('fields:mandatory')}
                              </Box>
                              <Box component="span" className="optional">
                                ({t('fields:enrollment')})
                              </Box>
                            </Typography>
                            <KeyboardDatePicker
                              fullWidth
                              className="custom-picker custom-input-field"
                              autoOk
                              variant="inline"
                              inputVariant="outlined"
                              keyboardIcon={<Calendar />}
                              size="small"
                              // minDate={moment().add(1, 'days')}
                              minDateMessage={t('fields:pgmStartDateMessage')}
                              format="dd/MM/yyyy"
                              id="pgm_start_date"
                              name="pgm_start_date"
                              disablePast
                              value={values.pgm_start_date || null}
                              onChange={(value) => setFieldValue('pgm_start_date', value)}
                              KeyboardButtonProps={{
                                'aria-label': 'choose start date',
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:programStartDate')}) ({t('fields:required')}) (
                                  {t('fields:enrollment')})
                                </span>
                              }
                              InputProps={{ readOnly: true }}
                            />
                            <ErrorMessage name="pgm_start_date">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, {
                                    field: t('fields:programStartDateHelp'),
                                  })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:programEndDate')}
                              </Box>
                              <Box component="span" className="mandatory">
                                {t('fields:mandatory')}
                              </Box>
                              <Box component="span" className="optional">
                                ({t('fields:enrollment')})
                              </Box>
                            </Typography>
                            <KeyboardDatePicker
                              fullWidth
                              className="custom-picker custom-input-field"
                              autoOk
                              variant="inline"
                              inputVariant="outlined"
                              keyboardIcon={<Calendar />}
                              size="small"
                              format="dd/MM/yyyy"
                              minDate={
                                values.pgm_start_date ? new Date(values.pgm_start_date) : null
                              }
                              minDateMessage={t('fields:pgmEndDateMessage')}
                              id="pgm_end_date"
                              name="pgm_end_date"
                              disablePast
                              value={values.pgm_end_date || null}
                              onChange={(date) => setFieldValue('pgm_end_date', date)}
                              KeyboardButtonProps={{
                                'aria-label': 'choose end date',
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:programEndDate')}) ({t('fields:required')}) (
                                  {t('fields:enrollment')})
                                </span>
                              }
                              InputProps={{ readOnly: true }}
                            />
                            <ErrorMessage name="pgm_end_date">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, {
                                    field: t('fields:programEndDate'),
                                  })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:expiration')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                        <Box component="span" className="optional">
                          ({t('fields:expirationDays')})
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="pgm_expiration"
                        variant="outlined"
                        as={TextField}
                        type="number"
                        defaultValue="0"
                        fullWidth
                        size="small"
                        id="pgm_expiration"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:expirationHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:expiration')}) ({t('fields:required')}) (
                            {t('fields:expirationHelp')})
                          </span>
                        }
                      />
                      <ErrorMessage name="pgm_expiration">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:expiration') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:programDescription')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        multiline
                        rows={2}
                        rowsMax={3}
                        name="pgm_description"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="pgm_description"
                        defaultValue=""
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:programDescriptionHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:programDescription')}) ({t('fields:required')}) (
                            {t('fields:programDescriptionHelp')})
                          </span>
                        }
                      />
                      <ErrorMessage name="pgm_description">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:description') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:preRequisite')}
                        </Box>
                        <Box component="span" className="optional">
                          ({t('fields:optional')})
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        multiline
                        rows={2}
                        rowsMax={3}
                        name="pgm_prerequisites"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="pgm_prerequisites"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:preRequisiteHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:preRequisite')}) ({t('fields:optional')}) (
                            {t('fields:preRequisiteHelp')})
                          </span>
                        }
                      />
                      <ErrorMessage name="pgm_prerequisites">
                        {(msg) => (
                          <span className="error">
                            {t(msg, { field: t('fields:preRequisite') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                  </Grid>
                  <Box
                    mt={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    flexDirection="row"
                  >
                    <Box mr={1}>
                      <Button
                        onClick={history.goBack}
                        className="custom-default-button text-transform-none"
                        size="large"
                        variant="contained"
                        disableElevation
                      >
                        {t('cancel')}
                      </Button>
                    </Box>
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
                </Box>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

GeneralInformation.propTypes = {
  districts: PropTypes.array,
  fetchSchool: PropTypes.func,
  schools: PropTypes.array,
  addProgram: PropTypes.func,
  getProgramsCategory: PropTypes.func,
  programsCategory: PropTypes.array,
  programsTemplate: PropTypes.array,
  getProgramTemplate: PropTypes.func,
}

GeneralInformation.defaultProps = {
  districts: [],
  fetchSchool: () => {},
  schools: [],
  addProgram: () => {},
  getProgramsCategory: () => {},
  programsCategory: [],
  programsTemplate: [],
  getProgramTemplate: () => {},
}

export default GeneralInformation
