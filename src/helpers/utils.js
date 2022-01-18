import * as FileSaver from 'file-saver'
import jwtDecode from 'jwt-decode'
import _cloneDeep from 'lodash/cloneDeep'
import _get from 'lodash/get'
import _intersection from 'lodash/intersection'
import _isEmpty from 'lodash/isEmpty'
import _trim from 'lodash/trim'
import moment from 'moment'
import queryString from 'query-string'
import * as XLSX from 'xlsx'

import { DATEFORMATWITHTIME } from './constants'

export const desc = function (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}
export const stableSort = function (array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

export const exportToCSV = (mappedRequests, fileName) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'
  const ws = XLSX.utils.json_to_sheet(mappedRequests)
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const data = new Blob([excelBuffer], { type: fileType })
  FileSaver.saveAs(data, fileName + fileExtension)
}

export const getSorting = function (order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}
export const getQueryData = function () {
  return queryString.parse(location.search)
}

export const getQueryParams = function (data) {
  const queryParams = new URLSearchParams(window.location.search)
  return queryParams.get(data)
}
export const handleChangeRowsPerPage = function (event, pageDetails, callBack) {
  pageDetails.per_page = parseInt(event.target.value, 10)
  pageDetails.current_page = 1
  callBack()
}

export const handleChangePage = function (event, newPage, pageDetails, callBack) {
  pageDetails.current_page = newPage
  callBack()
}

export const setPageDetailsData = function (data, pageDetails, setPageDetails) {
  pageDetails.current_page = data.current_page || data.currentPage
  pageDetails.from = data.from
  pageDetails.last_page = data.last_page || data.lastPage
  pageDetails.per_page = Number(data.per_page) || data.perPage
  pageDetails.to = data.to
  pageDetails.total = data.total
  setPageDetails({ ...pageDetails })
}

export const getSchoolUrl = function ({ district, school, to }) {
  return `/${district || ''}/${school || ''}/${to || ''}`.replace(/\/\/+/g, '/')
}

export const isTokenValid = (jwt, expiresIn, minutes = 2) => {
  const decodedToken = jwtDecode(jwt)
  const exp = moment.unix(decodedToken.exp ? decodedToken.exp : decodedToken.iat + expiresIn)
  const utc = moment.utc()
  const diff = exp.diff(utc, 'minutes')
  return diff > minutes
}

export const isUnauthRoute = function () {
  return (
    window.location.pathname === '/' ||
    // window.location.pathname.includes('login') ||
    window.location.pathname.includes('forgotpassword') ||
    window.location.pathname.includes('passwordreset')
  )
}

export const trimmer = function (data) {
  if (!isEmpty(data)) {
    if (typeof data === 'object' && !Array.isArray(data)) {
      let trimedValues = {}
      Object.entries(data).map((value) => {
        if (typeof value[1] === 'string') {
          trimedValues = { ...trimedValues, [value[0]]: value[1].trim() }
        } else if (typeof value[1] === 'object') {
          let valueObj = trimmer(value[1])
          trimedValues = { ...trimedValues, [value[0]]: valueObj }
        } else {
          trimedValues = { ...trimedValues, [value[0]]: value[1] }
        }
      })
      return trimedValues
    } else if (typeof data === 'object' && Array.isArray(data)) {
      let trimedValues = []
      data.map((arrayValue) => {
        if (typeof arrayValue === 'string') {
          trimedValues.push(arrayValue.trim())
        } else if (typeof arrayValue === 'object') {
          let valueObj = trimmer(arrayValue)
          trimedValues.push(valueObj)
        } else {
          trimedValues.push(arrayValue)
        }
      })
      return trimedValues
    }
  } else {
    return data
  }
}

export const getOffsetInInt = function (rawOffset) {
  if (!rawOffset || (!rawOffset.includes('+') && !rawOffset.includes('-'))) {
    return 0
  }
  if (rawOffset.includes('+')) {
    let offsetPart = rawOffset.split('+')[1]
    offsetPart = offsetPart.split(':')
    return parseInt(offsetPart[0]) * 60 + parseInt(offsetPart[1])
  }
  if (rawOffset.includes('-')) {
    let offsetPart = rawOffset.split('-')[1]
    offsetPart = offsetPart.split(':')
    return -(parseInt(offsetPart[0]) * 60 + parseInt(offsetPart[1]))
  }
}

export const getDate = function (timeStamp) {
  let d = moment(timeStamp).format('MM/DD/YYYY')
  return d.toLocaleString()
}

export const getDateInUserTimezone = function (date, originalOffset, format) {
  const currentSystemOffset = -new Date().getTimezoneOffset()
  const orifinalOffsetFormatted = getOffsetInInt(originalOffset)
  date = moment(date)
    .subtract(orifinalOffsetFormatted, 'minutes')
    .add(currentSystemOffset, 'minutes')
  return format ? date.format(format) : date
}

export const isNullOrEmpty = function (value) {
  return value === null || value === undefined || value === ''
}

export const mapWithState = function (initialState, value) {
  const obj = {}
  Object.keys(initialState).forEach((key) => {
    obj[key] = !isNullOrEmpty(value[key]) ? value[key] : initialState[key]
  })
  return obj
}

export const addFrontSlash = function (path) {
  if (path[0] !== '/') {
    return `/${path}`
  }
  return path
}

export const removeBackSlash = function (path) {
  if (path[path.length - 1] === '/') {
    return path.substr(0, path.length - 1)
  }
  return path
}

export const makeFakeEvent = function (data) {
  return {
    target: {
      ...data,
    },
  }
}

export const makeFakeCurrentTargetEvent = function (data) {
  return {
    currentTarget: {
      attributes: { ...data },
    },
  }
}

export const getFileNameWithoutExtension = function (name) {
  if (name) {
    return name.replace(/\.[^/.]+$/, '')
  } else {
    return ''
  }
}

export const mapStateWithData = function (data, initialState) {
  let obj = {}
  Object.keys(initialState).forEach((key) => {
    obj[key] = data[key] ? data[key] : initialState[key]
  })
  return obj
}

export const getFullName = function ({ first_name = '', middle_name = '', last_name = '' }) {
  return `${first_name} ${middle_name} ${last_name}`.replace(/  +/g, ' ')
}

export const calculateAge = function (birthday) {
  // birthday is a date
  if (!birthday) {
    return
  }
  const birthDayModified = typeof birthday === 'object' ? birthday?.getTime() : birthday
  var ageDifMs = Date.now() - birthDayModified
  var ageDate = new Date(ageDifMs) // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export const convertTimestampToDate = function (timeStamp) {
  let date = moment.unix(timeStamp / 1000).format(DATEFORMATWITHTIME)
  return date.toLocaleString()
}

export const applySchoolTheme = function (theme) {
  if (!theme) {
    return
  }
  document.body.setAttribute('data-theme', theme)
}

export const createObjectURLSecure = (url, defaultUrl) => {
  let returnUrl = ''
  try {
    returnUrl = url ? URL.createObjectURL(url) : defaultUrl
  } catch {
    returnUrl = defaultUrl
  }
  return returnUrl
}
export const getFinalFee = function (values, program) {
  let finalFee = values.fee_line_items.reduce((init, value) => {
    return init + (!isNaN(parseFloat(value.fli_amount)) ? parseFloat(value.fli_amount) : 0)
  }, 0)
  return values.fee_shipping_fee
    ? (finalFee + parseFloat(program?.pgm_shipping_fee || 0))?.toFixed(2)
    : (finalFee || 0)?.toFixed(2)
}
export const installAccount = function (values) {
  let y = values.fee_installment_count > 0 ? values.fee_installment_count : 1
  return y
}

export const decimalFinalFee = function (values, program) {
  let finalFee = values.fee_line_items.reduce((init, value) => {
    return (
      init +
      (!isNaN(parseFloat(value.fli_amount))
        ? parseFloat(value.fli_amount) / installAccount(values)
        : 0)
    )
  }, 0)
  return values.fee_shipping_fee
    ? (finalFee + parseFloat(program?.pgm_shipping_fee / installAccount(values) || 0))?.toFixed(2)
    : (finalFee || 0)?.toFixed(2)
}

export const getTokenFromUrl = () => {
  const hash = location.hash.substr(1)
  if (!hash) {
    return
  }
  let token = hash.split('&')
  if (!token[0] || token[0].includes('error')) {
    return ''
  }
  return {
    accessToken: token[0].split('=')[1],
    expiresIn: token[1].split('=')[1],
    refreshToken: token[2].split('=')[1],
  }
}

export const getAccountDataFromToken = (token) => {
  const decodedToken = jwtDecode(token.accessToken)
  return {
    refreshToken: token.refreshToken,
    accountId: decodedToken.iss,
  }
}

export const enrolledMap = {
  enrolled: {
    resource: 'enrolled',
    style: 'label-enrolled',
  },
  pending_payment: {
    resource: 'pending',
    style: 'label-pending-payment',
  },
  declined_payment: {
    resource: 'declined',
    style: 'label-declined-payment',
  },
  locked: {
    resource: 'locked',
    style: 'label-locked',
  },
  dropped: {
    resource: 'dropped',
    style: 'label-dropped',
  },
  graduated: {
    resource: 'graduated',
    style: 'label-graduated',
  },
  transferred: {
    resource: 'transferred',
    style: 'label-transferred',
  },
  request_for_transfer: {
    resource: 'requestForTransfer',
    style: 'label-request-for-transfer',
  },
  passed: {
    resource: 'passed',
    style: 'label-passed',
  },
  failed: {
    resource: 'failed',
    style: 'label-failed',
  },
  in_evaluation: {
    resource: 'inEvaluation',
    style: 'label-in-evaluation',
  },
  hold: {
    resource: 'hold',
    style: 'label-hold',
  },
  rejected: {
    resource: 'rejected',
    style: 'label-rejected',
  },
  in_print_office: {
    resource: 'inPrintOffice',
    style: 'label-in-print-office',
  },
  package_preparation: {
    resource: 'packagePreparation',
    style: 'label-package-preparation',
  },
  printed: {
    resource: 'printed',
    style: 'label-printed',
  },
}

export const profileCompleteness = {
  prefix: 2,
  avatar: 5,
  first_name: 6,
  last_name: 6,
  nick_name: 4,
  dob: 4,
  gender: 4,
  ethnicity: 4,
  adr_address1: 6,
  adr_address2: 6,
  adr_country_iso: 6,
  adr_state_iso: 6,
  adr_city: 6,
  adr_zipcode: 6,
  email: 5,
  adr_mobile: 4,
  adr_phone: 4,
  ssn: 4,
  upload_id: 8,
  security_question: 2,
  security_answer: 2,
}

export const parent1ProfileCompleteness = {
  avatar: 10,
  prefix: 10,
  first_name: 10,
  last_name: 10,
  nick_name: 10,
  email: 10,
  home_phone_number: 10,
  relationship_with_student: 10,
  primary_phone_number: 10,
  ssn: 10,
}

export const isEnter = (event) => event.keyCode === 13

export const isEmpty = _isEmpty

export const get = _get

export const trim = _trim

export const cloneDeep = _cloneDeep

export const intersection = _intersection
