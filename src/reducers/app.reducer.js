import ActionTypes from './../actions/actionTypes'

const initialState = {
  baseURL: '',
}
const uiInitialState = {
  spaceListType: 'grid',
  districtFilter: {},
  schoolFilter: {},
  applicationFilter: {},
  userFilter: {},
  templateFilter: {},
  auditFilter: {},
  transcriptFilter: {},
  programFilter: {},
  subjectFilter: {},
  courseFilter: {},
  enrollmentFilter: {},
  transactionFilter: {},
  studentNoteFilter: {},
  emailFilter: {},
  enrollmentCourseFilter: {},
  enrollmentDetail: { activeTab: 0 },
  rolesFilter: {},
  schoolTab: { activeTab: 0 },
  allStudentFilter: {},
  dailyReportFilter: {},
  inActivityReportFilter: {
    student: '',
    districtId: '',
    schoolId: '',
    registrationStatus: '',
    enrollmentStatus: '',
    registeredDateFrom: '',
    registeredDateTo: '',
    enrolledDateFrom: '',
    enrolledDateTo: '',
    gender: 'All',
    ageFrom: '',
    ageTo: '',
    inactivityDuration: '14',
  },
  graduateReportFilter: {},
  studentReportFilter: {},
  successCoachReportFilter: {},
  instructerReportFilter: {},
}
export const app = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.APP:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}

export const message = (state = {}, action = {}) => {
  if (action.type === ActionTypes.MESSAGE) {
    return action.data
  }
  return state
}

export const uiState = (state = uiInitialState, action = {}) => {
  if (action.type === ActionTypes.UI_STATE) {
    return {
      ...state,
      ...action.data,
    }
  }
  return state
}

export const adminType = (state = '', action = {}) => {
  if (action.type === ActionTypes.ADMIN_TYPE) {
    return action.data
  }
  return state
}

export const org = (state = {}, action = {}) => {
  if (action.type === ActionTypes.ORG) {
    return action.data
  }
  return state
}

export const theme = (state = 'eden', action = {}) => {
  if (action.type === ActionTypes.THEME) {
    return action.data
  }
  return state
}
