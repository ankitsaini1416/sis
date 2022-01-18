import {
  Box,
  Button,
  Divider,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { visuallyHidden } from '@mui/utils'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowUpRight, Check, Edit2, Search } from 'react-feather'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'

import noDataImage from '../../../../assets/images/nodatafound.svg'
import UploadImg from '../../../../assets/images/upload.png'
import { ROUTES } from '../../../../helpers/constants'
import { get, isEmpty } from '../../../../helpers/utils'
import withRedirect from '../../../../hocs/RedirectHOC'
import SelectFilter from '../../../filters/Select'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../Enrollment.Style'
import EditEarnedCredit from './EditCreditEarned'
import EditReceivedGrade from './EditReceivedGrade'

// function GradeDetail() {
//   const [anchorEl, setAnchorEl] = React.useState(null)
//   const handlePopoverOpen = (event) => {
//     setAnchorEl(event.currentTarget)
//   }
//   const handlePopoverClose = () => {
//     setAnchorEl(null)
//   }
//   const open = Boolean(anchorEl)
//   const { t } = useTranslation()

//   return (
//     <>
//       <Info
//         width={16}
//         height={16}
//         className="text-info cursor-pointer"
//         aria-owns={open ? 'grade-popover' : undefined}
//         aria-haspopup="true"
//         onMouseEnter={handlePopoverOpen}
//         onMouseLeave={handlePopoverClose}
//       />
//       <Popover
//         id="grade-popover"
//         className="program-popover"
//         open={open}
//         anchorEl={anchorEl}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'center',
//         }}
//         PaperProps={{
//           style: {
//             width: '25ch',
//           },
//         }}
//         onClose={handlePopoverClose}
//       >
//         <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
//           <Box component="span" fontWeight={600} fontSize={14}>
//             {t('quizzes')}
//           </Box>
//           <Box component="span" fontWeight={500} fontSize={14}>
//             80%
//           </Box>
//         </Box>
//         <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
//           <Box component="span" fontWeight={600} fontSize={14}>
//             {t('finalExam')}
//           </Box>
//           <Box component="span" fontWeight={500} fontSize={14}>
//             79.31%
//           </Box>
//         </Box>
//         <Divider />
//         <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
//           <Box component="span" fontWeight={600} fontSize={14}>
//             {t('total')}
//           </Box>
//           <Box component="span" fontWeight={500} fontSize={14}>
//             79.31%
//           </Box>
//         </Box>
//       </Popover>
//     </>
//   )
// }

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

function AssignedCourse({
  order,
  orderBy,
  setOrder,
  setOrderBy,
  filter,
  setFilterValue,
  assignCourseToggle,
  enrollmentCourses,
  fetchCourseOnScroll,
  getProgramsCategory,
  courseItem,
  onSearchEnter,
  onApplyFilter,
  editCourseDetails,
  masterData,
  instructors,
}) {
  const ButtonEnhanced = withRedirect(Button)
  const classes = useStyles()
  const dataParameter = 'id'
  const { t } = useTranslation()

  const allHeadCells = [
    {
      id: 'quiz_name',
      label: t('quizName'),
      isSort: true,
      sortProperty: 'quiz_name',
    },
    {
      id: 'received_point',
      label: t('receivedPoint'),
      isSort: true,
      sortProperty: 'received_point',
    },
    {
      id: 'out_of',
      label: t('courseName'),
      isSort: true,
      sortProperty: 'out_of',
    },
  ]
  const InitialData = [
    {
      quiz_name: 'Modern History Quiz',
      received_point: '10',
      out_of: '35',
    },
    {
      quiz_name: 'Civic Hons Quiz',
      received_point: '18',
      out_of: '35',
    },
    {
      quiz_name: 'Current Affair Quiz',
      received_point: '32',
      out_of: '35',
    },
  ]

  const conditionalClass = (row) => {
    if (row.received_point < 15) {
      return 'column-alert'
    } else if (row.received_point > 30) {
      return 'column-success'
    } else {
      return null
    }
  }

  const handleStatus = (event) => {
    const enrollmentCourseStatus = {
      enc_status: event.target.value,
    }
    editCourseDetails(enrollmentCourseStatus, {})
  }

  const breakpoint = useMediaQuery('(max-width:991px)')
  const [editEarnedCredit, setEditEarnedCredit] = React.useState(false)
  const toggleEarnedCredit = () => setEditEarnedCredit(!editEarnedCredit)
  const [editReceivedGrade, setEditReceivedGrade] = React.useState(false)
  const toggleReceivedGrade = () => setEditReceivedGrade(!editReceivedGrade)
  const breakpointInfiniteScroll = useMediaQuery('(max-width:959px)')
  return (
    <>
      <Box mb={2}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h5" variant="subtitle1" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="600">
                {t('assignedCourses')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <Button
              variant="contained"
              size="large"
              color="primary"
              className="text-transform-none"
              disableElevation
              onClick={assignCourseToggle}
            >
              {t('assignCourses')}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4} xl={3}>
          <Box height="100%" className="border-box" p={2} width="100%">
            <Typography
              component="h4"
              align="left"
              variant="subtitle1"
              color="textPrimary"
              gutterBottom
              tabIndex={0}
            >
              <Box component="span" fontWeight="600">
                {t('courses')}
              </Box>
            </Typography>
            <Box mt={2}>
              <TextField
                className="custom-input-field input-search"
                variant="outlined"
                fullWidth
                size="small"
                id="q"
                name="q"
                autoComplete="q"
                value={filter.q}
                onChange={setFilterValue}
                onKeyDown={onSearchEnter}
                placeholder={t('fields:searchCourseByIdName')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="Press enter to search" onClick={onApplyFilter}>
                        <Search className="icon-color-light rotate90" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box pt={1} display="flex" width="100%" alignItems="flex-start" flexDirection="column">
              <Hidden smDown>
                <Typography
                  component="h4"
                  align="left"
                  variant="h6"
                  color="textPrimary"
                  gutterBottom
                >
                  <Box component="span" fontWeight="fontWeightMedium" fontSize="14px" tabIndex={0}>
                    {t('filters')}
                  </Box>
                </Typography>
              </Hidden>

              <Grid spacing={1} container className="filter-search-section">
                <Grid item xs={12} sm="auto">
                  <SelectFilter
                    name="status"
                    filter={filter}
                    setFilterValue={setFilterValue}
                    label={t('fields:status') + ':'}
                    labelFallback={t('fields:status')}
                    optionId="key"
                    optionName="type"
                    options={masterData.course_status.map((item) => ({
                      type: t(`reference:${item}`),
                      key: `${item}`,
                    }))}
                  />
                </Grid>

                {/* <Grid item xs={12} sm="auto">
                  <Box
                    display="flex"
                    justifyContent={{
                      xs: 'flex-start',
                      sm: 'flex-end',
                      lg: 'flex-end',
                    }}
                    alignItems="center"
                  >
                    <Box mr={1}>
                      <Button
                        className="custom-default-button text-transform-none"
                        disableElevation
                        endIcon={<ArrowRight />}
                        variant="contained"
                        onClick={onApplyFilter}
                      >
                        {t('filter')}
                      </Button>
                    </Box>
                    <Button
                      className="text-transform-none"
                      disableElevation
                      variant="text"
                      color="primary"
                      onClick={onCourseFilterReset}
                    >
                      {t('reset')}
                    </Button>
                  </Box>
                </Grid> */}
              </Grid>
            </Box>
            <InfiniteScroll
              dataLength={enrollmentCourses?.length}
              next={fetchCourseOnScroll}
              height={breakpointInfiniteScroll ? '400px' : '100%'}
              hasMore={true}
              loader={
                <Box className={classes.infiniteLoader}>
                  <CircularProgress color="primary" />
                </Box>
              }
              endMessage={
                <p tabIndex={0} style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {enrollmentCourses?.map((row) => {
                return (
                  <Box
                    mt={1}
                    width="100%"
                    className="course-list-scroll"
                    hover
                    data-id={row?.cg_id}
                    key={row?.cg_id}
                  >
                    <span
                      disableElevation
                      color="default"
                      variant="text"
                      className="text-transform-none"
                    >
                      <Box fontWeight={600}>{row?.cg_course_group_name}</Box>
                    </span>

                    <Box
                      display="flex"
                      alignItems="flex-start"
                      flexDirection="column"
                      justifyContent="flex-start"
                      mt={1}
                      className="cursor-pointer"
                      data-id={row?.cg_id}
                      key={row?.cg_id}
                    >
                      {/* <Box mb={0.5} component="span" className="label-info" fontSize="12px">
                          In-Progress
                        </Box> */}
                      {row?.cg_enrollment_course?.map((courseGroup) => {
                        return (
                          <Box
                            width="100%"
                            mb={0.5}
                            p={1.5}
                            component="span"
                            className={clsx({
                              'course-selected': courseItem?.enc_id === courseGroup?.enc_id,
                            })}
                            fontSize="12px"
                            key={courseGroup?.enc_id}
                            data-id={courseGroup?.enc_id}
                            group-id={row?.cg_id}
                            onClick={getProgramsCategory}
                          >
                            <Typography tabIndex={0} component="h4" variant="body1">
                              <Box fontWeight={600}>
                                {courseGroup?.enc_course_group_item?.cgi_course?.cr_name ||
                                  t('notAvailable')}
                              </Box>
                            </Typography>
                            <Box className={classes.courseInfo + ' course-info'}>
                              <Box
                                tabIndex={0}
                                mr={1}
                                fontSize={12}
                                fontWeight={600}
                                position="relative"
                              >
                                {courseGroup?.enc_course_group_item?.cgi_course?.cr_number ||
                                  t('notAvailable')}
                              </Box>

                              <Box
                                tabIndex={0}
                                ml={1}
                                fontWeight={600}
                                fontSize={12}
                                position="relative"
                              >
                                {courseGroup?.enc_course_group_item?.cgi_course?.cr_subject
                                  ?.sub_name || t('notAvailable')}
                              </Box>
                            </Box>
                          </Box>
                        )
                      })}
                    </Box>
                  </Box>
                )
              })}
              {enrollmentCourses?.length <= 0 ? (
                <Box
                  p={2}
                  dispaly="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                >
                  <Box mb={2} display="flex" justifyContent="center" className="no-data-image">
                    <img width="150px" src={noDataImage} alt="no data" />
                  </Box>
                  <Box
                    component="p"
                    fontSize="18px"
                    fontWeight="400"
                    align="center"
                    className="custom-table-no-data"
                  >
                    {t('courseNotFound')}
                  </Box>
                </Box>
              ) : null}
            </InfiniteScroll>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8} xl={9}>
          <Box id="courseDetail" className="border-box" p={2} width="100%">
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="flex-start"
              flexDirection="column"
              mb={3}
            >
              <Typography
                component="h6"
                variant="subtitle1"
                color="textPrimary"
                gutterBottom
                tabIndex={0}
              >
                <Box component="span" fontWeight="600">
                  {t('courseDetails')}
                </Box>
              </Typography>
              <Box
                mt={1}
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                flexDirection={{ xs: 'column', md: 'row' }}
              >
                <Box className={classes.courseImage} mb={{ xs: 2, md: 0 }}>
                  <Box mx="auto" width="56px" borderRadius={8} className="image-container">
                    <img
                      src={get(courseItem, 'courseItemDetail.enc_logo', UploadImg)}
                      alt="program"
                      tabIndex={0}
                    />
                  </Box>
                </Box>

                <Box className={classes.courseDetail} pl={{ xs: 0, md: 3 }}>
                  <Grid container spacing={breakpoint ? 2 : 3} justify="space-between">
                    <Grid item xs={12} sm={12} lg={8} xl={8}>
                      <Box
                        display="flex"
                        alignItems="flex-start"
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        justifyContent="flex-start"
                        mb={1}
                      >
                        <Typography tabIndex={0} component="h4" variant="body1">
                          <Box fontWeight={600}>
                            {' '}
                            {courseItem?.enc_course_group_item?.cgi_course?.cr_name ||
                              t('notAvailable')}
                          </Box>
                        </Typography>
                      </Box>
                      <Grid container spacing={breakpoint ? 2 : 3}>
                        <Grid item xs={12} sm={6} md={4} xl={3}>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="500">
                              {t('courseCode')}
                            </Box>
                          </Typography>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight={600}>
                              {courseItem?.enc_course_group_item?.cgi_course?.cr_number ||
                                t('notAvailable')}
                            </Box>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={3}>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="500">
                              {t('courseGroup')}
                            </Box>
                          </Typography>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight={600}>
                              {courseItem?.courseItemDetail?.enc_course_group
                                ?.cg_course_group_name || t('notAvailable')}
                            </Box>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={3}>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="500">
                              {t('subject')}
                            </Box>
                          </Typography>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight={600}>
                              {courseItem?.enc_course_group_item?.cgi_course?.cr_subject
                                ?.sub_name || t('notAvailable')}
                            </Box>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={3}>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="500">
                              {t('creditAssigned')}
                            </Box>
                          </Typography>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight={600}>
                              {courseItem?.enc_credits || t('notAvailable')}
                            </Box>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={3}>
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
                          <Typography component="h6" variant="body2" color="textPrimary">
                            <Box tabIndex={0} mr={1} component="span" fontWeight={600}>
                              {courseItem.enc_credit_earned || t('notAvailable')}
                            </Box>
                            {/* <IconButton
                              aria-label={t('edit')}
                              onClick={toggleEarnedCredit}
                              size="small"
                              color="primary"
                            >
                              <Edit2 width={14} height={14} />
                            </IconButton> */}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={3}>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="500">
                              {t('passingGrade')}
                            </Box>
                          </Typography>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight={600}>
                              {courseItem?.enc_passing_grade || t('notAvailable')}
                            </Box>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={3}>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="500">
                              {t('receivedGrade')}
                            </Box>
                          </Typography>
                          <Typography component="h6" variant="body2" color="textPrimary">
                            <Box whiteSpace="nowrap" display="flex" alignItems="center">
                              <Box tabIndex={0} component="span" fontWeight={600} mr={1}>
                                {courseItem.enc_received_grade || t('notAvailable')}
                              </Box>
                              <Box mr={1}>
                                <IconButton
                                  aria-label={t('edit')}
                                  onClick={toggleReceivedGrade}
                                  size="small"
                                  color="primary"
                                >
                                  <Edit2 width={14} height={14} />
                                </IconButton>
                              </Box>
                              {/* <GradeDetail /> */}
                            </Box>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={3}>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="500">
                              {t('courseType')}
                            </Box>
                          </Typography>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight={600}>
                              {courseItem.enc_type || t('notAvailable')}
                            </Box>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight="500">
                              {t('courseDescription')}
                            </Box>
                          </Typography>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight={600}>
                              {courseItem.enc_description || t('notAvailable')}
                            </Box>
                          </Typography>
                        </Grid>
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
                              size="large"
                              variant="contained"
                              disableElevation
                              endIcon={<ArrowUpRight />}
                              disabled
                            >
                              {t('viewOnLMS')}
                            </Button>
                          </Box>
                          <Box
                            width={{ xs: '100%', sm: 'auto' }}
                            display="inline-block"
                            mt={{ xs: 1, sm: 0 }}
                          >
                            <TextField
                              className={
                                'select-' + courseItem.enc_status + ' contained-select-field'
                              }
                              id="select-course-status"
                              select
                              fullWidth
                              value={courseItem.enc_status || ''}
                              onChange={handleStatus}
                              variant="outlined"
                              size={'small'}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Check width={18} height={18} />
                                  </InputAdornment>
                                ),
                              }}
                              label={<span style={visuallyHidden}>({t('fields:status')})</span>}
                            >
                              {masterData.course_status?.map((item) => (
                                <MenuItem key={item} value={item}>
                                  {t(`reference:${item}`)}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Box>
                        </Box>
                        <Typography component="p" variant="body2" tabIndex={0}>
                          <Box fontWeight={600}>{t('progress')}</Box>
                        </Typography>

                        <LinearProgressWithLabel
                          className="horizontal-progress  progress-status-info"
                          variant="determinate"
                          value={courseItem.enc_progress || 0}
                          tabIndex={0}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
            <Divider fullWidth orientation="horizontal" />
            <Box
              my={3}
              display="flex"
              alignItems="flex-start"
              justifyContent="flex-start"
              flexDirection="column"
            >
              <Typography
                component="h6"
                variant="subtitle1"
                color="textPrimary"
                gutterBottom
                tabIndex={0}
              >
                <Box component="span" fontWeight="600">
                  {t('instructorDetails')}
                </Box>
              </Typography>
              <Box
                mt={1}
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                flexDirection={{ xs: 'column', md: 'row' }}
              >
                <Box className={classes.courseImage} mb={{ xs: 2, md: 0 }}>
                  <Box mx="auto" width="56px" borderRadius={8} className="image-container">
                    <img
                      src={
                        instructors?.attributes?.avatar_full
                          ? instructors?.attributes?.avatar_full || UploadImg
                          : UploadImg
                      }
                      alt="Instructor"
                    />
                  </Box>
                </Box>
                <Box className={classes.courseDetail} pl={{ xs: 0, md: 3 }}>
                  <Grid container spacing={breakpoint ? 2 : 3} justify="space-between">
                    <Grid item xs={12} sm={6} md={4} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textPrimary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="600">
                          {t('firstName')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={500}>
                          {instructors.first_name || t('notAvailable')}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textPrimary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="600">
                          {t('middleName')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={500}>
                          {instructors?.attributes?.middle_name || t('notAvailable')}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textPrimary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="600">
                          {t('lastName')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={500}>
                          {instructors.last_name || t('notAvailable')}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={3}>
                      <Typography
                        component="h6"
                        variant="body2"
                        color="textPrimary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="600">
                          {t('gender')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={500}>
                          {instructors?.attributes?.gender || t('notAvailable')}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      {/* <Typography
                        component="h6"
                        variant="body2"
                        color="textPrimary"
                        gutterBottom
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="600">
                          {t('about')}
                        </Box>
                      </Typography>
                      <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight={500}>
                          {(user.about && user.about) || t('notAvailable')}
                        </Box>
                      </Typography> */}
                      <Box mt={2}>
                        <ButtonEnhanced
                          color="primary"
                          variant="contained"
                          className="text-transform-none custom-default-button"
                          disableElevation
                          to={`${ROUTES.USERDETAILS}/${instructors.id}`}
                          disabled={isEmpty(instructors)}
                        >
                          {t('viewProfile')}
                        </ButtonEnhanced>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
            <Divider fullWidth />
            <Box
              mt={3}
              mb={3}
              width="100%"
              display="flex"
              alignItems="flex-start"
              justifyContent="flex-start"
              flexDirection="column"
            >
              <Grid container spacing={breakpoint ? 2 : 3} justify="space-between">
                <Grid item xs={12} lg={6}>
                  <Box mb={2}>
                    <Typography
                      component="h6"
                      variant="subtitle1"
                      color="textPrimary"
                      gutterBottom
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600">
                        {t('quizzes')}
                      </Box>
                    </Typography>
                  </Box>
                  <CustomTable
                    noDataMessage={t('dataNotFound')}
                    containerClass="table-dark"
                    order={order}
                    orderBy={orderBy}
                    setOrder={setOrder}
                    setOrderBy={setOrderBy}
                    data={InitialData}
                    headCells={allHeadCells}
                    dataParameter={dataParameter}
                    isSelection={false}
                  >
                    {InitialData.map((row) => {
                      return (
                        <TableRow hover data-id={row.id} key={row.id}>
                          <TableCell tabIndex={0}>{row.quiz_name}</TableCell>
                          <TableCell tabIndex={0} className={conditionalClass(row)}>
                            {row.received_point}
                          </TableCell>
                          <TableCell tabIndex={0}>{row.out_of}</TableCell>
                        </TableRow>
                      )
                    })}
                  </CustomTable>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Box mb={2}>
                    <Typography
                      component="h6"
                      variant="subtitle1"
                      color="textPrimary"
                      gutterBottom
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600">
                        {t('finalExam')}
                      </Box>
                    </Typography>
                  </Box>
                  <CustomTable
                    noDataMessage={t('dataNotFound')}
                    containerClass="table-dark"
                    order={order}
                    orderBy={orderBy}
                    setOrder={setOrder}
                    setOrderBy={setOrderBy}
                    data={InitialData}
                    headCells={allHeadCells}
                    dataParameter={dataParameter}
                    isSelection={false}
                  >
                    {InitialData.map((row) => {
                      return (
                        <TableRow
                          className={conditionalClass(row)}
                          hover
                          data-id={row.id}
                          key={row.id}
                        >
                          <TableCell tabIndex={0}>{row.quiz_name}</TableCell>
                          <TableCell tabIndex={0}>{row.received_point}</TableCell>
                          <TableCell tabIndex={0}>{row.out_of}</TableCell>
                        </TableRow>
                      )
                    })}
                  </CustomTable>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <EditEarnedCredit
        open={editEarnedCredit}
        onClose={toggleEarnedCredit}
        editCourseDetails={editCourseDetails}
        courseItem={courseItem}
      />
      <EditReceivedGrade
        open={editReceivedGrade}
        onClose={toggleReceivedGrade}
        editCourseDetails={editCourseDetails}
        courseItem={courseItem}
      />
    </>
  )
}
AssignedCourse.propTypes = {
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  setFilterValue: PropTypes.func,
  assignCourseToggle: PropTypes.func,
  fetchCourse: PropTypes.func,
  enrollmentCourses: PropTypes.array,
  fetchCourseOnScroll: PropTypes.func,
  getProgramsCategory: PropTypes.func,
  courseItem: PropTypes.object,
  onSearchEnter: PropTypes.func,
  onApplyFilter: PropTypes.func,
  editCourseDetails: PropTypes.func,
  masterData: PropTypes.object,
  filter: PropTypes.object,
  instructors: PropTypes.object,
}

AssignedCourse.defaultProps = {
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  setFilterValue: () => {},
  assignCourseToggle: () => {},
  fetchCourse: () => {},
  enrollmentCourses: [],
  fetchCourseOnScroll: () => {},
  getProgramsCategory: () => {},
  courseItem: {},
  onSearchEnter: () => {},
  onApplyFilter: () => {},
  editCourseDetails: () => {},
  masterData: {},
  filter: {},
  instructors: {},
}

export default AssignedCourse
