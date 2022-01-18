import get from 'lodash/get'
import set from 'lodash/set'

import toggleLoaderAction from '../actions/loader.action'
import { MESSAGE_SEVERITIES } from '../helpers/constants'
import { API } from './../api/api'
import { fetch, post } from './../api/httpClient'
import { messageAction } from './app.action'

export const fetchCountriesCall =
  (pageDetails, schoolUrn, successCallback, errorCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPathUrnCountries = `${API.MDS}mds/${btoa(schoolUrn)}/country?per_page=10000&page=1`
    const apiPathAllCountries = `${API.MDS}api/countries?sort_by=${pageDetails.sort_by}&sort_order=${pageDetails.sort_order}&per_page=${pageDetails.per_page}&page=${pageDetails.current_page}&q=${pageDetails.q}`
    try {
      let [countries, urnCountries] = await Promise.all([
        fetch(apiPathAllCountries),
        fetch(apiPathUrnCountries),
      ])
      countries = get(countries, 'data', {})
      urnCountries = get(urnCountries, 'data.content', [])
      const formCountriesCodes = urnCountries.map((country) => country.isoCode)
      const allCountriesMapWithUrn = get(countries, 'content', []).map((country) => ({
        ...country,
        id: country.isoCode,
        isEnabled: formCountriesCodes.includes(country.isoCode),
      }))
      set(countries, 'content', allCountriesMapWithUrn)
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

export const editSchoolCountriesCall =
  (schoolUrn, countries, editState, successCallback, failureCallback) => async (dispatch) => {
    let toBeAdded = countries.filter(
      (country) => !country.isEnabled && editState.includes(country.id)
    )
    const toBeRemoved = countries
      .filter((country) => country.isEnabled && !editState.includes(country.id))
      .map((country) => ({
        countryCode: country.id,
      }))
    toBeAdded = toBeAdded.map((country) => {
      return {
        countryCode: country.id,
      }
    })
    const updatedPayload = {
      add: toBeAdded,
      remove: toBeRemoved,
    }
    dispatch(toggleLoaderAction(true))
    const url = `${API.MDS}mds/${btoa(schoolUrn)}/countries/update`
    try {
      await post(url, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:countryUpdated',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      )
      if (typeof successCallback === 'function') {
        successCallback()
      }
    } catch (err) {
      if (typeof failureCallback === 'function') {
        failureCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }
