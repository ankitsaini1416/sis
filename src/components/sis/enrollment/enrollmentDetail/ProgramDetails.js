import DateFnsUtils from '@date-io/date-fns'
import { Box, Button, Divider, Grid, Hidden, MenuItem, Typography } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import Menu from '@material-ui/core/Menu'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { visuallyHidden } from '@mui/utils'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Calendar, ChevronDown, Lock } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import UploadImg from '../../../../assets/images/upload.png'
import { get } from '../../../../helpers/utils'
import useStyles from '../Enrollment.Style.js'

function LinearProgressWithLabel(props) {
  return (
    <Box tabIndex={0} display="flex" alignItems="center" width="100%">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Typography variant="body2" color="textPrimary">
        <Box minWidth={40} fontWeight={600}>{`${Math.round(props.value)}%`}</Box>
      </Typography>
    </Box>
  )
}
LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
}
const ITEM_HEIGHT = 48
function ProgramDetail({ enrollmentDetail, fetchDownloadTranscript }) {
  const classes = useStyles()
  const { enrId } = useParams()
  const { t } = useTranslation()
  const [downloadEl, setDownloadEl] = React.useState(null)
  const toggleDownloadTranscript = function (event) {
    if (downloadEl === null) {
      setDownloadEl(event.currentTarget)
    } else {
      setDownloadEl(null)
    }
  }
  const [canvasLock, setCanvasLock] = React.useState(null)
  const toggleCanvasLock = function (event) {
    if (canvasLock === null) {
      setCanvasLock(event.currentTarget)
    } else {
      setCanvasLock(null)
    }
  }
  const downloadTranscript = (e) => {
    fetchDownloadTranscript(enrId, e.target.value)
  }
  const [valueDate, setValueDate] = React.useState(new Date('2014-08-18T21:11:54'))

  const handleChangeDate = (newValue) => {
    setValueDate(newValue)
  }

  const breakpoint = useMediaQuery('(max-width:991px)')
  return (
    <>
      <Formik>
        <Form>
          <Box
            p={3}
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Box className={classes.programImage} mb={{ xs: 2, md: 0 }}>
              <Box mx="auto" width="96px" borderRadius={8} className="image-container">
                <img
                  src={enrollmentDetail.enr_program?.pgm_logo || UploadImg}
                  alt="program"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = UploadImg
                  }}
                />
              </Box>
            </Box>

            <Box className={classes.programDetail} pl={{ xs: 0, md: 3 }}>
              <Grid container spacing={breakpoint ? 2 : 3} justify="space-between">
                <Grid item xs={12} sm={12} lg={12} xl={6}>
                  <Box display="flex" alignItems="flex-start" justifyContent="flex-start" mb={1}>
                    <Typography component="h4" variant="body1" tabIndex={0}>
                      <Box fontWeight={600}>{enrollmentDetail.enr_program?.pgm_name}</Box>
                    </Typography>
                  </Box>
                  <Grid container spacing={breakpoint ? 2 : 3}>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500">
                          {t('district')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={600}>
                          {enrollmentDetail.enr_school?.sch_district?.dst_name}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500">
                          {t('schoolName')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={600}>
                          {enrollmentDetail.enr_school?.sch_name}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500">
                          {t('enrollmentId')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={600}>
                          {enrollmentDetail.enr_system_enrollment_id}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500">
                          {t('programID')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={600}>
                          {enrollmentDetail.enr_program?.pgm_program_public_id}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500">
                          {t('allottedCredit')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={600}>
                          {enrollmentDetail.alloted_credit}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500">
                          {t('expirationDate')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={600}>
                          {enrollmentDetail.expiry_date}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500">
                          {t('enrollmentDate')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={600}>
                          {enrollmentDetail.enr_enrolled_on}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500">
                          {t('accountBalance')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={600}>
                          {t('with$', { amount: enrollmentDetail.total_amount })}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500">
                          {t('dueBalance')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="secondary" tabIndex={0}>
                        <Box component="span" fontWeight={600}>
                          {t('with$', { amount: enrollmentDetail.dueAmount })}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500">
                          {t('courseCompleted')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={600}>
                          {enrollmentDetail.course_completed || 0} /{' '}
                          {enrollmentDetail.total_course || 0}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500">
                          {t('creditEarned')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={600}>
                          {enrollmentDetail.earned_credit}
                        </Box>
                      </Typography>
                    </Grid>
                    <Hidden smDown>
                      <Grid item xs={12} sm={6} md={4} lg={2} xl={3}></Grid>
                    </Hidden>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    flexDirection="column"
                  >
                    <Box
                      mb={3}
                      width="100%"
                      display="flex"
                      justifyContent={{ xs: 'flex-start', lg: 'flex-end' }}
                      flexDirection={{ xs: 'column', sm: 'row' }}
                    >
                      <Box
                        width={{ xs: '100%', sm: 'auto' }}
                        display="inline-block"
                        mr={{ xs: 0, sm: 1 }}
                      >
                        <Button
                          className="custom-default-button text-transform-none"
                          variant="contained"
                          disableElevation
                          fullWidth
                          onClick={toggleCanvasLock}
                          endIcon={<ChevronDown width={20} height={20} />}
                          disabled
                        >
                          {t('applyCanvasLock')}
                        </Button>
                        <Menu
                          anchorEl={canvasLock}
                          getContentAnchorEl={null}
                          keepMounted
                          open={Boolean(canvasLock)}
                          onClose={toggleCanvasLock}
                          classes={{ paper: 'test' }}
                          PaperProps={{
                            style: {
                              maxHeight: ITEM_HEIGHT * 8,
                              maxWidth: '30ch',
                              marginTop: '40px',
                              borderRadius: '8px',
                            },
                          }}
                        >
                          <MenuItem value={0} key={0}>
                            <Box
                              component="span"
                              variant="body2"
                              noWrap
                              display="flex"
                              alignItems="center"
                            >
                              <Lock width={18} height={18} />{' '}
                              <Box component="span" ml={0.5}>
                                {t('applyCanvasLock30')}
                              </Box>
                            </Box>
                          </MenuItem>
                          <MenuItem value={1} key={1} display="flex" alignItems="center">
                            <Box
                              component="span"
                              variant="body2"
                              noWrap
                              display="flex"
                              alignItems="center"
                            >
                              <Lock width={18} height={18} />{' '}
                              <Box component="span" ml={0.5}>
                                {t('applyCanvasLock60')}
                              </Box>
                            </Box>
                          </MenuItem>
                        </Menu>
                      </Box>
                      <Box
                        width={{ xs: '100%', sm: 'auto' }}
                        display="inline-block"
                        mt={{ xs: 1, sm: 0 }}
                      >
                        <Button
                          className="custom-default-button text-transform-none"
                          variant="contained"
                          disableElevation
                          fullWidth
                          onClick={toggleDownloadTranscript}
                          endIcon={<ChevronDown width={20} height={20} />}
                        >
                          {t('download')}
                        </Button>

                        <Menu
                          anchorEl={downloadEl}
                          getContentAnchorEl={null}
                          keepMounted
                          open={Boolean(downloadEl)}
                          onClose={toggleDownloadTranscript}
                          classes={{ paper: 'test' }}
                          PaperProps={{
                            style: {
                              maxHeight: ITEM_HEIGHT * 8,
                              maxWidth: '30ch',
                              marginTop: '40px',
                              borderRadius: '8px',
                            },
                          }}
                        >
                          {get(enrollmentDetail, 'enr_program.pgm_program_transcripts', [])?.map(
                            (options) => (
                              <MenuItem
                                key={options.pt_id}
                                value={options.pt_transcript_template?.tt_id}
                                onClick={downloadTranscript}
                              >
                                {options.pt_transcript_name}
                              </MenuItem>
                            )
                          )}
                        </Menu>
                      </Box>
                    </Box>
                    <Typography component="p" variant="body2" tabIndex={0}>
                      <Box fontWeight={600}>{t('progress')}</Box>
                    </Typography>

                    <LinearProgressWithLabel
                      className="horizontal-progress  progress-status-info"
                      variant="determinate"
                      value={enrollmentDetail.progress || 0}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Divider />
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
                <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                  <Box fontWeight="600">{t('fields:printedDate')}</Box>
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    fullWidth
                    className="custom-picker custom-input-field"
                    variant="inline"
                    inputVariant="outlined"
                    keyboardIcon={<Calendar />}
                    size="small"
                    value={valueDate}
                    onChange={handleChangeDate}
                    minDateMessage={t('fields:printedDate')}
                    format="dd/MM/yyyy"
                    id="printed_date"
                    name="printed_date"
                    KeyboardButtonProps={{
                      'aria-label': 'choose start date',
                    }}
                    label={<span style={visuallyHidden}>({t('fields:printed_date')})</span>}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
                <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                  <Box fontWeight="600">{t('fields:withdrawalDate')}</Box>
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    fullWidth
                    className="custom-picker custom-input-field"
                    variant="inline"
                    inputVariant="outlined"
                    keyboardIcon={<Calendar />}
                    value={valueDate}
                    onChange={handleChangeDate}
                    size="small"
                    minDateMessage={t('fields:withdrawalDate')}
                    format="dd/MM/yyyy"
                    id="withdrawal_date"
                    name="withdrawal_date"
                    KeyboardButtonProps={{
                      'aria-label': 'choose start date',
                    }}
                    label={<span style={visuallyHidden}>({t('fields:withdrawalDate')})</span>}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
                <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                  <Box fontWeight="600">{t('fields:graduateDate')}</Box>
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    fullWidth
                    className="custom-picker custom-input-field"
                    variant="inline"
                    inputVariant="outlined"
                    keyboardIcon={<Calendar />}
                    size="small"
                    value={valueDate}
                    onChange={handleChangeDate}
                    minDateMessage={t('fields:graduateDate')}
                    format="dd/MM/yyyy"
                    id="graduate_date"
                    name="graduate_date"
                    KeyboardButtonProps={{
                      'aria-label': 'choose start date',
                    }}
                    label={<span style={visuallyHidden}>({t('fields:graduateDate')})</span>}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={3} xl="auto">
                <Typography
                  component="h6"
                  align="left"
                  variant="h6"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="14px">
                    {t('programCategory')}
                  </Box>
                </Typography>
                <Typography
                  component="h6"
                  align="left"
                  variant="subtitle2"
                  color="textPrimary"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                    {enrollmentDetail.enr_program?.pgm_program_category?.pct_name}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} lg={3} xl="auto">
                <Typography
                  component="h6"
                  align="left"
                  variant="h6"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="14px">
                    {t('ageRequirement')}
                  </Box>
                </Typography>
                <Typography
                  component="h6"
                  align="left"
                  variant="subtitle2"
                  color="textPrimary"
                  className="word-break"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                    {enrollmentDetail.enr_program?.pgm_minimum_age}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} lg={3} xl="auto">
                <Typography
                  component="h6"
                  align="left"
                  variant="h6"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="14px">
                    {t('transcriptGrade')}
                  </Box>
                </Typography>
                <Typography
                  component="h6"
                  align="left"
                  variant="subtitle2"
                  color="textPrimary"
                  className="word-break"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                    {enrollmentDetail.enr_program?.pgm_transcript_grade}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} lg={3} xl="auto">
                <Typography
                  component="h6"
                  align="left"
                  variant="h6"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="14px">
                    {t('requiresTranscripts')}
                  </Box>
                </Typography>
                <Typography
                  component="h6"
                  align="left"
                  variant="subtitle2"
                  color="textPrimary"
                  className="word-break"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                    {enrollmentDetail.enr_program?.pgm_require_transcript ? 'Yes' : 'No'}
                  </Box>
                </Typography>
              </Grid>
              <Grid container>
                <Grid item xs={12} lg="auto">
                  <Box px={2} pt={2}>
                    <Typography component="h5" variant="subtitle1" color="textPrimary" tabIndex={0}>
                      <Box component="span" fontWeight="600">
                        {t('selectedFeeStructure')}
                      </Box>
                    </Typography>

                    <Box mt={1} className="border-box" p={2} width="100%">
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4} lg="auto">
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="500">
                              {t('structureName')}
                            </Box>
                          </Typography>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight={600}>
                              {enrollmentDetail.enr_fee?.fee_name}
                            </Box>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg="auto">
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="500">
                              {t('numberOfInstallment')}
                            </Box>
                          </Typography>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight={600}>
                              {enrollmentDetail.enr_fee?.fee_installment_count}
                            </Box>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg="auto">
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="500">
                              {t('installmentDuration')}
                            </Box>
                          </Typography>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight={600}>
                              {enrollmentDetail.enr_fee?.fee_installment_duration}
                            </Box>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg="auto">
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="500">
                              {t('finalFee')}
                            </Box>
                          </Typography>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight={600}>
                              {t('with$', { amount: enrollmentDetail.enr_fee?.inv_total_amount })}
                            </Box>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg="auto">
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="500">
                              {t('feePerInstallment')}
                            </Box>
                          </Typography>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight={600}>
                              {t('with$', {
                                amount: enrollmentDetail.enr_fee?.inv_installment_amount || 0,
                              })}
                            </Box>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <Typography
                  component="h6"
                  align="left"
                  variant="h6"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="14px">
                    {t('programDescription')}
                  </Box>
                </Typography>
                <Typography
                  component="h6"
                  align="left"
                  variant="subtitle2"
                  color="textPrimary"
                  className="word-break"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                    {enrollmentDetail.enr_program?.pgm_description}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <Typography
                  component="h6"
                  align="left"
                  variant="h6"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="14px">
                    {t('preRequisite')}
                  </Box>
                </Typography>
                <Typography
                  component="h6"
                  align="left"
                  variant="subtitle2"
                  color="textPrimary"
                  className="word-break"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                    {enrollmentDetail.enr_program?.pgm_prerequisites}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Formik>
    </>
  )
}
ProgramDetail.propTypes = {
  enrollmentDetail: PropTypes.object,
  fetchDownloadTranscript: PropTypes.func,
}

ProgramDetail.defaultProps = {
  enrollmentDetail: {},
  fetchDownloadTranscript: () => {},
}

export default ProgramDetail
