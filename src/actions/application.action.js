import moment from 'moment'

import { API } from '../api/api'
import { fetch, put } from '../api/httpClient'
import {
  calculateAge,
  convertTimestampToDate,
  get,
  getFullName,
  isEmpty,
  parent1ProfileCompleteness,
  profileCompleteness,
} from '../helpers/utils'
import toggleLoaderAction from './loader.action'

const DEFAULTAGE = 18

const calculateProfileCompleteness = (user) => {
  let profileComplete = 0
  if (user.prefix) {
    profileComplete += profileCompleteness.prefix
  }
  if (user.avatar) {
    profileComplete += profileCompleteness.avatar
  }
  if (user.ethnicity) {
    profileComplete += profileCompleteness.ethnicity
  }
  if (user.first_name) {
    profileComplete += profileCompleteness.first_name
  }
  if (user.last_name) {
    profileComplete += profileCompleteness.last_name
  }
  if (user.nick_name) {
    profileComplete += profileCompleteness.nick_name
  }
  if (user.dob) {
    profileComplete += profileCompleteness.dob
  }
  if (user.gender) {
    profileComplete += profileCompleteness.gender
  }
  if (user.ssn) {
    profileComplete += profileCompleteness.ssn
  }
  if (user.address?.adr_address1) {
    profileComplete += profileCompleteness.adr_address1
  }
  if (user.address?.adr_address2) {
    profileComplete += profileCompleteness.adr_address2
  }
  if (user.address?.adr_country_iso) {
    profileComplete += profileCompleteness.adr_country_iso
  }
  if (user.address?.adr_state_iso) {
    profileComplete += profileCompleteness.adr_state_iso
  }
  if (user.address?.adr_city) {
    profileComplete += profileCompleteness.adr_city
  }
  if (user.address?.adr_zipcode) {
    profileComplete += profileCompleteness.adr_zipcode
  }
  if (user.email) {
    profileComplete += profileCompleteness.email
  }
  if (user.address?.adr_mobile) {
    profileComplete += profileCompleteness.adr_mobile
  }
  if (user.address?.adr_phone) {
    profileComplete += profileCompleteness.adr_phone
  }
  if (user.upload_id) {
    profileComplete += profileCompleteness.upload_id
  }
  if (user.security_question) {
    profileComplete += profileCompleteness.security_question
  }
  if (user.security_answer) {
    profileComplete += profileCompleteness.security_answer
  }
  user.profileCompletePercentage = profileComplete || 0
}
const Parent1ProfileCompleteness = (parents) => {
  if (parents) {
    let profileComplete = 0
    if (parents.avatar) {
      profileComplete += parent1ProfileCompleteness.avatar
    }
    if (parents.prefix) {
      profileComplete += parent1ProfileCompleteness.prefix
    }
    if (parents.first_name) {
      profileComplete += parent1ProfileCompleteness.first_name
    }
    if (parents.last_name) {
      profileComplete += parent1ProfileCompleteness.last_name
    }
    if (parents.nick_name) {
      profileComplete += parent1ProfileCompleteness.nick_name
    }
    if (parents.email) {
      profileComplete += parent1ProfileCompleteness.email
    }
    if (parents.home_phone_number) {
      profileComplete += parent1ProfileCompleteness.home_phone_number
    }
    if (parents.relationship_with_student) {
      profileComplete += parent1ProfileCompleteness.relationship_with_student
    }
    if (parents.primary_phone_number) {
      profileComplete += parent1ProfileCompleteness.primary_phone_number
    }
    if (parents.ssn) {
      profileComplete += parent1ProfileCompleteness.ssn
    }
    parents.parentProfileComplete = profileComplete || 0
  }
}

export const fetchApplicationsCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      if (!pageDetails.schoolId) {
        return
      }
      let url = `${API.APPLICATION}/${pageDetails.schoolId}/users?page=${
        pageDetails.current_page || ''
      }&perPage=${pageDetails.per_page || ''}&sortBy=${pageDetails.sort_by || ''}&sortOrder=${
        pageDetails.sort_order || ''
      }&q=${pageDetails.q || ''}&is_student=true`
      if (pageDetails.approvalStatus) {
        url += `&approval_status=${pageDetails.approvalStatus}`
      }
      if (pageDetails.fromDate) {
        url += `&fromDate=${moment(pageDetails.fromDate).format('YYYY-MM-DD')}T00:00:00`
      }
      if (pageDetails.toDate) {
        url += `&toDate=${moment(pageDetails.toDate).format('YYYY-MM-DD')}T23:59:59`
      }
      const { data } = await fetch(url)
      get(data, 'content', []).forEach((data) => modifyApplicationItem(data))
      if (typeof successCallback === 'function') {
        successCallback(data)
      }
    } catch (error) {
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const userByEmailCall =
  (email, schoolPublicId, successCallback, failureCallback) => async () => {
    try {
      const url = `${API.CORE.CUSTOMER}/${email}`
      const customHeaders = {
        headers: {
          ['realm-name']: schoolPublicId,
        },
      }
      const { data } = await fetch(url, customHeaders)
      modifyUserItem(data)
      calculateProfileCompleteness(data)
      Parent1ProfileCompleteness(data.parents[0])
      Parent1ProfileCompleteness(data.parents[1])
      if (typeof successCallback === 'function') {
        successCallback(data)
      }
    } catch (error) {
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    }
  }

export const fetchApplicationDetailCall =
  (realmId, userId, successCallback, failureCallback) => async () => {
    try {
      const url = `${API.APPLICATION}/${realmId}/users/${userId}`
      let { data } = await fetch(url)
      modifyApplicationItem(data)
      if (typeof successCallback === 'function') {
        successCallback(data)
      }
    } catch (err) {
      if (typeof failureCallback === 'function') {
        failureCallback(err)
      }
    }
  }

export const updateUserCall =
  (email, schoolPublicId, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const { address, parents, ...rest } = payload
      const url = `${API.CORE.CUSTOMER}/${email}`
      const customHeaders = {
        headers: {
          ['realm-name']: schoolPublicId,
        },
      }
      const updatedPayload = {
        ...rest,
        dob: rest.dob && typeof rest.dob === 'object' ? rest.dob.getTime() : rest.dob,
      }
      const formPayload = new FormData()
      Object.keys(updatedPayload).forEach((key) => {
        formPayload.append(key, updatedPayload[key])
      })
      if (!isEmpty(address)) {
        Object.keys(address).forEach((key) => {
          formPayload.append(`address[${key}]`, address[key])
        })
      }
      if (!isEmpty(parents)) {
        parents.forEach((parent, i) => {
          Object.keys(parent).forEach((key) => {
            formPayload.append(`parents[${i}][${key}]`, parent[key])
          })
        })
      }
      const { data } = await put(url, formPayload, customHeaders)
      if (typeof successCallback === 'function') {
        successCallback(data)
      }
    } catch (error) {
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const modifyUserItem = function (data) {
  if (isEmpty(data)) {
    return
  }
  data.fullName = getFullName(data)
  data.age = data.dob ? calculateAge(data.dob) : DEFAULTAGE
  data.dobLabel = data?.dob ? convertTimestampToDate(data.dob) : ''
  data.uploadIdUrl = data?.upload_id ? data?.upload_id.split('/').pop() : ''
}

const modifyApplicationItem = function (data) {
  if (isEmpty(data)) {
    return
  }
  data.age = data.birthday ? calculateAge(data.birthday) : DEFAULTAGE
  data.dobLabel = data?.birthday ? convertTimestampToDate(data.birthday) : ''
  data.createdDate = data?.created_at ? convertTimestampToDate(data.created_at) : ''
  data.updatedDate = data?.updated_at ? convertTimestampToDate(data.updated_at) : ''
}
