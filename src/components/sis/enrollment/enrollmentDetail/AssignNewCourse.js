/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { Check, ChevronLeft, Search } from 'react-feather'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'

import noDataImage from '../../../../assets/images/nodatafound.svg'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../Enrollment.Style'
function AssignNewCourse({
  order,
  orderBy,
  setOrder,
  setOrderBy,
  assignCourseToggle,
  programCourseGroupList,
  getCourseGroupItems,
  selectedProgramGroupDetails,
  fetchCourseOnScroll,
  searchText,
  setSearchValue,
  onSearchEnter,
  updateEnrolledCourse,
  toggleCourseCheck,
  onApplyEnrolledFilter,
}) {
  const classes = useStyles()
  const dataParameter = 'id'
  const { t } = useTranslation()
  const allHeadCells = [
    {
      id: 'course_ID',
      label: t('Course Code'),
      isSort: false,
      sortProperty: 'course_ID',
    },

    {
      id: 'cr_name',
      label: t('courseName'),
      isSort: false,
      sortProperty: 'cr_name',
    },
    {
      id: 'cr_subject_id',
      label: t('subject'),
      isSort: false,
      sortProperty: 'cr_subject_id',
    },
    {
      id: 'cr_credit',
      label: t('credit'),
      isSort: false,
      sortProperty: 'cr_credit',
    },
    {
      id: 'program_type',
      label: t('programType'),
      isSort: false,
      sortProperty: 'program_type',
    },
    {
      id: 'passing_grade',
      label: t('passingGrade'),
      isSort: false,
      sortProperty: 'passing_grade',
    },
    {
      id: 'actions',
      label: t('assignRevoke'),
      isSort: false,
      sortProperty: 'actions',
      width: '120px',
    },
  ]

  const CheckboxWithGreenCheck = withStyles({})(Checkbox)

  const courseAction = (row) => {
    return (
      <Box pl={1} className="custom-checkbox text-primary">
        <Tooltip title={row.isEnrolled ? t('revokeCourse') : t('assignCourse')}>
          <FormControlLabel
            control={
              <CheckboxWithGreenCheck
                onClick={toggleCourseCheck}
                data-id={row.cgi_id}
                group-id={row.cgi_course_group.cg_id}
                disabled={!row.cgi_is_elective}
                defaultChecked
                checkedIcon={
                  <Check aria-label={row.isEnrolled ? t('revokeCourse') : t('assignCourse')} />
                }
                color="primary"
                checked={row.isEnrolled}
              />
            }
            label=""
          />
        </Tooltip>
      </Box>
    )
  }
  const breakpointInfiniteScroll = useMediaQuery('(max-width:959px)')
  return (
    <>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        flexDirection="row"
        justifyContent="flex-start"
      >
        <IconButton
          aria-label={t('back')}
          edge="start"
          color="primary"
          disableElevation
          onClick={assignCourseToggle}
        >
          <ChevronLeft />
        </IconButton>
        <Typography component="h5" variant="subtitle1" color="textPrimary" tabIndex={0}>
          <Box component="span" fontWeight="600">
            {t('assignNewCourse')}
          </Box>
        </Typography>
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
                {t('courseGroups')}
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
                value={searchText}
                onChange={setSearchValue}
                onKeyDown={onSearchEnter}
                placeholder={t('fields:searchCourseGroupByName')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="press enter to search"
                        onClick={onApplyEnrolledFilter}
                      >
                        <Search className="icon-color-light rotate90" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <InfiniteScroll
              dataLength={programCourseGroupList?.length}
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
              {programCourseGroupList.map((row) => {
                return (
                  <Box
                    mt={2}
                    width="100%"
                    className="course-list-scroll cursor-pointer"
                    hover
                    data-id={row?.cg_id}
                    key={row?.cg_id}
                  >
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      flexDirection="column"
                      justifyContent="flex-start"
                      p={1}
                      className={clsx({
                        'course-selected': row.cg_id === selectedProgramGroupDetails?.cg_id,
                      })}
                      mt={1}
                      data-id={row?.cg_id}
                      key={row?.cg_id}
                      group-id={row?.cg_id}
                      onClick={getCourseGroupItems}
                    >
                      <Typography tabIndex={0} component="h4" variant="subtitle1">
                        <Box fontWeight={500}>{row.cg_course_group_name}</Box>
                      </Typography>
                    </Box>
                  </Box>
                )
              })}
              {programCourseGroupList?.length <= 0 ? (
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
                    {t('courseGroupNotFound')}
                  </Box>
                </Box>
              ) : null}
            </InfiniteScroll>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={8} xl={9}>
          <Box className="border-box" width="100%">
            <Box px={2} py={2} width="100%">
              <Grid container spacing={2} justify="space-between" alignItems="center">
                <Grid item xs={12} sm={8} md={9} xl={7}>
                  <Grid container alignItems="center" spacing={2} justify="space-between">
                    <Grid item xs={12} md={12} lg="auto">
                      <Typography
                        component="h4"
                        align="left"
                        variant="subtitle1"
                        color="textPrimary"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="600">
                          {t('courses')}
                        </Box>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm="auto">
                      <Typography
                        component="span"
                        align="left"
                        variant="body2"
                        color="textPrimary"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="600">
                          {t('ruleType') + ' : '}
                        </Box>
                        <Box component="span" ml={{ xs: 0, lg: 1 }}>
                          {t(`reference:${selectedProgramGroupDetails?.cg_rule_type}`)}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm="auto">
                      <Typography
                        component="span"
                        align="left"
                        variant="body2"
                        color="textPrimary"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="600">
                          {t('ruleValue') + ' : '}
                        </Box>
                        <Box component="span" ml={{ xs: 0, md: 1 }}>
                          {selectedProgramGroupDetails?.cg_rule_value}
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs="auto">
                  <Button
                    className="text-transform-none"
                    variant="contained"
                    size="large"
                    disableElevation
                    color="primary"
                    onClick={updateEnrolledCourse}
                  >
                    {t('update')}
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <CustomTable
              noDataMessage={t('dataNotFound')}
              order={order}
              orderBy={orderBy}
              setOrder={setOrder}
              setOrderBy={setOrderBy}
              data={selectedProgramGroupDetails?.courseItemList || []}
              headCells={allHeadCells}
              dataParameter={dataParameter}
              isSelection={false}
            >
              {(selectedProgramGroupDetails?.courseItemList || []).map((row) => {
                return (
                  <TableRow hover data-id={row.cg_id} key={row.cg_id}>
                    <TableCell tabIndex={0}>{row?.cgi_course?.cr_number}</TableCell>
                    <TableCell tabIndex={0}>{row?.cgi_course?.cr_name}</TableCell>
                    <TableCell tabIndex={0}>{row?.cgi_course?.cr_subject?.sub_name}</TableCell>
                    <TableCell tabIndex={0}>{row?.cgi_credits}</TableCell>
                    <TableCell tabIndex={0}>
                      {t(`reference:${row?.cgi_course_group?.cg_rule_type}`)}
                    </TableCell>
                    <TableCell tabIndex={0}>{row?.cgi_passing_grade}</TableCell>
                    <TableCell className={classes.verticalSpaceRemove}>
                      <Box whiteSpace="nowrap">{courseAction(row)}</Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </CustomTable>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
AssignNewCourse.propTypes = {
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  setFilterValue: PropTypes.func,
  assignCourseToggle: PropTypes.func,
  programCourseGroupList: PropTypes.array,
  getCourseGroupItems: PropTypes.func,
  selectedProgramGroupDetails: PropTypes.object,
  fetchCourseOnScroll: PropTypes.func,
  searchText: PropTypes.string,
  setSearchValue: PropTypes.func,
  onSearchEnter: PropTypes.func,
  updateEnrolledCourse: PropTypes.func,
  courseItem: PropTypes.object,
  toggleCourseCheck: PropTypes.func,
  onApplyEnrolledFilter: PropTypes.func,
}

AssignNewCourse.defaultProps = {
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  setFilterValue: () => {},
  assignCourseToggle: () => {},
  programCourseGroupList: [],
  getCourseGroupItems: () => {},
  selectedProgramGroupDetails: {},
  fetchCourseOnScroll: () => {},
  searchText: '',
  setSearchValue: () => {},
  onSearchEnter: () => {},
  updateEnrolledCourse: () => {},
  courseItem: {},
  toggleCourseCheck: () => {},
  onApplyEnrolledFilter: () => {},
}

export default AssignNewCourse
