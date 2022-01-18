import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft, Edit2, Eye } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

// import CourseImg from '../../../../assets/images/course-big.png'
import UploadImg from '../../../../assets/images/upload-logo.png'
import { ROUTES } from '../../../../helpers/constants'
import withRedirect from '../../../../hocs/RedirectHOC'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../Programs.Style'
import ProgramSkeleton from '../ProgramSkeleton'
import { get, isEmpty } from './../../../../helpers/utils'

function CourseDetails({
  order,
  orderBy,
  setOrder,
  setOrderBy,
  allHeadCells,
  course,
  coursePrograms,
}) {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation()
  const dataParameter = 'id'
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbPrograms'),
      href: ROUTES.PROGRAMS,
    },
    {
      title: t('breadcrumbAllCourses'),
      href: ROUTES.COURSES,
    },
    {
      title: t('breadcrumbCoursesDetails'),
      href: '',
    },
  ]

  const viewDetail = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <IconButtonEnhanced
        aria-label={t('viewDetail')}
        data-id={row.id}
        color="primary"
        to={`${ROUTES.PROGRAMDETAIL}/${row.id}`}
      >
        <Tooltip title={t('viewDetail')}>
          <Eye width={16} height={16} />
        </Tooltip>
      </IconButtonEnhanced>
    )
  }
  const status = (row) => {
    if (row.pgm_is_active) {
      return (
        <Box tabIndex={0} component="span" className="label-green" id={row.id}>
          {t('active')}
        </Box>
      )
    } else {
      return (
        <Box tabIndex={0} component="span" className="label-red" id={row.id}>
          {t('inActive')}
        </Box>
      )
    }
  }

  const ButtonEnhanced = withRedirect(Button)
  if (isEmpty(course)) {
    return <ProgramSkeleton />
  }
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('courseDetails')}
              </Box>
              <Box ml={1} component="span" fontWeight="500" fontSize="20px" className="user-name">
                ({course.cr_name})
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
                startIcon={<ArrowLeft />}
                onClick={history.goBack}
              >
                {t('back')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Paper rounded={true} elevation={1} className="paper-round">
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4} xl={3}>
              <Box
                mr={{ xs: 0, lg: 0, xl: 3 }}
                px={{ xs: 1, md: 2, lg: 3 }}
                py={{ xs: 3, sm: 3 }}
                className="profileSection"
                align="center"
                mb={{ xs: 3, sm: 3, lg: 0 }}
              >
                <Box
                  mb={2}
                  mx="auto"
                  width={{ xs: '200px', sm: '300px', md: '100%' }}
                  borderRadius={8}
                  className="image-container"
                >
                  <img
                    tabIndex={0}
                    src={course.cr_logo ? course.cr_logo : UploadImg}
                    alt="course image"
                  />
                </Box>
                <Divider />
                <Box mt={2}>
                  {course.cr_number ? (
                    <Typography
                      tabIndex={0}
                      component="h1"
                      align="center"
                      variant="h4"
                      color="textPrimary"
                    >
                      <Box
                        className="word-break"
                        component="span"
                        fontWeight="fontWeightMedium"
                        fontSize="24px"
                      >
                        {course.cr_number}
                      </Box>
                    </Typography>
                  ) : null}

                  <Box
                    mt={2}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {course.cr_is_active ? (
                      <Box
                        component="div"
                        mb={{ xs: 1, sm: 0 }}
                        mr={{ xs: 0, sm: 1 }}
                        className="button-label-success"
                        tabIndex={0}
                      >
                        <FiberManualRecordIcon fontSize="small" />
                        {t('active')}
                      </Box>
                    ) : (
                      <Box
                        component="div"
                        mb={{ xs: 1, sm: 0 }}
                        mr={{ xs: 0, sm: 1 }}
                        className="button-label-error"
                        tabIndex={0}
                      >
                        <FiberManualRecordIcon fontSize="small" />
                        {t('inActive')}
                      </Box>
                    )}

                    <ButtonEnhanced
                      className="text-transform-none"
                      variant="contained"
                      color="primary"
                      disableElevation
                      startIcon={<Edit2 width="18px" />}
                      to={`${ROUTES.EDITCOURSES}/${course.id}`}
                    >
                      {t('editCourse')}
                    </ButtonEnhanced>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={8} xl={9}>
              <Box pb={{ xs: 0, sm: 3, lg: 4 }}>
                <Typography
                  component=""
                  align="left"
                  variant="body2"
                  color="Primary"
                  className="bg-color-surface"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="16px">
                    {t('generalInformation')}
                  </Box>
                </Typography>
                <Box mb={5} mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Typography component="h6" align="left" variant="h6" tabIndex={0}>
                        <Box component="span" fontWeight="600" fontSize="14px">
                          {t('courseName')}
                        </Box>
                      </Typography>
                      <Typography
                        component="h6"
                        align="left"
                        variant="subtitle2"
                        color="textPrimary"
                        gutterBottom
                        className="word-break"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                          {course.cr_name}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Typography component="h6" align="left" variant="h6" tabIndex={0}>
                        <Box component="span" fontWeight="600" fontSize="14px">
                          {t('district')}
                        </Box>
                      </Typography>
                      <Typography
                        component="h6"
                        align="left"
                        variant="subtitle2"
                        color="textPrimary"
                        gutterBottom
                        className="word-break"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                          {get(course, 'cr_school.sch_district.dst_name', '')}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Typography component="h6" align="left" variant="h6" tabIndex={0}>
                        <Box component="span" fontWeight="600" fontSize="14px">
                          {t('school')}
                        </Box>
                      </Typography>
                      <Typography
                        component="h6"
                        align="left"
                        variant="subtitle2"
                        color="textPrimary"
                        gutterBottom
                        className="word-break"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                          {get(course, 'cr_school.sch_name', '')}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Typography component="h6" align="left" variant="h6" tabIndex={0}>
                        <Box component="span" fontWeight="600" fontSize="14px">
                          {t('subject')}
                        </Box>
                      </Typography>
                      <Typography
                        component="h6"
                        align="left"
                        variant="subtitle2"
                        color="textPrimary"
                        gutterBottom
                        className="word-break"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                          {get(course, 'cr_subject.sub_name', '')}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Typography component="h6" align="left" variant="h6" tabIndex={0}>
                        <Box component="span" fontWeight="600" fontSize="14px">
                          {t('courseFee')}
                        </Box>
                      </Typography>
                      <Typography
                        component="h6"
                        align="left"
                        variant="subtitle2"
                        color="textPrimary"
                        gutterBottom
                        className="word-break"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                          {course.cr_default_amount ? (
                            t('with$', { amount: course.cr_default_amount })
                          ) : (
                            <Box className="icon-color-light" fontSize="15px">
                              {t('notAvailable')}
                            </Box>
                          )}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Typography component="h6" align="left" variant="h6" tabIndex={0}>
                        <Box component="span" fontWeight="600" fontSize="14px">
                          {t('courseCredit')}
                        </Box>
                      </Typography>
                      <Typography
                        component="h6"
                        align="left"
                        variant="subtitle2"
                        color="textPrimary"
                        gutterBottom
                        className="word-break"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                          {course.cr_default_credits ? (
                            course.cr_default_credits
                          ) : (
                            <Box className="icon-color-light" fontSize="15px">
                              {t('notAvailable')}
                            </Box>
                          )}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Typography component="h6" align="left" variant="h6" tabIndex={0}>
                        <Box component="span" fontWeight="600" fontSize="14px">
                          {t('passingGrade')}
                        </Box>
                      </Typography>
                      <Typography
                        component="h6"
                        align="left"
                        variant="subtitle2"
                        color="textPrimary"
                        gutterBottom
                        className="word-break"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                          {course.cr_default_passing_grade ? (
                            course.cr_default_passing_grade
                          ) : (
                            <Box className="icon-color-light" fontSize="15px">
                              {t('notAvailable')}
                            </Box>
                          )}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Typography component="h6" align="left" variant="h6" tabIndex={0}>
                        <Box component="span" fontWeight="600" fontSize="14px">
                          {t('createdDate')}
                        </Box>
                      </Typography>
                      <Typography
                        component="h6"
                        align="left"
                        variant="subtitle2"
                        color="textPrimary"
                        gutterBottom
                        className="word-break"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                          {course.createdTimeLabel}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Typography component="h6" align="left" variant="h6" tabIndex={0}>
                        <Box component="span" fontWeight="600" fontSize="14px">
                          {t('lastModifiedDate')}
                        </Box>
                      </Typography>
                      <Typography
                        component="h6"
                        align="left"
                        variant="subtitle2"
                        color="textPrimary"
                        gutterBottom
                        className="word-break"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                          {course.updatedTimeLabel}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Typography component="h6" align="left" variant="h6" tabIndex={0}>
                        <Box component="span" fontWeight="600" fontSize="14px">
                          {t('description')}
                        </Box>
                      </Typography>
                      <Typography
                        component="h6"
                        align="left"
                        variant="subtitle2"
                        color="textPrimary"
                        gutterBottom
                        className="word-break"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                          {course.cr_description ? (
                            course.cr_description
                          ) : (
                            <Box className="icon-color-light" fontSize="15px">
                              {t('notAvailable')}
                            </Box>
                          )}
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={5} mb={3}>
                  <Typography
                    component=""
                    align="left"
                    variant="body2"
                    color="Primary"
                    className="bg-color-surface"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="16px">
                      {t('programs')}
                    </Box>
                  </Typography>
                </Box>
                <CustomTable
                  noDataMessage={t('dataNotFound')}
                  order={order}
                  orderBy={orderBy}
                  setOrder={setOrder}
                  setOrderBy={setOrderBy}
                  data={coursePrograms}
                  headCells={allHeadCells}
                  dataParameter={dataParameter}
                  isSelection={false}
                >
                  {coursePrograms.map((row) => {
                    return (
                      <TableRow hover data-id={row.id} key={row.id}>
                        <TableCell tabIndex={0}>{row.pgm_program_public_id}</TableCell>
                        <TableCell tabIndex={0}>{row.pgm_name}</TableCell>
                        <TableCell tabIndex={0}>{row.pgm_school.sch_name}</TableCell>
                        <TableCell tabIndex={0}>{row.pgm_program_category?.pct_name}</TableCell>
                        <TableCell tabIndex={0}>{row.pgm_minimum_age}</TableCell>
                        <TableCell tabIndex={0}>
                          {row.pgm_require_transcript ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell tabIndex={0}>{row.pgm_course_group_item.assignedDate}</TableCell>
                        <TableCell>{status(row)}</TableCell>
                        <TableCell className={classes.verticalSpaceRemove}>
                          {viewDetail(row)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </CustomTable>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

CourseDetails.propTypes = {
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  allHeadCells: PropTypes.array,
  pageDetails: PropTypes.object,
  course: PropTypes.object,
  coursePrograms: PropTypes.array,
}

CourseDetails.defaultProps = {
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  allHeadCells: [],
  pageDetails: {},
  course: {},
  coursePrograms: [],
}

export default CourseDetails
