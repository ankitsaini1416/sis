import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { messageAction } from '../../actions/app.action'
import {
  addCourseGroupCall,
  addCourseGroupItemCall,
  editCourseGroupCall,
  editCourseGroupItemCall,
  fetchCourseGroupById,
  fetchCourseGroupCall,
  fetchCourseGroupItemById,
  fetchCourseGroupItemCall,
  fetchCoursesCall,
  removeCourseGroupCall,
  removeCourseGroupItemCall,
} from '../../actions/courses.action'
import { headerAction } from '../../actions/header.action'
import {
  addProgramFee,
  createLinksLibrary,
  createTranscripts,
  deleteProgramFee,
  editProgramCall,
  editProgramFee,
  fetchProgramCategory,
  fetchProgramFeeById,
  fetchProgramsDetail,
  fetchTranscript,
  uploadProgramLogoCall,
} from '../../actions/program.action'
import { fetchSchoolByIdCall } from '../../actions/schools.action'
import { fetchSubjectsCall } from '../../actions/subject.action'
import ProgramDetail from '../../components/sis/programs/programDetail/ProgramDetail'
import { MESSAGE_SEVERITIES } from '../../helpers/constants'
import { selectMasterData } from '../../helpers/selectors'
import { get, isEmpty } from '../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from '../../helpers/validator'

function ProgramsDetailContainer({
  headerAction,
  fetchProgramsDetail,
  editProgramCall,
  createLinksLibrary,
  fetchProgramCategory,
  uploadProgramLogoCall,
  deleteProgramFee,
  addProgramFee,
  editProgramFee,
  fetchProgramFeeById,
  fetchTranscript,
  createTranscripts,
  addCourseGroupCall,
  fetchCourseGroupCall,
  masterData,
  removeCourseGroupCall,
  fetchCourseGroupById,
  editCourseGroupCall,
  fetchCourseGroupItemCall,
  fetchSubjectsCall,
  fetchCourseGroupItemById,
  removeCourseGroupItemCall,
  editCourseGroupItemCall,
  fetchCoursesCall,
  addCourseGroupItemCall,
  messageAction,
}) {
  const { programId } = useParams()
  const deleteIds = useRef([])
  const history = useHistory()
  const [details, setDetails] = React.useState({})
  const [programsCategory, setProgramsCategory] = React.useState([])

  const [programfeeDetail, setProgramfeeDetail] = React.useState({})
  const [order, setOrder] = React.useState('ASC')
  const [orderBy, setOrderBy] = React.useState('fee_id')
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false)
  const [actionType, setActionType] = React.useState('')
  const [transcripts, setTranscripts] = React.useState([])
  const [courseGroupList, setCourseGroupList] = React.useState([])
  const [courseGroupDetail, setCourseGroupDetail] = React.useState({})
  const [courseGroupItem, setCourseGroupItem] = React.useState([])
  const [subjects, setSubjects] = React.useState([])
  const [courses, setCourses] = React.useState([])
  const [courseFilter, setCourseFilter] = React.useState({
    q: '',
    subjectId: '',
  })

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const setCourseFilterValue = function (e) {
    setCourseFilter((lastState) => ({
      ...lastState,
      [e.target.name]: e.target.value,
    }))
  }

  const resetCourseFilter = function () {
    setCourseFilter({
      q: '',
      subjectId: '',
    })
  }

  const fetchProgramDetail = function () {
    fetchProgramsDetail(programId, (records) => {
      setDetails(records)
      fetchTranscript(records?.pgm_school?.sch_id, (data) => {
        setTranscripts(data)
      })
      fetchSubjectsCall(
        {
          q: '',
          current_page: 1,
          per_page: 1000,
          isActive: 'active',
          schoolId: records?.pgm_school?.sch_id,
        },
        ({ content }) => {
          setSubjects(content)
        }
      )
    })
  }

  const editProgram = (id, values, { setErrors }) => {
    editProgramCall(
      id,
      values,
      () => {
        history.goBack()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorEditDistrictGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorEditDistrictGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  const editLogo = (file) => {
    uploadProgramLogoCall(
      details.pgm_id,
      file,
      () => {
        fetchProgramDetail()
      },
      (err) => {
        const error = get(err, 'response.data.field_errors', {})
        const splitted = error?.pgm_logo[0].split(':')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(splitted[0], 'error:editLogo'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:editLogo',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  const addLinkLibrary = (values, setErrors) => {
    createLinksLibrary(
      details.pgm_id,
      values,
      () => {
        fetchProgramDetail()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddLibrary'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddLibrary',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const getProgramsCategory = function (schoolId) {
    const pageDetails = {
      q: 'search',
      per_page: 10,
      page: 1,
    }
    fetchProgramCategory(schoolId, { ...pageDetails }, (records) => {
      setProgramsCategory(records)
    })
  }

  const getProgramFeeDetailById = function (id) {
    fetchProgramFeeById(id, (data) => {
      setProgramfeeDetail(data)
    })
  }

  const toggleDeletePopup = function (event) {
    if (!openDeletePopup) {
      const dataIds = Array.isArray(event)
        ? [...event]
        : [event.currentTarget.attributes['data-id'].value]
      deleteIds.current = dataIds
      setOpenDeletePopup(true)
    } else {
      deleteIds.current = []
      setOpenDeletePopup(false)
    }
  }
  const deleteCertificateItems = () => {
    addTranscripts({ remove: [{ pt_id: deleteIds.current }] })
    toggleDeletePopup()
  }
  const deleteLinkItems = () => {
    addLinkLibrary({ remove: [{ pl_id: deleteIds.current }] })
    toggleDeletePopup()
  }
  const deleteItems = () => {
    deleteProgramFee(
      deleteIds.current,
      () => {
        toggleDeletePopup()
        fetchProgramDetail()
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:deleteFee'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:deleteFee',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const addTranscripts = (values, setErrors) => {
    createTranscripts(
      details.pgm_id,
      values,
      () => {
        fetchProgramDetail()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorUpdateTranscripts'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorUpdateTranscripts',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const addProgramFees = function (values, { setErrors, callback }) {
    if (actionType === 'edit') {
      editProgramFee(
        programId,
        programfeeDetail.fee_id,
        values,
        () => {
          callback()
          fetchProgramDetail()
        },
        (err) => {
          const errors = get(err, 'response.data.field_errors', {})
          const error = get(err, 'response.data.code', '')

          if (!isEmpty(errors)) {
            setErrors(mapFieldErrors(errors))
          } else if (!isEmpty(error)) {
            messageAction({
              subTitle: mapGeneralErrors(error, 'error:errorUpdateProgramFee'),
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          } else {
            messageAction({
              subTitle: 'error:errorUpdateProgramFee',
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          }
        }
      )
    } else
      addProgramFee(
        programId,
        values,
        () => {
          callback()
          fetchProgramDetail()
        },
        (err) => {
          const errors = get(err, 'response.data.field_errors', {})
          const error = get(err, 'response.data.code', '')
          if (!isEmpty(errors)) {
            setErrors(mapFieldErrors(errors))
          } else if (!isEmpty(error)) {
            messageAction({
              subTitle: mapGeneralErrors(error, 'error:errorAddProgramFee'),
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          } else {
            messageAction({
              subTitle: 'error:errorAddProgramFee',
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          }
        }
      )
  }

  const getCourseGroup = function () {
    fetchCourseGroupCall(programId, { q: '' }, (records) => {
      setCourseGroupList(records)
    })
  }

  const addUpdateCourseGroup = function (values, { setErrors }) {
    if (actionType === 'edit') {
      editCourseGroupCall(
        programId,
        courseGroupDetail.cg_id,
        values,
        () => {
          getCourseGroup()
        },
        (err) => {
          const errors = get(err, 'response.data.field_errors', {})
          const error = get(err, 'response.data.code', '')

          if (!isEmpty(errors)) {
            setErrors(mapFieldErrors(errors))
          } else if (!isEmpty(error)) {
            messageAction({
              subTitle: mapGeneralErrors(error, 'error:errorUpdateCourseGroup'),
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          } else {
            messageAction({
              subTitle: 'error:errorUpdateCourseGroup',
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          }
        }
      )
    } else
      addCourseGroupCall(
        programId,
        values,
        () => {
          getCourseGroup()
        },
        (err) => {
          const errors = get(err, 'response.data.field_errors', {})
          const error = get(err, 'response.data.code', '')
          if (!isEmpty(errors)) {
            setErrors(mapFieldErrors(errors))
          } else if (!isEmpty(error)) {
            messageAction({
              subTitle: mapGeneralErrors(error, 'error:errorAddCourseGroup'),
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          } else {
            messageAction({
              subTitle: 'error:errorAddCourseGroup',
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          }
        }
      )
  }
  const getCourseGroupDetailById = function (id) {
    fetchCourseGroupById(id, (data) => {
      setCourseGroupDetail(data)
    })
  }
  const getCourseGroupItemById = function (id) {
    fetchCourseGroupItemById(id, (data) => {
      setCourseGroupItem(data)
    })
  }

  const removeCourseGroup = (id, { callback }) => {
    removeCourseGroupCall(
      id,
      () => {
        callback()
        getCourseGroup()
      },
      (err) => {
        callback()
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorCourseGroupDelete'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorCourseGroupDelete',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const removeCourseGroupItem = function ({ id, courseGroupId }, { callback }) {
    removeCourseGroupItemCall(id, () => {
      getCourseGroupItems(courseGroupId)
      callback()
    })
  }
  const getCourseGroupItems = function (courseGroupId) {
    fetchCourseGroupItemCall(courseGroupId, (records) => {
      setCourseGroupList(
        courseGroupList.map((item) => {
          if (item.id.toString() === courseGroupId.toString()) {
            return {
              ...item,
              items: records,
            }
          }
          return item
        })
      )
    })
  }
  const editCourseGroupItem = (id, values, { setErrors }) => {
    editCourseGroupItemCall(
      id,
      values,
      () => {
        getCourseGroupItems(values.cgi_course_group_id)
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorEditCourseGroupItem'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorEditCourseGroupItem',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const addCourseGroupItem = function (values, { setErrors }) {
    addCourseGroupItemCall(
      values,
      () => {
        // callback && callback()
        getCourseGroupItems(values.cgi_course_group_id)
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddCourseGroupItem'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddCourseGroupItem',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const searchCourses = () => {
    fetchCoursesCall(
      {
        q: courseFilter.q,
        current_page: 1,
        per_page: 1000,
        sort_by: 'cr_name',
        sort_order: 'asc',
        subjectId: courseFilter.subjectId,
        isActive: 'active',
        schoolId: details.pgm_school_id,
      },
      (records) => {
        setCourses(get(records, 'content', []))
      },
      null,
      false
    )
  }
  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'allPrograms',
      activeParent: 'programs',
    }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    if (value === 3) {
      getCourseGroup()
    }
  }, [value])

  React.useEffect(() => {
    if (value === 0) {
      fetchProgramDetail()
    }
  }, [value])
  /**
   * renders JSX of Programs Detail container
   * @param ProgramsDetail
   */
  return (
    <ProgramDetail
      details={details}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      editProgram={editProgram}
      addLinkLibrary={addLinkLibrary}
      programsCategory={programsCategory}
      getProgramsCategory={getProgramsCategory}
      editLogo={editLogo}
      deleteItems={deleteItems}
      toggleDeletePopup={toggleDeletePopup}
      openDeletePopup={openDeletePopup}
      addProgramFees={addProgramFees}
      actionType={actionType}
      setActionType={setActionType}
      getProgramFeeDetailById={getProgramFeeDetailById}
      programfeeDetail={programfeeDetail}
      addTranscripts={addTranscripts}
      transcripts={transcripts}
      addUpdateCourseGroup={addUpdateCourseGroup}
      courseGroupList={courseGroupList}
      masterData={masterData}
      removeCourseGroup={removeCourseGroup}
      getCourseGroupDetailById={getCourseGroupDetailById}
      courseGroupDetail={courseGroupDetail}
      getCourseGroupItems={getCourseGroupItems}
      subjects={subjects}
      getCourseGroupItemById={getCourseGroupItemById}
      courseGroupItem={courseGroupItem}
      removeCourseGroupItem={removeCourseGroupItem}
      editCourseGroupItem={editCourseGroupItem}
      courses={courses}
      searchCourses={searchCourses}
      addCourseGroupItem={addCourseGroupItem}
      courseFilter={courseFilter}
      setCourseFilterValue={setCourseFilterValue}
      resetCourseFilter={resetCourseFilter}
      setCourses={setCourses}
      deleteCertificateItems={deleteCertificateItems}
      deleteLinkItems={deleteLinkItems}
      handleChange={handleChange}
      value={value}
    />
  )
}

ProgramsDetailContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchProgramsDetail: PropTypes.func,
  fetchSchoolByIdCall: PropTypes.func,
  editProgramCall: PropTypes.func,
  fetchProgramFeeDetailById: PropTypes.func,
  createLinksLibrary: PropTypes.func,
  fetchProgramCategory: PropTypes.func,
  uploadProgramLogoCall: PropTypes.func,
  deleteProgramFee: PropTypes.func,
  addProgramFee: PropTypes.func,
  editProgramFee: PropTypes.func,
  fetchProgramFeeById: PropTypes.func,
  fetchTranscript: PropTypes.func,
  createTranscripts: PropTypes.func,
  addCourseGroupCall: PropTypes.func,
  fetchCourseGroupCall: PropTypes.func,
  masterData: PropTypes.object,
  removeCourseGroupCall: PropTypes.func,
  fetchCourseGroupById: PropTypes.func,
  editCourseGroupCall: PropTypes.func,
  fetchCourseGroupItemCall: PropTypes.func,
  fetchSubjectsCall: PropTypes.func,
  fetchCourseGroupItemById: PropTypes.func,
  removeCourseGroupItemCall: PropTypes.func,
  editCourseGroupItemCall: PropTypes.func,
  fetchCoursesCall: PropTypes.func,
  addCourseGroupItemCall: PropTypes.func,
  messageAction: PropTypes.func,
}

ProgramsDetailContainer.defaultProps = {
  headerAction: () => {},
  fetchProgramsDetail: () => {},
  fetchSchoolByIdCall: () => {},
  editProgramCall: () => {},
  fetchProgramFeeDetailById: () => {},
  createLinksLibrary: () => {},
  fetchProgramCategory: () => {},
  uploadProgramLogoCall: () => {},
  deleteProgramFee: () => {},
  addProgramFee: () => {},
  editProgramFee: () => {},
  fetchProgramFeeById: () => {},
  fetchTranscript: () => {},
  createTranscripts: () => {},
  addCourseGroupCall: () => {},
  fetchCourseGroupCall: () => {},
  masterData: {},
  removeCourseGroupCall: () => {},
  fetchCourseGroupById: () => {},
  editCourseGroupCall: () => {},
  fetchCourseGroupItemCall: () => {},
  fetchSubjectsCall: () => {},
  fetchCourseGroupItemById: () => {},
  removeCourseGroupItemCall: () => {},
  editCourseGroupItemCall: () => {},
  fetchCoursesCall: () => {},
  addCourseGroupItemCall: () => {},
  messageAction: () => {},
}
const mapStateToProps = (state) => ({
  masterData: selectMasterData(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchProgramsDetail,
  fetchSchoolByIdCall,
  editProgramCall,
  createLinksLibrary,
  fetchProgramCategory,
  uploadProgramLogoCall,
  deleteProgramFee,
  addProgramFee,
  editProgramFee,
  fetchProgramFeeById,
  fetchTranscript,
  createTranscripts,
  addCourseGroupCall,
  fetchCourseGroupCall,
  removeCourseGroupCall,
  fetchCourseGroupById,
  editCourseGroupCall,
  fetchCourseGroupItemCall,
  fetchSubjectsCall,
  fetchCourseGroupItemById,
  removeCourseGroupItemCall,
  editCourseGroupItemCall,
  fetchCoursesCall,
  addCourseGroupItemCall,
  messageAction,
})(ProgramsDetailContainer)
