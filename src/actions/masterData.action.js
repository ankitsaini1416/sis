import { API } from './../api/api'
import { fetch } from './../api/httpClient'
import { get } from './../helpers/utils'
import ActionTypes from './actionTypes'
import toggleLoaderAction from './loader.action'

export const countriesCall = (pageDetail, successCallback, errorCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  const apiPathAllCountries = `${API.MDS}api/countries?sort_by=${pageDetail.sort_by}&sort_order=${pageDetail.sort_order}&per_page=${pageDetail.per_page}&page=${pageDetail.page}&q=${pageDetail.q}`
  try {
    let { data } = await fetch(apiPathAllCountries)
    let countries = get(data, 'content', [])
    dispatch({
      type: ActionTypes.MASTER,
      data: {
        countries,
      },
    })
    if (typeof successCallback === 'function') {
      successCallback({ countries })
    }
  } catch (err) {
    if (typeof errorCallback === 'function') {
      errorCallback(err)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}

export const countriesByOrgCall =
  (schoolUrn, successCallback, errorCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPathUrnCountries = `${API.MDS}api/mds/${btoa(schoolUrn)}/countries`
    try {
      let { data = [] } = await fetch(apiPathUrnCountries)
      data = data.map((item) => item.data)
      if (typeof successCallback === 'function') {
        successCallback(data)
      }
    } catch (err) {
      if (typeof errorCallback === 'function') {
        errorCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const statesCall =
  (countryCode, pageDetail, successCallback, errorCallback) => async (dispatch) => {
    const apiPathAllStates = `${API.MDS}api/countries/${countryCode}/state?sort_by=${pageDetail.sort_by}&sort_order=${pageDetail.sort_order}&per_page=${pageDetail.per_page}&page=${pageDetail.page}&q=${pageDetail.q}`
    try {
      dispatch(toggleLoaderAction(true))
      let { data } = await fetch(apiPathAllStates)
      if (typeof successCallback === 'function') {
        successCallback(data)
      }
    } catch (err) {
      if (typeof errorCallback === 'function') {
        errorCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const masterDataCall = (successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    let { data } = await fetch(API.CORE.MASTER)
    Object.keys(data).forEach((item) => {
      if (item !== 'enrollment_status') {
        data[item] = Object.keys(data[item])
      } else {
        data[item] = Object.keys(data[item]).filter((item) => item !== 'pending_payment')
      }
    })
    dispatch({
      type: ActionTypes.MASTER,
      data,
    })
    if (typeof successCallback === 'function') {
      successCallback()
    }
  } catch (error) {
    if (typeof failureCallback === 'function') {
      failureCallback(error)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}

export const ethnicityCall = (successCallback, failureCallback) => async () => {
  try {
    let { data } = await fetch(`${API.MDS}api/ethnicity`)
    if (typeof successCallback === 'function') {
      successCallback(data)
    }
  } catch (error) {
    if (typeof failureCallback === 'function') {
      failureCallback(error)
    }
  }
}

export const securityQuestionsCall = (successCallback, failureCallback) => async () => {
  try {
    let { data } = await fetch(API.CORE.SECURITYQUESTIONS)
    if (typeof successCallback === 'function') {
      successCallback(data)
    }
  } catch (error) {
    if (typeof failureCallback === 'function') {
      failureCallback(error)
    }
  }
}
