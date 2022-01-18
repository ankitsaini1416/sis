import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { v4 as uuid } from 'uuid'

import { fetchUserByIdCall } from '../../actions/agm2.action'
import { messageAction, uiStateAction } from '../../actions/app.action'
import { userByEmailCall } from '../../actions/application.action'
import { fetchCourseGroupCall, fetchCourseGroupItemCall } from '../../actions/courses.action'
import {
  addhWalletPointsCall,
  addStudentNote,
  assignSuccessCoachCall,
  editAssignCourseCall,
  editCourseDetailsCall,
  editEnrollmentStatusCall,
  editStudentNote,
  fetchDownloadTranscript,
  fetchEnrollmentCourse,
  fetchEnrollmentCourseById,
  fetchEnrollmentDetailById,
  fetchStudentNoteDetailById,
  fetchStudentNotesList,
  fetchSuccessCoachCall,
  fetchSuccessCoachUsers,
  fetchTransactionCall,
  fetchTransactionDetailById,
  fetchWalletPoints,
  fetchWalletTransaction,
  removeSuccessCoachCall,
} from '../../actions/enrollment.action'
import { headerAction } from '../../actions/header.action'
import EnrollmentsDetails from '../../components/sis/enrollment/enrollmentDetail/EnrollmentDetail'
import { TablePageData } from '../../data/TablePageData'
import { MESSAGE_SEVERITIES, RULE_TYPES } from '../../helpers/constants'
import { selectMasterData, selectUiState } from '../../helpers/selectors'
import {
  get,
  handleChangePage,
  isEmpty,
  isEnter,
  makeFakeCurrentTargetEvent,
} from '../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from '../../helpers/validator'

const modifyTransactions = function (collection = []) {
  const modified = {}
  collection.forEach((transaction) => {
    const date = moment(transaction.created_at)
    const dateStr = `${date.format('MMMM')} ${date.format('YYYY')}`
    if (!modified[dateStr]) {
      modified[dateStr] = []
    }
    if (!modified[dateStr].find((item) => item.id === transaction.id)) {
      modified[dateStr].push(transaction)
    }
  })
  return modified
}
function EnrollmentDetailContainer({
  headerAction,
  fetchEnrollmentDetailById,
  fetchTransactionCall,
  fetchTransactionDetailById,
  uiState,
  uiStateAction,
  fetchStudentNotesList,
  fetchStudentNoteDetailById,
  editStudentNote,
  addStudentNote,
  fetchSuccessCoachUsers,
  fetchSuccessCoachCall,
  assignSuccessCoachCall,
  removeSuccessCoachCall,
  masterData,
  userByEmailCall,
  editAssignCourseCall,
  fetchEnrollmentCourse,
  fetchEnrollmentCourseById,
  fetchCourseGroupCall,
  fetchCourseGroupItemCall,
  messageAction,
  addhWalletPointsCall,
  fetchWalletPoints,
  fetchWalletTransaction,
  editEnrollmentStatusCall,
  editCourseDetailsCall,
  fetchDownloadTranscript,
  fetchUserByIdCall,
}) {
  const { enrId } = useParams()
  const history = useHistory()
  const { showAddNote } = get(history, 'location.state', {})

  const [orderTransaction, setOrderTransaction] = React.useState('asc')
  const [orderByTransaction, setOrderByTransaction] = React.useState('updated_at')
  const [orderStudentNote, setOrderStudentNote] = React.useState('desc')
  const [orderByStudentNote, setOrderByStudentNote] = React.useState('updated_at')
  const [pageDetails, setPageDetails] = React.useState({})
  const [walletPageDetails, setWalletPageDetails] = React.useState({})
  const [enrollmentDetail, setEnrollmentDetail] = React.useState({})
  const [userDetail, setUserDetails] = React.useState({})
  const [transactionList, setTransactionList] = React.useState([])
  const [transactionDetail, setTransactionDetail] = React.useState({})
  const [studentNoteList, setStudentNoteList] = React.useState([])
  const [studentNoteDetail, setStudentNoteDetail] = React.useState({})
  const [successCoach, setSuccessCoach] = React.useState({})
  const [actionType, setActionType] = React.useState(showAddNote ? 'add' : '')
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false)
  const [allCoaches, setAllCoaches] = React.useState([])
  const [enrollmentCourses, setEnrollmentCourses] = React.useState([])
  const [courseItem, setCourseItem] = React.useState({})
  const [programCourseGroupList, setProgramCourseGroupList] = React.useState([])
  const [selectedProgramGroupDetails, setSelectedProgramGroupDetails] = React.useState({})
  const [page, setPage] = React.useState(1)
  const [searchText, setSearchText] = React.useState('')
  const [showSelectedCourse, setShowSelectedCourse] = React.useState(false)
  const initialEnrollCourseItemLoad = React.useRef(false)
  const initialCourseGroupItemLoad = React.useRef(false)
  const [wallet, setWallet] = React.useState({})
  const [transactions, setTransactions] = React.useState({})
  const walletTransactionsList = useRef({})
  const [instructors, setInstructors] = React.useState({})

  const transactionFilterState = React.useRef({
    q: '',
    status: '',
    fromDate: '',
    toDate: '',
    renderer: uuid(),
  })

  const courseFilterState = React.useRef({
    q: '',
    status: '',
    renderer: uuid(),
  })

  const studentNoteFilterState = React.useRef({
    q: '',
    type: '',
    fromDate: '',
    toDate: '',
    renderer: uuid(),
  })

  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })

  const onChangeStep = (e, activeTab) => {
    uiStateAction({
      enrollmentDetail: {
        ...uiState.enrollmentDetail,
        activeTab,
      },
    })
  }

  const onChangePageTransaction = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, getTransactionList)
  }
  const onChangePageWallet = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchTransactions)
  }

  const onChangePageStudentNote = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, getStudentNotesList)
  }

  const setTransactionFilterValue = function (e) {
    uiStateAction({
      transactionFilter: {
        ...uiState.transactionFilter,
        [e.target.name]: e.target.value,
      },
    })
  }
  const setCourseFilterValue = function (e) {
    uiStateAction({
      enrollmentCourseFilter: {
        ...uiState.enrollmentCourseFilter,
        [e.target.name]: e.target.value,
      },
    })
  }

  const setStudentNoteFilterValue = function (e) {
    uiStateAction({
      studentNoteFilter: {
        ...uiState.studentNoteFilter,
        [e.target.name]: e.target.value,
      },
    })
  }

  const onTransactionFilterReset = function () {
    onApplyFilterTransaction()
    uiStateAction({
      transactionFilter: transactionFilterState.current,
    })
  }

  const onStudentNoteFilterReset = function () {
    uiStateAction({
      studentNoteFilter: { ...studentNoteFilterState.current, renderer: uuid() },
    })
  }

  const onSearchEnterTransaction = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      getTransactionList()
    }
  }

  const onStudentNoteSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      getStudentNotesList()
    }
  }
  const onApplyFilterTransaction = function () {
    paginationMidState.current_page = 1
    getTransactionList()
  }

  const onApplyFilterStudentNote = function () {
    paginationMidState.current_page = 1
    getStudentNotesList()
  }

  const getEnrollmentDetail = function () {
    fetchEnrollmentDetailById(enrId, (data) => {
      setEnrollmentDetail(data)
      userByEmailCall(data.enr_student?.username, data.enr_school?.sch_school_public_id, (data) => {
        setUserDetails({
          ...data,
        })
      })
    })
  }

  const getTransactionList = function () {
    let filterData = {
      ...uiState.transactionFilter,
      sort_by: orderByTransaction,
      sort_order: orderTransaction,
    }
    fetchTransactionCall(
      enrId,
      { ...pageDetails, ...paginationMidState, ...filterData },
      (data) => {
        const { content, ...paginationDetail } = data
        setTransactionList(content)
        setPageDetails((previousPageData) => {
          return {
            ...previousPageData,
            last_page: paginationDetail.last_page,
            current_page: paginationDetail.current_page,
            from: paginationDetail.from,
            per_page: paginationDetail.per_page,
            to: paginationDetail.to,
            total: paginationDetail.total,
          }
        })
      }
    )
  }

  const getTransactionDetailById = function (id) {
    fetchTransactionDetailById(id, (data) => {
      setTransactionDetail(data)
    })
  }

  const getStudentNotesList = function () {
    let filterData = {
      ...uiState.studentNoteFilter,
      sort_by: orderByStudentNote,
      sort_order: orderStudentNote,
    }
    fetchStudentNotesList(
      enrId,
      { ...pageDetails, ...paginationMidState, ...filterData },
      (data) => {
        const { content, ...paginationDetail } = data
        setStudentNoteList(content)
        setPageDetails((previousPageData) => {
          return {
            ...previousPageData,
            last_page: paginationDetail.last_page,
            current_page: paginationDetail.current_page,
            from: paginationDetail.from,
            per_page: paginationDetail.per_page,
            to: paginationDetail.to,
            total: paginationDetail.total,
          }
        })
      }
    )
  }

  const getStudentNoteDetailById = function (id) {
    fetchStudentNoteDetailById(id, (data) => {
      setStudentNoteDetail(data)
    })
  }

  const addEditStudentNote = function (id, values, { setErrors, callback }) {
    if (actionType === 'edit') {
      editStudentNote(
        enrId,
        id,
        values,
        () => {
          callback()
          getStudentNotesList()
        },
        (err) => {
          const errors = get(err, 'response.data.field_errors', {})
          const error = get(err, 'response.data.code', '')

          if (!isEmpty(errors)) {
            setErrors(mapFieldErrors(errors))
          } else if (!isEmpty(error)) {
            messageAction({
              subTitle: mapGeneralErrors(error, 'error:errorUpdateStudentNote'),
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          } else {
            messageAction({
              subTitle: 'error:errorUpdateStudentNote',
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          }
        }
      )
    } else
      addStudentNote(
        enrId,
        values,
        () => {
          callback()
          getStudentNotesList()
        },
        (err) => {
          const errors = get(err, 'response.data.field_errors', {})
          const error = get(err, 'response.data.code', '')
          if (!isEmpty(errors)) {
            setErrors(mapFieldErrors(errors))
          } else if (!isEmpty(error)) {
            messageAction({
              subTitle: mapGeneralErrors(error, 'error:errorAddStudentNote'),
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          } else {
            messageAction({
              subTitle: 'error:errorAddStudentNote',
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          }
        }
      )
  }

  const fetchUsers = function () {
    const filterData = {
      districtId: enrollmentDetail.enr_school?.sch_district?.dst_district_public_id,
      schoolId: enrollmentDetail.enr_school?.sch_school_public_id,
    }
    fetchSuccessCoachUsers(filterData, (data) => {
      setAllCoaches(data)
    })
  }

  const fetchSuccessCoach = function () {
    fetchSuccessCoachCall(enrId, (data) => {
      fetchUserByIdCall(data.sc_identifier, (succesCoachUser) => {
        setSuccessCoach({ ...data, ...succesCoachUser })
      })
    })
  }

  const assignSuccessCoach = function (values, { setErrors, callback }) {
    assignSuccessCoachCall(
      enrId,
      values,
      () => {
        callback()
        fetchSuccessCoach()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAssignSuccessCoach'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAssignSuccessCoach',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const toggleDeletePopup = function () {
    if (!openDeletePopup) {
      setOpenDeletePopup(true)
    } else {
      setOpenDeletePopup(false)
    }
  }

  const removeSuccessCoach = () => {
    const values = { sc_enrollment_id: enrId }
    removeSuccessCoachCall(values, () => {
      toggleDeletePopup()
      setSuccessCoach([])
    })
  }

  const fetchCourse = function () {
    let filterData = {
      ...uiState.enrollmentCourseFilter,
    }
    fetchEnrollmentCourse(
      enrId,
      { page, perPage: 10, sortBy: '', sortOrder: '', ...filterData },
      (data) => {
        const { content } = data
        setEnrollmentCourses(content)
      }
    )
  }

  const fetchCourseOnScroll = function () {
    setTimeout(() => {
      setPage(page + 1)
      fetchEnrollmentCourse(
        enrId,
        { page: page + 1, perPage: 10, sortBy: '', sortOrder: '', q: '' },
        (data) => {
          const { content } = data
          setEnrollmentCourses(enrollmentCourses.concat(content))
        }
      )
    }, 500)
  }
  const fetchCourseItemOnScroll = function () {
    setTimeout(() => {
      setPage(page + 1)
      fetchCourseGroupCall(enrollmentDetail?.enr_program_id, { q: '' }, (records) => {
        setProgramCourseGroupList(records)
      })
    }, 500)
  }
  const setSearchValue = function (e) {
    setSearchText(e.target.value)
  }
  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      fetchCourse()
    }
  }
  const onApplyFilter = function () {
    fetchCourse()
  }
  const onSearchItemEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      getCourseGroup()
    }
  }
  const onApplyEnrolledFilter = function () {
    getCourseGroup()
  }
  const getProgramsCategory = function (event) {
    const courseId = event?.currentTarget?.attributes['data-id'].value
    const courseGroupId = event?.currentTarget?.attributes['group-id'].value
    const selectedCourse = (
      enrollmentCourses.find((cg_item) => cg_item.cg_id.toString() === courseGroupId.toString())
        ?.cg_enrollment_course || []
    ).find((course_item) => course_item.enc_id.toString() === courseId.toString())
    // if (selectedCourse?.courseItemDetail) {
    //   return setCourseItem(selectedCourse)
    // }
    fetchEnrollmentCourseById(courseId, (data) => {
      initialEnrollCourseItemLoad.current = true
      setEnrollmentCourses(
        enrollmentCourses.map((cg_item) => {
          if (cg_item.cg_id.toString() === courseGroupId.toString()) {
            return {
              ...cg_item,
              cg_enrollment_course: cg_item.cg_enrollment_course.map((course_item) => {
                if (course_item.enc_id.toString() === courseId.toString()) {
                  return {
                    ...course_item,
                    courseItemDetail: data,
                  }
                }
                return course_item
              }),
            }
          }
          return cg_item
        })
      )
      setCourseItem({ ...selectedCourse, ...data, courseItemDetail: data })
    })
  }
  const getCourseGroup = function () {
    const filterData = {
      q: searchText,
    }
    fetchCourseGroupCall(enrollmentDetail?.enr_program_id, { ...filterData }, (records) => {
      setProgramCourseGroupList(records)
    })
  }
  const getCourseGroupItems = function (event) {
    const courseGroupId = event?.currentTarget?.attributes['data-id'].value
    const selectedCourseGroup = programCourseGroupList.find(
      (cg_item) => cg_item.cg_id.toString() === courseGroupId.toString()
    )
    if (selectedCourseGroup?.courseItemList) {
      return setSelectedProgramGroupDetails(selectedCourseGroup)
    }
    fetchCourseGroupItemCall(courseGroupId, (data) => {
      initialCourseGroupItemLoad.current = true
      data.forEach((item) => {
        const courseGroup = enrollmentCourses.find(
          (cg_item) => cg_item.cg_id.toString() === courseGroupId.toString()
        )
        if (!courseGroup) {
          item.isEnrolled = false
        } else {
          const targetCourse = (courseGroup.cg_enrollment_course || []).find(
            (enr_course_item) =>
              enr_course_item?.enc_course_group_item?.cgi_course?.cr_id.toString() ===
              item?.cgi_course?.cr_id.toString()
          )
          item.isEnrolled = !isEmpty(targetCourse)
        }
      })
      setProgramCourseGroupList(
        programCourseGroupList.map((cg_item) => {
          if (cg_item.cg_id.toString() === courseGroupId.toString()) {
            return {
              ...cg_item,
              courseItemList: data,
            }
          }
          return cg_item
        })
      )
      setSelectedProgramGroupDetails({ ...selectedCourseGroup, ...data, courseItemList: data })
    })
  }

  const toggleCourseCheck = (event) => {
    const courseId = event?.currentTarget?.attributes['data-id'].value
    const courseGroupId = event?.currentTarget?.attributes['group-id'].value
    setProgramCourseGroupList(
      programCourseGroupList.map((cg_item) => {
        if (cg_item.cg_id.toString() === courseGroupId.toString()) {
          const modifiedGroup = {
            ...cg_item,
            courseItemList: cg_item?.courseItemList?.map((cgi_item) => {
              if (cgi_item.cgi_id.toString() === courseId.toString()) {
                return {
                  ...cgi_item,
                  isEnrolled: !cgi_item.isEnrolled,
                }
              }
              return cgi_item
            }),
          }
          setSelectedProgramGroupDetails(modifiedGroup)
          return modifiedGroup
        }
        return cg_item
      })
    )
  }
  const handleRuleValidation = function () {
    if (
      selectedProgramGroupDetails.cg_rule_type === RULE_TYPES.NUMBER_OF_COURSES &&
      selectedProgramGroupDetails.courseItemList.filter(
        (courseItemList) => courseItemList.isEnrolled
      ).length !== parseInt(selectedProgramGroupDetails.cg_rule_value)
    ) {
      messageAction({
        subTitle: 'error:errorCourseGroupRuleNumber',
        severity: MESSAGE_SEVERITIES.ERROR,
        subTitleProps: {
          name: selectedProgramGroupDetails.cg_course_group_name,
          count: selectedProgramGroupDetails.cg_rule_value,
        },
      })
      return false
    } else if (
      selectedProgramGroupDetails.cg_rule_type === RULE_TYPES.CREDIT_VALUE &&
      selectedProgramGroupDetails.courseItemList
        .filter((courseItemList) => courseItemList.isEnrolled)
        .reduce((val, curr) => val + parseFloat(curr.cgi_credits) || 0, 0) !==
        parseFloat(selectedProgramGroupDetails.cg_rule_value)
    ) {
      messageAction({
        subTitle: 'error:errorCourseGroupRuleCredit',
        severity: MESSAGE_SEVERITIES.ERROR,
        subTitleProps: {
          name: selectedProgramGroupDetails.cg_course_group_name,
          count: selectedProgramGroupDetails.cg_rule_value,
        },
      })
      return false
    } else {
      return true
    }
  }
  const updateEnrolledCourse = () => {
    if (!showSelectedCourse) {
      if (handleRuleValidation()) {
        setShowSelectedCourse(true)
        const updatedCourseListAdded = selectedProgramGroupDetails.courseItemList
          .filter((item) => item.isEnrolled)
          .map((item) => item.cgi_id)
        const updatedCourseListRemoved = selectedProgramGroupDetails.courseItemList
          .filter((item) => !item.isEnrolled)
          .map((item) => item.cgi_id)
        let enrolledState = enrollmentCourses.find(
          (cgi_item) => cgi_item.cg_id.toString() === selectedProgramGroupDetails.cg_id.toString()
        )
        if (!enrolledState) {
          return
        }
        enrolledState = enrolledState.cg_enrollment_course.map(
          (cgi_item) => cgi_item.enc_course_group_item.cgi_id
        )
        const add = []
        const remove = []
        updatedCourseListAdded.forEach((item) => {
          if (!enrolledState.includes(item)) {
            add.push(item)
          }
        })
        updatedCourseListRemoved.forEach((item) => {
          if (enrolledState.includes(item)) {
            remove.push(item)
          }
        })

        const payload = {
          student_name: `${enrollmentDetail?.enr_student?.firstName} ${enrollmentDetail?.enr_student?.lastName}`,
          enrollment_id: courseItem?.enc_enrollment_id,
          courses: [
            {
              course_group_id: selectedProgramGroupDetails.cg_id,
              course_group_item_id: {
                add,
                remove,
              },
            },
          ],
        }
        editAssignCourseCall(payload, () => {
          fetchCourse()
        })
      }
    } else {
      setShowSelectedCourse(false)
    }
  }

  const fetchWallet = function () {
    fetchWalletPoints(enrollmentDetail.enr_student?.custid, (data) => {
      setWallet(data)
    })
  }
  const fetchTransactions = function () {
    fetchWalletTransaction(
      { ...walletPageDetails, ...paginationMidState, id: enrollmentDetail.enr_student?.custid },

      (records) => {
        const { data, ...paginationDetail } = get(records, 'records', {})
        walletTransactionsList.current = data
        setTransactions(modifyTransactions(data))
        setWalletPageDetails((previousPageData) => {
          return {
            ...previousPageData,
            last_page: paginationDetail.last_page,
            current_page: paginationDetail.current_page,
            from: paginationDetail.from,
            per_page: paginationDetail.per_page,
            to: paginationDetail.to,
            total: paginationDetail.total,
          }
        })
      }
    )
  }

  const addWalletPoints = function (values, { setErrors, callback }) {
    addhWalletPointsCall(
      enrollmentDetail.enr_student?.custid,
      values,
      () => {
        callback()
        fetchWallet()
        fetchTransactions()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddWalletPoints'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddWalletPoints',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const editEnrollmentStatus = (enr_status) => {
    editEnrollmentStatusCall(
      enrollmentDetail.enr_id,
      enr_status,
      () => {
        setEnrollmentDetail({ ...enrollmentDetail, enr_status })
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:editEnrollmentStatus'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:editEnrollmentStatus',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  const editCourseDetails = (values, { callback }) => {
    editCourseDetailsCall(
      courseItem.enc_id,
      values,
      () => {
        getProgramsCategory(
          makeFakeCurrentTargetEvent({
            'data-id': {
              value: courseItem?.courseItemDetail?.enc_id,
            },
            'group-id': {
              value: courseItem?.courseItemDetail?.enc_course_group?.cg_id,
            },
          })
        )
        getEnrollmentDetail()
        callback && callback()
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:editEnrollmentCourseDetails'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:editEnrollmentCourseDetails',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  function getInstructors() {
    fetchUserByIdCall(
      courseItem?.enc_course_group_item?.cgi_course?.cr_instructor,
      (data) => {
        setInstructors(data)
      },
      () => {}
    )
  }
  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'allenrollments',
      activeParent: 'enrollments',
    }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    if (isEmpty(uiState.transactionFilter)) {
      uiStateAction({ transactionFilter: transactionFilterState.current })
    }
  }, [])

  React.useEffect(() => {
    if (isEmpty(uiState.enrollmentCourseFilter)) {
      uiStateAction({ enrollmentCourseFilter: courseFilterState.current })
    }
  }, [])

  React.useEffect(() => {
    if (isEmpty(uiState.studentNoteFilter)) {
      uiStateAction({ studentNoteFilter: studentNoteFilterState.current })
    }
  }, [])

  React.useEffect(() => {
    getEnrollmentDetail()
  }, [])

  React.useEffect(() => {
    onApplyFilter()
  }, [uiState.enrollmentCourseFilter.renderer, uiState.enrollmentCourseFilter])

  React.useEffect(() => {
    if (uiState.enrollmentDetail.activeTab === 1 && !isEmpty(enrollmentDetail)) {
      fetchCourse()
      getCourseGroup()
    }
    if (uiState.enrollmentDetail.activeTab === 4 && !isEmpty(enrollmentDetail)) {
      fetchUsers()
    }
  }, [uiState.enrollmentDetail.activeTab, enrollmentDetail])

  React.useEffect(() => {
    if (uiState.enrollmentDetail.activeTab === 1 && !isEmpty(courseItem)) {
      getInstructors()
    }
  }, [uiState.enrollmentDetail.activeTab, courseItem])

  React.useEffect(() => {
    if (uiState.enrollmentDetail.activeTab === 2) {
      getTransactionList()
    } else if (!uiState.transactionFilter) {
      onApplyFilterTransaction()
    }
  }, [
    orderTransaction,
    orderByTransaction,
    uiState.transactionFilter.renderer,
    uiState.enrollmentDetail.activeTab,
  ])

  React.useEffect(() => {
    if (uiState.enrollmentDetail.activeTab === 3) {
      fetchWallet()
      fetchTransactions()
    }
  }, [uiState.enrollmentDetail.activeTab])

  React.useEffect(() => {
    if (uiState.enrollmentDetail.activeTab === 5) {
      getStudentNotesList()
    } else if (!uiState.studentNoteFilter) {
      onApplyFilterStudentNote()
    }
  }, [
    orderStudentNote,
    orderByStudentNote,
    uiState.studentNoteFilter.renderer,
    uiState.enrollmentDetail.activeTab,
  ])

  React.useEffect(() => {
    if (!isEmpty(allCoaches)) {
      fetchSuccessCoach()
    }
  }, [allCoaches])

  React.useEffect(() => {
    if (!isEmpty(enrollmentCourses) && !initialEnrollCourseItemLoad.current) {
      getProgramsCategory(
        makeFakeCurrentTargetEvent({
          'data-id': {
            value: enrollmentCourses[0]?.cg_enrollment_course[0].enc_id,
          },
          'group-id': {
            value: enrollmentCourses[0].cg_id,
          },
        })
      )
    }
  }, [enrollmentCourses])
  React.useEffect(() => {
    if (!isEmpty(programCourseGroupList) && !initialCourseGroupItemLoad.current) {
      getCourseGroupItems(
        makeFakeCurrentTargetEvent({
          'data-id': {
            value: programCourseGroupList[0].cg_id,
          },
        })
      )
    }
  }, [programCourseGroupList])

  /**
   * renders JSX of Enrollments Detail container
   * @param EnrollmentsDetail
   */

  return (
    <EnrollmentsDetails
      masterData={masterData}
      orderTransaction={orderTransaction}
      orderByTransaction={orderByTransaction}
      setOrderTransaction={setOrderTransaction}
      setOrderByTransaction={setOrderByTransaction}
      onChangePageTransaction={onChangePageTransaction}
      onChangePageWallet={onChangePageWallet}
      onSearchEnterTransaction={onSearchEnterTransaction}
      onApplyFilterTransaction={onApplyFilterTransaction}
      transactionFilter={uiState.transactionFilter}
      setTransactionFilterValue={setTransactionFilterValue}
      onTransactionFilterReset={onTransactionFilterReset}
      transactionList={transactionList}
      getTransactionDetailById={getTransactionDetailById}
      transactionDetail={transactionDetail}
      pageDetails={pageDetails}
      orderStudentNote={orderStudentNote}
      setOrderStudentNote={setOrderStudentNote}
      orderByStudentNote={orderByStudentNote}
      setOrderByStudentNote={setOrderByStudentNote}
      studentNoteFilter={uiState.studentNoteFilter}
      setStudentNoteFilterValue={setStudentNoteFilterValue}
      onStudentNoteFilterReset={onStudentNoteFilterReset}
      onChangePageStudentNote={onChangePageStudentNote}
      enrollmentDetail={enrollmentDetail}
      onStudentNoteSearchEnter={onStudentNoteSearchEnter}
      onApplyFilterStudentNote={onApplyFilterStudentNote}
      studentNoteList={studentNoteList}
      studentNoteDetail={studentNoteDetail}
      getStudentNoteDetailById={getStudentNoteDetailById}
      addEditStudentNote={addEditStudentNote}
      actionType={actionType}
      setActionType={setActionType}
      allCoaches={allCoaches}
      assignSuccessCoach={assignSuccessCoach}
      successCoach={successCoach}
      removeSuccessCoach={removeSuccessCoach}
      openDeletePopup={openDeletePopup}
      toggleDeletePopup={toggleDeletePopup}
      fetchCourseOnScroll={fetchCourseOnScroll}
      enrollmentCourses={enrollmentCourses}
      getProgramsCategory={getProgramsCategory}
      courseItem={courseItem}
      selectedProgramGroupDetails={selectedProgramGroupDetails}
      searchText={searchText}
      setSearchValue={setSearchValue}
      onSearchEnter={onSearchEnter}
      onSearchItemEnter={onSearchItemEnter}
      programCourseGroupList={programCourseGroupList}
      getCourseGroupItems={getCourseGroupItems}
      updateEnrolledCourse={updateEnrolledCourse}
      toggleCourseCheck={toggleCourseCheck}
      fetchCourseItemOnScroll={fetchCourseItemOnScroll}
      onApplyFilter={onApplyFilter}
      onApplyEnrolledFilter={onApplyEnrolledFilter}
      addWalletPoints={addWalletPoints}
      wallet={wallet}
      transactions={transactions}
      editEnrollmentStatus={editEnrollmentStatus}
      editCourseDetails={editCourseDetails}
      walletTransactionsList={walletTransactionsList.current}
      uiState={uiState}
      onChangeStep={onChangeStep}
      setCourseFilterValue={setCourseFilterValue}
      enrollmentCourseFilter={uiState.enrollmentCourseFilter}
      walletPageDetails={walletPageDetails}
      userDetail={userDetail}
      fetchDownloadTranscript={fetchDownloadTranscript}
      instructors={instructors}
    />
  )
}

EnrollmentDetailContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchEnrollmentDetailById: PropTypes.func,
  fetchTransactionCall: PropTypes.func,
  fetchTransactionDetailById: PropTypes.func,
  uiState: PropTypes.object,
  uiStateAction: PropTypes.func,
  fetchStudentNotesList: PropTypes.func,
  fetchStudentNoteDetailById: PropTypes.func,
  editStudentNote: PropTypes.func,
  addStudentNote: PropTypes.func,
  fetchSuccessCoachUsers: PropTypes.func,
  fetchSuccessCoachCall: PropTypes.func,
  userByEmailCall: PropTypes.func,
  assignSuccessCoachCall: PropTypes.func,
  removeSuccessCoachCall: PropTypes.func,
  masterData: PropTypes.object,
  toggleDeletePopup: PropTypes.func,
  editAssignCourseCall: PropTypes.func,
  fetchEnrollmentCourse: PropTypes.func,
  fetchEnrollmentCourseById: PropTypes.func,
  fetchCourseGroupCall: PropTypes.func,
  fetchCourseGroupItemCall: PropTypes.func,
  messageAction: PropTypes.func,
  addhWalletPointsCall: PropTypes.func,
  fetchWalletPoints: PropTypes.func,
  fetchWalletTransaction: PropTypes.func,
  editEnrollmentStatusCall: PropTypes.func,
  editCourseDetailsCall: PropTypes.func,
  fetchDownloadTranscript: PropTypes.func,
  fetchUserByIdCall: PropTypes.func,
}

EnrollmentDetailContainer.defaultProps = {
  headerAction: () => {},
  fetchEnrollmentDetailById: () => {},
  fetchTransactionCall: () => {},
  fetchTransactionDetailById: () => {},
  uiStateAction: () => {},
  uiState: {},
  fetchStudentNotesList: () => {},
  fetchStudentNoteDetailById: () => {},
  editStudentNote: () => {},
  addStudentNote: () => {},
  fetchSuccessCoachUsers: () => {},
  fetchSuccessCoachCall: () => {},
  userByEmailCall: () => {},
  assignSuccessCoachCall: () => {},
  removeSuccessCoachCall: () => {},
  masterData: {},
  toggleDeletePopup: () => {},
  editAssignCourseCall: () => {},
  fetchEnrollmentCourse: () => {},
  fetchEnrollmentCourseById: () => {},
  fetchCourseGroupCall: () => {},
  fetchCourseGroupItemCall: () => {},
  messageAction: () => {},
  addhWalletPointsCall: () => {},
  fetchWalletPoints: () => {},
  fetchWalletTransaction: () => {},
  editEnrollmentStatusCall: () => {},
  editCourseDetailsCall: () => {},
  fetchDownloadTranscript: () => {},
  fetchUserByIdCall: () => {},
}

const mapStateToProps = (state) => ({
  uiState: selectUiState(state),
  masterData: selectMasterData(state),
})

/**
 *  @exports connect function of redux
 */

export default connect(mapStateToProps, {
  headerAction,
  fetchEnrollmentDetailById,
  fetchTransactionCall,
  addhWalletPointsCall,
  fetchTransactionDetailById,
  uiStateAction,
  fetchStudentNotesList,
  fetchStudentNoteDetailById,
  editStudentNote,
  addStudentNote,
  fetchSuccessCoachUsers,
  fetchSuccessCoachCall,
  userByEmailCall,
  assignSuccessCoachCall,
  removeSuccessCoachCall,
  editAssignCourseCall,
  fetchEnrollmentCourse,
  fetchEnrollmentCourseById,
  fetchCourseGroupCall,
  fetchCourseGroupItemCall,
  messageAction,
  fetchWalletPoints,
  fetchWalletTransaction,
  editEnrollmentStatusCall,
  editCourseDetailsCall,
  fetchDownloadTranscript,
  fetchUserByIdCall,
})(EnrollmentDetailContainer)
