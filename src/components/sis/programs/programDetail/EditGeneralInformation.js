import DateFnsUtils from '@date-io/date-fns'
import {
  Box,
  Button,
  Checkbox,
  // FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  // Select,
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
import React, { useRef } from 'react'
import { Calendar, Check, Edit2, HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { CoreSchema } from '../../../../../clientFiles/validations'
import UploadImg from '../../../../assets/images/upload.png'
import { get, isNullOrEmpty, mapStateWithData } from '../../../../helpers/utils'
// import FormikAutocomplete from '../../../common/formikComponents'
import useStyles from '../Programs.Style'

const CheckboxWithGreenCheck = withStyles({})(Checkbox)

function EditGeneralInformation({
  toggleEditProgram,
  details,
  editProgram,
  getProgramsCategory,
  editLogo,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const [logo, setLogo] = React.useState(null)
  const schoolId = useRef('')
  const initialState = {
    pgm_school_id: '',
    pgm_name: '',
    pgm_description: '',
    pgm_minimum_age: '',
    pgm_transcript_grade: '',
    pgm_is_active: false,
    pgm_expiration: 0,
    pgm_prerequisites: '',
    pgm_start_date: '',
    pgm_end_date: '',
    pgm_canvas_access: false,
    pgm_ttb_access: false,
    pgm_require_transcript: false,
    pgm_show_results: false,
    pgm_file_access: false,
    pgm_is_template_program: false,
    pgm_program_category_id: '',
  }

  const onSubmit = function (values, { setErrors }) {
    editProgram(details.pgm_id, values, { setErrors })
  }
  React.useEffect(() => {
    if (details.pgm_logo) {
      setLogo(details.pgm_logo)
    }
  }, [details])

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={mapStateWithData(details, initialState)}
      validationSchema={CoreSchema.editProgramGeneralInformation}
      enableReinitialize={true}
    >
      {({ values, setFieldValue, dirty }) => {
        if (values.pgm_school_id && values.pgm_school_id !== schoolId.current) {
          getProgramsCategory(values.pgm_school_id)
          schoolId.current = values.pgm_school_id
        }
        return (
          <Form className={classes.form} noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={4} xl={2}>
                <Box
                  mx="auto"
                  width={{ xs: '250px', sm: '300px', md: '100%' }}
                  borderRadius={8}
                  className="image-container"
                >
                  <img
                    src={
                      logo
                        ? typeof logo === 'string'
                          ? logo
                          : URL.createObjectURL(logo)
                        : UploadImg
                    }
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = UploadImg
                    }}
                    alt="Program Logo"
                    tabIndex={0}
                  />
                </Box>
                <ErrorMessage name="pgm_logo">
                  {(msg) => (
                    <span tabIndex={0} className="error">
                      {t(msg, { field: t('file') })}
                    </span>
                  )}
                </ErrorMessage>
                <Box
                  mt={1}
                  component="div"
                  fontWeight="600"
                  fonSize="14px"
                  align="center"
                  width="100%"
                  color="primary"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box mr={1}>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {get(values, 'dst_logo.name', '')}
                    </Typography>
                  </Box>
                  <IconButton
                    aria-label={t('editProgramLogo')}
                    color="primary"
                    className="upload-link-button"
                  >
                    <input
                      onChange={(e) => {
                        let reader = new FileReader()
                        let file = e.currentTarget.files[0]
                        if (!file || !reader.readAsDataURL) {
                          return
                        }
                        reader.onloadend = () => {
                          setLogo(file)
                          editLogo(file)
                        }
                        reader.readAsDataURL(file)
                      }}
                      accept="image/jpeg,image/png,image/"
                      id="contained-button-file"
                      type="file"
                      title=""
                    />
                    <label htmlFor="contained-button-file">
                      <Edit2 width="16px" height="16px" />
                    </label>
                  </IconButton>
                  {!isNullOrEmpty(logo) ? (
                    <Tooltip
                      title={t('deleteProgramLogo')}
                      aria-label={t('deleteProgramLogo')}
                      tabIndex={0}
                    >
                      <IconButton
                        onClick={() => {
                          setLogo(null)
                          editLogo('')
                        }}
                        color="secondary"
                      >
                        <X width="16px" height="16px" />
                      </IconButton>
                    </Tooltip>
                  ) : null}
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
                          />
                        }
                        label={t('fields:canvasAccess')}
                      />
                    </Box>
                    <Tooltip
                      title={t('fields:canvasAccessHelp')}
                      placement="top"
                      aria-label={t('fields:canvasAccessHelp')}
                      tabIndex={0}
                    >
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
                          />
                        }
                        label={t('fields:ttbAccess')}
                      />
                    </Box>
                    <Tooltip
                      title={t('fields:ttbAccessHelp')}
                      placement="top"
                      aria-label={t('fields:ttbAccessHelp')}
                      tabIndex={0}
                    >
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
                          />
                        }
                        label={t('fields:requireTranscript')}
                      />
                    </Box>
                    <Tooltip
                      title={t('fields:requireTranscriptHelp')}
                      placement="top"
                      aria-label={t('fields:requireTranscriptHelp')}
                      tabIndex={0}
                    >
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
                          />
                        }
                        label={t('fields:showResult')}
                      />
                    </Box>
                    <Tooltip
                      title={t('fields:showResultHelp')}
                      placement="top"
                      aria-label={t('fields:showResultHelp')}
                      tabIndex={0}
                    >
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
                          />
                        }
                        label={t('fields:fileAccess')}
                      />
                    </Box>
                    <Tooltip
                      title={t('fields:fileAccessHelp')}
                      placement="top"
                      tabIndex={0}
                      aria-label={t('fields:fileAccessHelp')}
                    >
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
                          />
                        }
                        label={t('fields:addToTemplate')}
                      />
                    </Box>
                    <Tooltip
                      title={t('fields:addToLibraryHelp')}
                      placement="top"
                      aria-label={t('fields:addToLibraryHelp')}
                      tabIndex={0}
                    >
                      <HelpCircle width={20} height={20} className="help-icon" />
                    </Tooltip>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={8} lg={8} xl={8}>
                <Box width="100%" pl={{ xs: 0, lg: 2, xl: 3 }}>
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
                        className="custom-input-field"
                        name="sch_district"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="sch_district"
                        value={details?.pgm_school?.sch_district?.dst_name}
                        autoComplete="districtId"
                        InputProps={{
                          readOnly: true,
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:district')}) ({t('fields:required')}) (
                            {t('fields:selectDistrictHelp')})
                          </span>
                        }
                      />
                      <ErrorMessage name="sch_dst_id">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:district') })}
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
                              checkedIcon={<Check aria-label={t('status')} />}
                              color="Primary"
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
                      <Field
                        className="custom-input-field"
                        name="pgm_school"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="pgm_school"
                        value={details.pgm_school?.sch_name}
                        autoComplete="pgm_school"
                        InputProps={{
                          readOnly: true,
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:selectSchool')}) ({t('fields:required')}) (
                            {t('fields:selectSchoolHelp')})
                          </span>
                        }
                      />
                      <ErrorMessage name="pgm_schhol">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:programName') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:copyProgramLibrary')}
                        </Box>
                        <Box component="span" className="optional">
                          ({t('fields:optional')})
                        </Box>
                      </Typography>
                      <Field
                        className={classes.selectIcon + ' custom-input-field'}
                        name="program-library"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="program-library"
                        select
                        pr={0}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:copyProgramLibraryHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                      >
                        <MenuItem key={0} value={0}>
                          Option 1
                        </MenuItem>
                        <MenuItem key={1} value={1}>
                          Option 2
                        </MenuItem>
                      </Field>
                    </Grid> */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:programName')}
                        </Box>
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
                        autoComplete="pgm_name"
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
                        value={details.pgm_program_category?.pct_name}
                        disabled
                        readOnly={true}
                        id="pgm_program_category_id"
                        pr={0}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:programCategory')}) ({t('fields:required')}) (
                            {t('fields:programCategoryHelp')})
                          </span>
                        }
                        // InputProps={{
                        //   readOnly: true,
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <Tooltip title={t('fields:programCategoryHelp')} placement="top">
                        //         <HelpCircle className="help-icon" />
                        //       </Tooltip>
                        //     </InputAdornment>
                        //   ),
                        // }}
                      />
                      <ErrorMessage name="programCategory">
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
                        autoComplete="pgm_transcript_grade"
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
                        size="small"
                        type="number"
                        id="pgm_minimum_age"
                        autoComplete="pgm_minimum_age"
                        // select
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
                              format="dd/MM/yyyy"
                              // minDate={moment().add(1, 'days')}
                              minDateMessage={t('fields:pgmStartDateMessage')}
                              id="pgm_start_date"
                              name="pgm_start_date"
                              value={values.pgm_start_date || null}
                              onChange={(value) => setFieldValue('pgm_start_date', value)}
                              InputProps={{
                                readOnly: true,
                              }}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:programStartDate')}) ({t('fields:required')}) (
                                  {t('fields:enrollment')})
                                </span>
                              }
                            />
                            <ErrorMessage name="pgm_start_date">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:programStartDateHelp') })}
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
                              id="pgm_end_date"
                              name="pgm_end_date"
                              value={values.pgm_end_date || null}
                              minDate={
                                values.pgm_start_date ? new Date(values.pgm_start_date) : null
                              }
                              minDateMessage={t('fields:pgmEndDateMessage')}
                              onChange={(value) => setFieldValue('pgm_end_date', value)}
                              InputProps={{
                                readOnly: true,
                              }}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:programEndDate')}) ({t('fields:required')}) (
                                  {t('fields:enrollment')})
                                </span>
                              }
                            />
                            <ErrorMessage name="pgm_end_date">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:programEndDate') })}
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
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        autoComplete="pgm_expiration"
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
                        autoComplete="pgm_description"
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
                        autoComplete="pgm_prerequisites"
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
                            {t(msg, { field: t('fields:prerequisites') })}
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
                        onClick={toggleEditProgram}
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
                      type="submit"
                      color="primary"
                      disabled={!dirty}
                    >
                      {t('save')}
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
EditGeneralInformation.propTypes = {
  toggleEditProgram: PropTypes.func,
  details: PropTypes.object,
  editProgram: PropTypes.func,
  getProgramsCategory: PropTypes.func,
  editLogo: PropTypes.func,
}
EditGeneralInformation.defaultProps = {
  toggleEditProgram: () => {},
  details: {},
  editProgram: () => {},
  getProgramsCategory: () => {},
  editLogo: () => {},
}

export default EditGeneralInformation
