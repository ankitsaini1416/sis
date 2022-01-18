import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'
import React from 'react'
import { Archive, ChevronLeft, Edit2, HelpCircle, Plus, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import CourseImg from '../../../../assets/images/course.png'
import { createObjectURLSecure, isEmpty } from '../../../../helpers/utils'
import ConfirmBox from '../../../common/ConfirmBox'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../Programs.Style'
import AddCourseGroup from './AddCourseGroup'
import AssignCourse from './AssignCourse'
import EditCourse from './EditCourse'

function Courses({
  order,
  orderBy,
  setOrder,
  setOrderBy,
  addUpdateCourseGroup,
  courseGroupList,
  masterData,
  removeCourseGroup,
  actionType,
  setActionType,
  getCourseGroupDetailById,
  courseGroupDetail,
  getCourseGroupItems,
  subjects,
  getCourseGroupItemById,
  courseGroupItem,
  removeCourseGroupItem,
  editCourseGroupItem,
  courses,
  searchCourses,
  addCourseGroupItem,
  courseFilter,
  setCourseFilterValue,
  resetCourseFilter,
  setCourses,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const allHeadCells = [
    {
      id: 'course_code',
      label: t('courseCode'),
      isSort: false,
      sortProperty: 'course_code',
    },
    {
      id: 'course_name',
      label: t('courseName'),
      isSort: false,
      sortProperty: 'course_name',
    },
    {
      id: 'course_subject',
      label: t('courseSubject'),
      isSort: false,
      sortProperty: 'course_subject',
    },
    {
      id: 'is_elective',
      label: t('isElective'),
      isSort: false,
      sortProperty: 'is_elective',
    },
    {
      id: 'category',
      label: t('category'),
      isSort: false,
      sortProperty: 'category',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '100px',
    },
  ]
  const DetailsData = [
    {
      course_code: 'SCI-BIO-01',
      course_name: 'Physics 01',
      course_subject: 'Science',
      is_elective: 'Yes',
      category: 'Regular',
    },
    {
      course_code: 'SCI-BIO-02',
      course_name: 'Biology 01',
      course_subject: 'Science',
      is_elective: 'Yes',
      category: 'Honours',
    },
  ]

  const [courseId, setCourseId] = React.useState('')
  const [courseGroupId, setCourseGroupId] = React.useState('')
  const [deleteItem, setdeleteItem] = React.useState('')
  const [deleteCourseItem, setdeleteCourseItem] = React.useState({})
  const [editCourse, setEditCourse] = React.useState(false)
  const [addCourseModal, setAddCourseModal] = React.useState({})

  const dataParameter = 'id'

  const onOpen = () => {
    setActionType('add')
  }

  const onClose = () => {
    setActionType('')
  }

  const onEdit = (event) => {
    setActionType('edit')
    let id = event.currentTarget.attributes['data-id'].value
    getCourseGroupDetailById(id)
  }

  const handleCourseToggle = (panel) => (event, isExpanded) => {
    setCourseId(isExpanded ? panel : '')
  }

  const handleCourseGroupToggle = (panel) => (event, isExpanded) => {
    if (panel) {
      getCourseGroupItems(panel)
    }
    setCourseGroupId(isExpanded ? panel : '')
  }

  const toggleEditCourse = () => {
    setEditCourse(!editCourse)
  }

  const onEditCourseItem = (event) => {
    setEditCourse(!editCourse)
    let id = event.currentTarget.attributes['data-id'].value || ''
    getCourseGroupItemById(id)
  }
  const toggleAddCourseModal = (e) => {
    if (isEmpty(addCourseModal)) {
      const id = e.currentTarget.attributes['data-id'].value
      const selectedGroup = courseGroupList.find((item) => item.id.toString() === id)
      setAddCourseModal(selectedGroup)
    } else {
      setAddCourseModal({})
      resetCourseFilter()
      setCourses([])
    }
  }

  const toggleDeletePopup = function (event) {
    if (!deleteItem) {
      const id = event.currentTarget.attributes['data-id'].value
      setdeleteItem(id)
    } else {
      setdeleteItem('')
    }
  }

  const onDeleteConfirm = function () {
    removeCourseGroup(deleteItem, { callback: toggleDeletePopup })
  }

  const courseItemDeletePopup = function (event) {
    if (isEmpty(deleteCourseItem)) {
      const id = event.currentTarget.attributes['data-id'].value
      const courseGroupId = event.currentTarget.attributes['course-group-id'].value
      setdeleteCourseItem({ id, courseGroupId })
    } else {
      setdeleteCourseItem({})
    }
  }
  const onCourseItemDeleteConfirm = function () {
    removeCourseGroupItem(deleteCourseItem, { callback: courseItemDeletePopup })
  }

  const ActionButton = (item, courseGroupRow) => {
    return (
      <Box whiteSpace="nowrap">
        <Tooltip title={t('editCourse')}>
          <IconButton
            aria-label={t('editCourse')}
            onClick={onEditCourseItem}
            edge="start"
            data-id={item.id}
            color="primary"
          >
            <Edit2 width="16px" height="16px" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('remove')}>
          <IconButton
            aria-label={t('remove')}
            edge="end"
            data-id={item.id}
            course-group-id={courseGroupRow.id}
            color="secondary"
            onClick={courseItemDeletePopup}
          >
            <X width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }

  return (
    <>
      {isEmpty(addCourseModal) ? (
        <Box py={2} px={3}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} sm="auto">
              <Typography component="" align="left" variant="body2" tabIndex={0}>
                <Box component="span" fontWeight="600" fontSize="16px">
                  {t('courseGroups')}
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
                  sm: 'flex-start',
                  md: 'space-between',
                }}
              >
                <Button
                  className="text-transform-none"
                  size="large"
                  variant="contained"
                  disableElevation
                  color="primary"
                  onClick={onOpen}
                >
                  {t('addCourseGroup')}
                </Button>
              </Box>
            </Grid>
          </Grid>
          {courseGroupList.map((row) => (
            <Accordion
              expanded={courseGroupId === row.id}
              onChange={handleCourseGroupToggle(row.id)}
              elevation={0}
              rounded
              key={row.id}
              defaultExpanded
              className="course-accordion"
            >
              <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
              >
                <Box flexGrow={{ xs: 0, sm: 1 }}>
                  <AccordionSummary
                    aria-controls="panel1_content"
                    id="panel1_header"
                    aria-expanded={true}
                    aria-label={'expandable course group'}
                  >
                    <Grid spacing={2} container alignItems="center">
                      <Grid item xs={12} sm={4} xl="auto">
                        <Box
                          minWidth={{ xs: '100%', sm: '250px' }}
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-start"
                        >
                          <ArrowRightIcon
                            className="caret-icon"
                            fontSize="small"
                            color="textPrimary"
                          />

                          <Typography
                            component=""
                            align="left"
                            variant="body2"
                            color="textPrimary"
                            className="text-ellipsis"
                            tabIndex={0}
                          >
                            <Box ml={1} component="span" fontWeight="600" fontSize="16px">
                              {row.cg_course_group_name}
                            </Box>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4} xl="auto">
                        <Box
                          minWidth={{ xs: '100%', lg: '250px' }}
                          display="flex"
                          alignItems={{ xs: 'flex-start', lg: 'center' }}
                          justifyContent="flex-start"
                          flexDirection={{ xs: 'column', lg: 'row' }}
                        >
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
                          </Typography>
                          <Typography
                            component="span"
                            align="left"
                            variant="body2"
                            color="textPrimary"
                            tabIndex={0}
                          >
                            <Box
                              width="100%"
                              className="text-ellipsis"
                              ml={{ xs: 0, lg: 1 }}
                              fontSize="16px"
                            >
                              {t(`reference:${row.cg_rule_type}`)}
                            </Box>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={2} xl="auto">
                        <Box
                          minWidth={{ xs: '100%', md: '250px' }}
                          display="flex"
                          alignItems={{ xs: 'flex-start', md: 'center' }}
                          justifyContent="flex-start"
                          flexDirection={{ xs: 'column', md: 'row' }}
                        >
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
                          </Typography>
                          <Typography
                            component="span"
                            align="left"
                            variant="body2"
                            color="textPrimary"
                            className="text-ellipsis"
                            tabIndex={0}
                          >
                            <Box ml={{ xs: 0, md: 1 }} fontSize="16px">
                              {t(`reference:${row.cg_rule_value}`)}
                            </Box>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={2} md="auto">
                        <Box component="span" fontSize={14} fontWeight={500} tabIndex={0}>
                          <span style={visuallyHidden}>({t('status')})</span>
                          {row.cg_is_active ? (
                            <Box
                              whiteSpace="nowrap"
                              component="span"
                              className="label-green"
                              id={row.id}
                            >
                              {t('active')}
                            </Box>
                          ) : (
                            <Box
                              whiteSpace="nowrap"
                              component="span"
                              className="label-red"
                              id={row.id}
                            >
                              {t('inActive')}
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                </Box>
                <Box px={3} display="flex">
                  <Tooltip title={t('addCourse')}>
                    <IconButton
                      onClick={toggleAddCourseModal}
                      data-id={row.id}
                      edge="start"
                      color="primary"
                      aria-label={t('addCourse')}
                    >
                      <Plus width="16px" height="16px" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('editCourseGroup')}>
                    <IconButton
                      onClick={onEdit}
                      data-id={row.id}
                      color="primary"
                      aria-label={t('editCourseGroup')}
                    >
                      <Edit2 width="16px" height="16px" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('archive')}>
                    <IconButton
                      edge="end"
                      color="secondary"
                      onClick={toggleDeletePopup}
                      data-id={row.id}
                      aria-label={t('archive')}
                    >
                      <Archive width="16px" height="16px" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <AccordionDetails>
                <CustomTable
                  noDataMessage={t('dataNotFound')}
                  order={order}
                  orderBy={orderBy}
                  setOrder={setOrder}
                  setOrderBy={setOrderBy}
                  data={DetailsData}
                  headCells={allHeadCells}
                  dataParameter={dataParameter}
                  isSelection={false}
                >
                  {(row.items || []).map((item) => {
                    return (
                      <TableRow hover data-id={item.id} key={item.id}>
                        <TableCell tabIndex={0}>{item?.cgi_course?.cr_number || ''}</TableCell>
                        <TableCell tabIndex={0}>{item?.cgi_course?.cr_name || ''}</TableCell>
                        <TableCell tabIndex={0}>
                          {item?.cgi_course?.cr_subject?.sub_name || ''}
                        </TableCell>
                        <TableCell tabIndex={0}>{item.cgi_is_elective ? 'Yes' : 'No'}</TableCell>
                        <TableCell tabIndex={0}>{t(`reference:${item.cgi_type}`)}</TableCell>
                        <TableCell className={classes.verticalSpaceRemove}>
                          {ActionButton(item, row)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </CustomTable>
              </AccordionDetails>
              <ConfirmBox
                maxWidth="xs"
                open={!isEmpty(deleteCourseItem)}
                close={courseItemDeletePopup}
                onConfirm={onCourseItemDeleteConfirm}
                defaultProps={{
                  message: 'removeConfirmation',
                  buttonText: 'remove',
                }}
              />
            </Accordion>
          ))}
        </Box>
      ) : (
        <Box py={2} px={3}>
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
              disableElevation
              color="primary"
              onClick={toggleAddCourseModal}
            >
              <ChevronLeft />
            </IconButton>
            <Typography tabIndex={0} component="h5" variant="subtitle1" color="textPrimary">
              <Box component="span" fontWeight="600">
                {addCourseModal.cg_course_group_name}
              </Box>
            </Typography>
          </Box>

          <Box my={3}>
            <Grid spacing={2} container alignItems="flex-end">
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                  <Box component="span" fontWeight="600">
                    {t('fields:searchCourses')}
                  </Box>
                </Typography>
                <TextField
                  className="custom-input-field"
                  id="q"
                  name="q"
                  variant="outlined"
                  value={courseFilter.q}
                  onChange={setCourseFilterValue}
                  fullWidth
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title={t('fields:searchCoursesHelp')} placement="top">
                          <HelpCircle className="help-icon" />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  label={
                    <span style={visuallyHidden}>
                      ({t('fields:searchCourses')}) ({t('fields:searchCoursesHelp')})
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                  <Box component="span" fontWeight="600">
                    {t('fields:selectSubject')}
                  </Box>
                </Typography>
                <TextField
                  className={classes.selectIcon + ' custom-input-field'}
                  id="subjectId"
                  name="subjectId"
                  variant="outlined"
                  fullWidth
                  value={courseFilter.subjectId}
                  onChange={setCourseFilterValue}
                  size="small"
                  select
                  pr={0}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title={t('fields:selectSubjectHelp')} placement="top">
                          <HelpCircle className="help-icon" />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  label={
                    <span style={visuallyHidden}>
                      ({t('fields:selectSubject')}) ({t('fields:selectSubjectHelp')})
                    </span>
                  }
                >
                  {subjects.map((subject) => (
                    <MenuItem key={subject.sub_id} value={subject.sub_id}>
                      {subject.sub_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm="auto">
                <Box
                  mt={{ xs: 0, sm: 0, lg: 3 }}
                  display="flex"
                  justifyContent={{
                    xs: 'flex-start',
                    sm: 'flex-end',
                    lg: 'flex-end',
                  }}
                  alignItems="center"
                >
                  <Box mr={2}>
                    <Button
                      className="text-transform-none"
                      disableElevation
                      variant="contained"
                      fullWidth
                      color="primary"
                      size="large"
                      onClick={searchCourses}
                    >
                      {t('search')}
                    </Button>
                  </Box>
                  <Button
                    className="text-transform-none"
                    disableElevation
                    variant="text"
                    color="primary"
                    onClick={resetCourseFilter}
                  >
                    {t('reset')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {courses.map((course) => (
            <Accordion
              key={course.id}
              expanded={courseId === course.id}
              onChange={handleCourseToggle(course.id)}
              elevation={0}
              rounded
              className="course-accordion"
            >
              <AccordionSummary
                aria-controls="course1_content"
                id="course1_header"
                aria-expanded={false}
              >
                <Grid spacing={3} container alignItems="center">
                  <Grid item xs={6} sm="auto">
                    <Box width={48} height={48} borderRadius={8} className="image-container">
                      <img
                        tabIndex={0}
                        src={createObjectURLSecure(course.cr_logo, CourseImg)}
                        alt="course image"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3} md={3} xl="auto">
                    <Box minWidth="150px">
                      <Typography
                        component="h6"
                        align="left"
                        variant="h6"
                        color="textSecondary"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500" fontSize="14px">
                          {t('courseCode')}
                        </Box>
                      </Typography>
                      <Typography component="h6" color="textPrimary" tabIndex={0}>
                        <Box
                          component="span"
                          fontWeight="600"
                          fontSize="14px"
                          className="word-break"
                        >
                          {course.cr_number}
                        </Box>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3} md={3} xl="auto">
                    <Box minWidth="150px">
                      <Typography
                        component="h6"
                        align="left"
                        variant="h6"
                        color="textSecondary"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500" fontSize="14px">
                          {t('courseSubject')}
                        </Box>
                      </Typography>
                      <Typography component="h6" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight="600" fontSize="14px">
                          {course?.cr_subject?.sub_name}
                        </Box>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3} md={3} xl="auto">
                    <Box>
                      <Typography
                        component="h6"
                        align="left"
                        variant="h6"
                        color="textSecondary"
                        tabIndex={0}
                      >
                        <Box component="span" fontWeight="500" fontSize="14px">
                          {t('courseName')}
                        </Box>
                      </Typography>
                      <Typography component="h6" color="textPrimary" tabIndex={0}>
                        <Box component="span" fontWeight="600" fontSize="14px">
                          {course.cr_name}
                        </Box>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionSummary>

              <AccordionDetails>
                <AssignCourse
                  courseGroupId={addCourseModal.id}
                  course={course}
                  addCourseGroupItem={addCourseGroupItem}
                  onClose={toggleAddCourseModal}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
      <AddCourseGroup
        open={!isEmpty(actionType)}
        onClose={onClose}
        actionType={actionType}
        setActionType={setActionType}
        addUpdateCourseGroup={addUpdateCourseGroup}
        masterData={masterData}
        details={courseGroupDetail}
      />
      <EditCourse
        onClose={toggleEditCourse}
        open={editCourse}
        details={courseGroupItem}
        masterData={masterData}
        editCourseGroupItem={editCourseGroupItem}
      />
      <ConfirmBox
        maxWidth="xs"
        open={!isEmpty(deleteItem)}
        close={toggleDeletePopup}
        onConfirm={onDeleteConfirm}
        defaultProps={{ message: 'archiveConfirmation', buttonText: 'archive' }}
      />
    </>
  )
}
Courses.propTypes = {
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  school: PropTypes.object,
  addUpdateCourseGroup: PropTypes.func,
  courseGroupList: PropTypes.array,
  masterData: PropTypes.object,
  removeCourseGroup: PropTypes.func,
  actionType: PropTypes.func,
  setActionType: PropTypes.func,
  getCourseGroupDetailById: PropTypes.func,
  courseGroupDetail: PropTypes.object,
  getCourseGroupItems: PropTypes.func,
  subjects: PropTypes.array,
  getCourseGroupItemById: PropTypes.func,
  courseGroupItem: PropTypes.array,
  removeCourseGroupItem: PropTypes.func,
  editCourseGroupItem: PropTypes.func,
  courses: PropTypes.array,
  searchCourses: PropTypes.func,
  addCourseGroupItem: PropTypes.func,
  courseFilter: PropTypes.object,
  setCourseFilterValue: PropTypes.func,
  resetCourseFilter: PropTypes.func,
  setCourses: PropTypes.func,
}
Courses.defaultProps = {
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  school: {},
  addUpdateCourseGroup: () => {},
  courseGroupList: [],
  masterData: {},
  removeCourseGroup: () => {},
  actionType: () => {},
  setActionType: () => {},
  getCourseGroupDetailById: () => {},
  courseGroupDetail: {},
  getCourseGroupItems: () => {},
  subjects: [],
  getCourseGroupItemById: () => {},
  courseGroupItem: [],
  removeCourseGroupItem: () => {},
  editCourseGroupItem: () => {},
  courses: [],
  searchCourses: () => {},
  addCourseGroupItem: () => {},
  courseFilter: {},
  setCourseFilterValue: () => {},
  resetCourseFilter: () => {},
  setCourses: () => {},
}
export default Courses
