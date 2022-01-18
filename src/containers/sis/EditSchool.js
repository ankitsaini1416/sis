import '../../assets/styles/CountryCode.scss'

import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { headerAction } from '../../actions/header.action'
import { editSchoolCountriesCall, fetchCountriesCall } from '../../actions/location.action'
import localStorageService from '../../api/localStorageService'
import EditSchool from '../../components/sis/organizations/schools/editSchool/EditSchool'
import { TablePageData } from '../../data/TablePageData'
import { messageAction } from './../../actions/app.action'
import { fetchDistrictsCall } from './../../actions/district.action'
import {
  createLms,
  deleteLms,
  fetchAuthAccessUrl,
  fetchAuthlmsUrl,
  fetchConfigMasterLmsList,
  fetchLmsList,
  updateLms,
} from './../../actions/lms.action'
import { statesCall } from './../../actions/masterData.action'
import { addUpdateMetadata, fetchMetadata } from './../../actions/metadata.action'
import {
  addAppId,
  createPaymentGateway,
  deletePaymentGateway,
  fetchAppId,
  fetchPaymentGateways,
  fetchPaymentMaster,
  updateAppId,
  updatePaymentGateway,
} from './../../actions/payment.action'
import {
  createProgramCategory,
  deleteProgramCategory,
  fetchProgramCategory,
  updateProgramCategory,
} from './../../actions/program.action'
import {
  addGradeScaleCall,
  editSchoolCall,
  fetchGradeScale,
  fetchSchoolByIdCall,
  uploadSchoolLogoCall,
} from './../../actions/schools.action'
import { MESSAGE_SEVERITIES, UsPhoneCode } from './../../helpers/constants'
import PERMISSIONS from './../../helpers/permissions'
import { selectMasterData, selectUser } from './../../helpers/selectors'
import {
  get,
  getQueryData,
  handleChangePage,
  intersection,
  isEmpty,
  isEnter,
  mapWithState,
} from './../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'
const initialState = {
  sch_dst_id: '',
  sch_name: '',
  sch_school_short_name: '',
  sch_is_active: true,
  sch_school_type: '',
  sch_contact_person: '',
  sch_contact_email: '',
  sch_phone_prefix: UsPhoneCode,
  sch_phone: '',
  adr_address1: '',
  adr_address2: '',
  adr_country_iso: '',
  adr_country_name: '',
  adr_state_iso: '',
  adr_state_name: '',
  adr_city: '',
  adr_zipcode: '',
  adr_phone_prefix: UsPhoneCode,
  adr_phone: '',
  adr_fax: '',
  adr_phone_ext: '',
  sch_description: '',
  sch_website: '',
  sch_slug: '',
  sch_logo: '',
}

const generalInitialState = {
  student_approval_required: false,
  student_age_for_parent_info: '',
  enable_essay: false,
  essay_question: '',
  payment_days: '',
  school_theme: '',
}

function EditSchoolContainer({
  headerAction,
  masterData,
  editSchoolCall,
  messageAction,
  fetchSchoolByIdCall,
  fetchDistrictsCall,
  statesCall,
  fetchAppId,
  addAppId,
  updateAppId,
  fetchPaymentMaster,
  fetchPaymentGateways,
  createPaymentGateway,
  updatePaymentGateway,
  deletePaymentGateway,
  fetchCountriesCall,
  editSchoolCountriesCall,
  fetchMetadata,
  addUpdateMetadata,
  metadata,
  uploadSchoolLogoCall,
  fetchProgramCategory,
  createProgramCategory,
  updateProgramCategory,
  deleteProgramCategory,
  fetchLmsList,
  fetchConfigMasterLmsList,
  createLms,
  updateLms,
  deleteLms,
  fetchAuthlmsUrl,
  fetchAuthAccessUrl,
  authUser,
  addGradeScaleCall,
  fetchGradeScale,
}) {
  const { schoolId } = useParams()
  const history = useHistory()
  const deleteIds = useRef([])
  const { code, step } = getQueryData()
  const [appInfo, setAppInfo] = React.useState('')
  const [paymentMaster, setPaymentMaster] = useState([])
  const [paymentGateways, setPaymentGateways] = useState([])
  const [school, setSchool] = useState({})
  const [districts, setDistricts] = useState([])
  const [states, setStates] = useState([])
  const [formState, setFormState] = useState({ ...initialState })
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = React.useState('')
  const [checkStateCountry, setCheckStateCountry] = React.useState([])
  const [programsCategory, setProgramsCategory] = React.useState([])
  const [formActionType, setFormActionType] = React.useState('')
  const [lmsAction, setLmsAction] = React.useState({})
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false)
  const [renderer, setRenderer] = React.useState(uuid())
  const [lmsList, setLmsList] = React.useState([])
  const [gradeScale, setGradeScale] = React.useState([])
  const [tabs, setTabs] = React.useState({
    generalInfos: {
      show: authUser.isAdmin,
      index: 0,
    },
    paymentSettings: {
      show: authUser.isAdmin,
      index: 1,
    },
    generalSetting: {
      show: authUser.isAdmin,
      index: 2,
    },
    countries: {
      show: authUser.isAdmin,
      index: 3,
    },
    lmsConfiguration: {
      show: authUser.isAdmin,
      index: 4,
    },
    programCategories: {
      show: authUser.isAdmin,
      index: 5,
    },
    gradeScale: {
      show: authUser.isAdmin,
      index: 6,
    },
  })
  const [configLmsList, setConfigLmsList] = React.useState([])
  const [value, setValue] = React.useState(() => {
    if (step) {
      return parseInt(step)
    }
    const tab = Object.keys(tabs).find((tab) => tabs[tab].show)
    if (tab) {
      return tabs[tab].index
    }
    return -1
  })
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // const { params } = useContext(RouterContext)

  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: 50,
  })
  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchCountries)
  }
  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })

  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'schools',
      sideBar: true,
      activeParent: 'organizations',
    }
    headerAction(headerData)
  }, [])
  const [generalSetting, setGeneralSetting] = React.useState({
    ...generalInitialState,
  })
  const [search, setSearch] = React.useState('')

  const setSearchValue = function (e) {
    setSearch(e.target.value)
  }

  const onResetCategories = function () {
    setSearch('')
    setRenderer(uuid())
  }

  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      getProgramsCategory()
    }
  }

  const onReset = function () {
    setSearchCountry('')
    setRenderer(uuid())
  }

  const editSchool = (id, values, { setErrors }) => {
    editSchoolCall(
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
            subTitle: mapGeneralErrors(error, 'error:errorEditSchoolGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorEditSchoolGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const editLogo = (file) => {
    uploadSchoolLogoCall(
      school.id,
      file,
      () => {},
      (err) => {
        const error = get(err, 'response.data.field_errors', {})
        const splitted = error?.sch_logo[0].split(':')
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

  const getDistricts = () => {
    fetchDistrictsCall(
      {
        q: '',
        per_page: 1000,
        is_active: '',
      },
      (records) => {
        setDistricts(get(records, 'content', []))
      },
      null,
      false
    )
  }

  const searchStates = (countryCode) => {
    statesCall(
      countryCode,
      {
        q: '',
        sort_by: '',
        sort_order: '',
        page: 1,
        per_page: 1000,
        is_active: '',
      },
      (records) => {
        setStates(get(records, 'content', []))
      },
      null
    )
  }

  const fetchPaymentAppId = function () {
    fetchAppId(school.sch_school_public_id, (data) => {
      setAppInfo(data)
    })
  }

  const addPaymentAppId = function (payload, { setErrors, callback }) {
    addAppId(
      { program: school.sch_school_public_id, ...payload },
      (data) => {
        callback()
        setAppInfo(data)
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddIdAdded'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddIdAdded',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const updatePaymentAppId = function (payload, { setErrors, callback }) {
    updateAppId(
      { program: school.sch_school_public_id, ...payload },
      (data) => {
        callback()
        setAppInfo(data)
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddIdUpdated'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddIdUpdated',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const fetchPaymentGatewaysList = function () {
    fetchPaymentGateways(
      appInfo.app_id,
      (data) => {
        setPaymentGateways(data)
      },
      () => {}
    )
  }

  const addPaymentGateway = function (payload, { setErrors, callback }) {
    createPaymentGateway(
      appInfo.app_id,
      payload,
      () => {
        fetchPaymentGatewaysList()
        if (typeof callback === 'function') {
          callback()
        }
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorGatewayAdded'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorGatewayAdded',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const editPaymentGateway = function (id, payload, { setErrors, callback }) {
    updatePaymentGateway(
      appInfo.app_id,
      id,
      payload,
      () => {
        fetchPaymentGatewaysList()
        if (typeof callback === 'function') {
          callback()
        }
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorGatewayUpdated'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorGatewayUpdated',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const removePaymentGateway = function (id, { callback }) {
    deletePaymentGateway(
      appInfo.app_id,
      id,
      () => {
        fetchPaymentGatewaysList()
        if (typeof callback === 'function') {
          callback()
        }
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorGatewayDeleted'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorGatewayDeleted',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const fetchGeneralSetting = function () {
    fetchMetadata(
      { metaType: 'school', metaTypeId: schoolId },
      (data) => {
        setGeneralSetting(data)
      },
      () => {}
    )
  }

  const addUpdateGeneralSetting = (values, { setErrors }) => {
    const payload = Object.keys(values).map((meta) => ({
      md_meta_type: 'school',
      md_meta_type_id: school?.sch_id,
      md_meta_key: meta,
      md_meta_value: values[meta],
    }))
    addUpdateMetadata(
      payload,
      () => {
        fetchGeneralSetting()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorUpdateGeneralSetting'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorUpdateGeneralSetting',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const getProgramsCategory = function () {
    const filterData = {
      q: search,
    }
    fetchProgramCategory(
      schoolId,
      { ...pageDetails, ...paginationMidState, ...filterData },
      (records) => {
        setProgramsCategory(records)
      }
    )
  }

  const addProgramCategory = function (id, schoolId, values, { setErrors, callback }) {
    if (formActionType === 'edit') {
      updateProgramCategory(
        id,
        values,
        () => {
          getProgramsCategory()
          callback()
        },
        (err) => {
          const errors = get(err, 'response.data.field_errors', {})
          const error = get(err, 'response.data.code', '')

          if (!isEmpty(errors)) {
            setErrors(mapFieldErrors(errors))
          } else if (!isEmpty(error)) {
            messageAction({
              subTitle: mapGeneralErrors(error, 'error:errorUpdateProgramCategory'),
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          } else {
            messageAction({
              subTitle: 'error:errorUpdateProgramCategory',
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          }
        }
      )
    } else
      createProgramCategory(
        schoolId,
        values,
        () => {
          getProgramsCategory()
          callback()
        },
        (err) => {
          const errors = get(err, 'response.data.field_errors', {})
          const error = get(err, 'response.data.code', '')

          if (!isEmpty(errors)) {
            setErrors(mapFieldErrors(errors))
          } else if (!isEmpty(error)) {
            messageAction({
              subTitle: mapGeneralErrors(error, 'error:errorAddProgramCategory'),
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          } else {
            messageAction({
              subTitle: 'error:errorAddProgramCategory',
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          }
        }
      )
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

  const deleteItems = () => {
    deleteProgramCategory(
      deleteIds.current,
      () => {
        toggleDeletePopup()
        getProgramsCategory()
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:deleteProgramCategory'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:deleteProgramCategory',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  const onCheckCountry = (event) => {
    if (Array.isArray(event)) {
      return setCheckStateCountry(event.map((item) => item.toString()))
    }
    const id = event.target.name
    if (checkStateCountry.includes(id)) {
      setCheckStateCountry(checkStateCountry.filter((item) => item !== id))
    } else {
      setCheckStateCountry((oldState) => [...oldState, id])
    }
  }
  const setSearchText = (event) => {
    event.preventDefault()
    if (event.target.id === 'countrySearch') {
      setSearchCountry(event.target.value)
    } else {
      setSearchCountry(event.target.value)
    }
  }

  const onCountrySearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      onApplyFilter()
    }
  }
  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchCountries()
  }
  function fetchCountries() {
    const filterData = {
      sort_by: orderBy,
      sort_order: order,
      q: searchCountry,
    }
    fetchCountriesCall(
      {
        ...pageDetails,
        ...paginationMidState,
        ...filterData,
        // current_page: searchCountry ? 1 : paginationMidState.current_page,
        // per_page: searchCountry ? 500 : paginationMidState.per_page,
      },
      school.sch_urn,
      ({ countries: records }) => {
        const { content, ...paginationDetail } = records || {}
        if (isEmpty(content) && pageDetails.current_page !== 1) {
          paginationMidState.current_page = 1
          fetchCountries()
        }
        setCountries(content)
        setPageDetails((previousPageData) => {
          return {
            ...previousPageData,
            last_page: paginationDetail.lastPage,
            page: paginationDetail.currentPage,
            from: paginationDetail.from,
            per_page: paginationDetail.perPage,
            to: paginationDetail.to,
            total: paginationDetail.total,
          }
        })
        setCheckStateCountry(
          content.filter((country) => country.isEnabled).map((country) => country.id)
        )
      }
    )
  }
  const editCountries = () => {
    editSchoolCountriesCall(school.sch_urn, countries, checkStateCountry, () => {
      fetchCountries(),
        (err) => {
          const error = get(err, 'response.data.code', '')
          if (!isEmpty(error)) {
            messageAction({
              subTitle: mapGeneralErrors(error, 'error:errorAddSchoolGeneral'),
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          } else {
            messageAction({
              subTitle: 'error:errorAddSchoolGeneral',
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          }
        }
    })
  }
  const resetCountryState = function () {
    setCheckStateCountry(
      countries.filter((country) => country.isEnabled).map((country) => country.id)
    )
  }
  const getLmsList = function () {
    fetchLmsList(schoolId, (data) => {
      setLmsList(data)
    })
  }
  const getConfigLmsList = function () {
    fetchConfigMasterLmsList((data) => {
      setConfigLmsList(data)
    })
  }
  const getAuthurl = function (id) {
    fetchAuthlmsUrl(schoolId, id, (data) => {
      var obj = { lms_sync_school_id: schoolId, step: value, lmsId: id }
      localStorageService.setLmsObject(obj)
      window.location = data.authUrl
    })
  }
  const getAuthAccessUrl = function (callback) {
    const { lms_sync_school_id, lmsId } = localStorageService.getLmsObject('lmsObject') || '{}'
    if ((lms_sync_school_id, lmsId, code)) {
      fetchAuthAccessUrl(
        lms_sync_school_id,
        lmsId,
        code,
        () => {
          if (typeof callback === 'function') {
            callback()
          }
        },
        (err) => {
          const error = get(err, 'response.data.code', '')
          if (!isEmpty(error)) {
            messageAction({
              subTitle: mapGeneralErrors(error, 'error:errorLmsSync'),
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          } else {
            messageAction({
              subTitle: 'error:errorLmsSync',
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          }
        }
      )
    } else {
      return
    }
  }
  const createLmsConfig = function (payload, { setErrors, callback }) {
    if (lmsAction.action === 'add') {
      createLms(
        schoolId,
        payload,
        () => {
          getLmsList()
          if (typeof callback === 'function') {
            callback()
          }
        },
        (err) => {
          const errors = get(err, 'response.data.field_errors', {})
          const error = get(err, 'response.data.code', '')
          if (!isEmpty(errors)) {
            setErrors(mapFieldErrors(errors))
          } else if (!isEmpty(error)) {
            messageAction({
              subTitle: mapGeneralErrors(error, 'error:errorLms'),
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          } else {
            messageAction({
              subTitle: 'error:errorLms',
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          }
        }
      )
    } else
      updateLms(
        schoolId,
        lmsAction.lmc_id,
        payload,
        () => {
          getLmsList()
          callback()
        },
        (err) => {
          const errors = get(err, 'response.data.field_errors', {})
          const error = get(err, 'response.data.code', '')

          if (!isEmpty(errors)) {
            setErrors(mapFieldErrors(errors))
          } else if (!isEmpty(error)) {
            messageAction({
              subTitle: mapGeneralErrors(error, 'error:errorLms'),
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          } else {
            messageAction({
              subTitle: 'error:errorLms',
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          }
        }
      )
  }

  const removeLmsConfig = function (id, { callback }) {
    deleteLms(
      schoolId,
      id,
      () => {
        getLmsList()
        if (typeof callback === 'function') {
          callback()
        }
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorDeleted'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorDeleted',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const addGradeScale = (values, setErrors) => {
    addGradeScaleCall(
      schoolId,
      values,
      () => {},
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorUpdateGradeScale'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorUpdateGradeScale',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const getGradeScale = function () {
    fetchGradeScale(schoolId, (records) => {
      setGradeScale(
        !isEmpty(records)
          ? records
          : [
              {
                gr_name: '',
                gr_label: '',
                gr_upper_limit: 0,
                gr_lower_limit: 0,
                gr_regular: '',
                gr_honours: '',
                gr_ap_de: '',
                isEdit: true,
              },
            ]
      )
    })
  }

  useEffect(() => {
    const headerData = {
      activeMenuItem: 'schools',
      activeParent: 'organizations',
    }
    headerAction(headerData)
  }, [])
  useEffect(() => {
    getAuthAccessUrl()
  }, [])

  useEffect(() => {
    if (!isEmpty(school)) {
      fetchCountries()
    }
  }, [orderBy, order, school, renderer])

  React.useEffect(() => {
    if (value === 1 && !isEmpty(school)) {
      fetchPaymentAppId()
      fetchPaymentAppId()
      fetchPaymentMaster((data) => {
        setPaymentMaster(data)
      })
    }
  }, [value, school])

  useEffect(() => {
    if (value === 1 && !isEmpty(appInfo)) {
      fetchPaymentGatewaysList()
    }
  }, [value, appInfo])

  React.useEffect(() => {
    if (value === 2) {
      fetchGeneralSetting()
    }
  }, [value])

  React.useEffect(() => {
    if (value === 4) {
      getConfigLmsList()
      getLmsList()
    }
  }, [value])

  React.useEffect(() => {
    if (value === 5) {
      getProgramsCategory()
    }
  }, [value, renderer])

  React.useEffect(() => {
    if (value === 6) {
      getGradeScale()
    }
  }, [value])

  useEffect(() => {
    getDistricts()
    fetchSchoolByIdCall(schoolId, (data) => {
      const { sch_address, sch_district, ...rest } = data
      setDistricts([sch_district])
      setFormState(mapWithState(initialState, { ...sch_address, ...rest }))
      setSchool({ ...sch_address, ...rest })
      if (sch_address.adr_country_iso) {
        searchStates(sch_address.adr_country_iso)
      }
    })
  }, [])

  useEffect(() => {
    if (!isEmpty(school) && !isEmpty(authUser)) {
      Object.keys(authUser?.permissions?.allowedActions || {}).every((action) => {
        const paths = action.substr(1, action.length - 2).split('/')
        if ((paths[1] && paths[1] === school.sch_school_public_id) || action === '/') {
          const permissions = authUser?.permissions?.allowedActions[action]?.list
          tabs.generalInfos.show = !!intersection(
            [PERMISSIONS['SIS/ReadSchoolGeneralInfo'], PERMISSIONS['SIS/UpdateSchool']],
            permissions
          ).length
          tabs.paymentSettings.show = !!intersection(
            [
              PERMISSIONS['SIS/ReadSchoolPayment'],
              PERMISSIONS['SIS/UpdateSchoolPayment'],
              PERMISSIONS['SIS/DeleteSchoolPayment'],
              PERMISSIONS['SIS/CreateSchoolPayment'],
            ],
            permissions
          ).length
          tabs.generalSetting.show = !!intersection(
            [
              PERMISSIONS['SIS/ReadSchoolGeneralSettings'],
              PERMISSIONS['SIS/UpdateSchoolGeneralSettings'],
            ],
            permissions
          ).length
          tabs.countries.show = !!intersection(
            [PERMISSIONS['SIS/ReadSchoolCountries'], PERMISSIONS['SIS/UpdateSchoolCountries']],
            permissions
          ).length
          tabs.lmsConfiguration.show = !!intersection(
            [
              PERMISSIONS['SIS/ReadSchoolLMS'],
              PERMISSIONS['SIS/UpdateSchoolLMS'],
              PERMISSIONS['SIS/DeleteSchoolLMS'],
              PERMISSIONS['SIS/CreateSchoolLMS'],
            ],
            permissions
          ).length
          tabs.programCategories.show = !!intersection(
            [
              PERMISSIONS['SIS/ReadSchoolProgramCategory'],
              PERMISSIONS['SIS/UpdateSchoolProgramCategory'],
              PERMISSIONS['SIS/DeleteSchoolProgramCategory'],
              PERMISSIONS['SIS/CreateSchoolProgramCategory'],
            ],
            permissions
          ).length
          tabs.gradeScale.show = true
          setValue(
            step ? parseInt(step) : tabs[Object.keys(tabs).find((tab) => tabs[tab].show)].index
          )
          setTabs({ ...tabs })
          return false
        }
        return true
      })
    }
  }, [authUser, school])

  /**
   * renders JSX of Add District container component
   * @param user
   */
  return (
    <EditSchool
      formState={formState}
      masterData={masterData}
      editSchool={editSchool}
      districts={districts}
      states={states}
      metadata={metadata}
      school={school}
      searchStates={searchStates}
      appInfo={appInfo}
      addPaymentAppId={addPaymentAppId}
      updatePaymentAppId={updatePaymentAppId}
      paymentMaster={paymentMaster}
      paymentGateways={paymentGateways}
      addPaymentGateway={addPaymentGateway}
      editPaymentGateway={editPaymentGateway}
      removePaymentGateway={removePaymentGateway}
      order={order}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      orderBy={orderBy}
      countries={countries}
      searchCountry={searchCountry}
      checkStateCountry={checkStateCountry}
      onCheckCountry={onCheckCountry}
      setSearchText={setSearchText}
      onCountrySearchEnter={onCountrySearchEnter}
      editCountries={editCountries}
      resetCountryState={resetCountryState}
      onChangePage={onChangePage}
      pageDetails={pageDetails}
      setPageDetails={setPageDetails}
      onApplyFilter={onApplyFilter}
      generalSetting={generalSetting}
      addUpdateGeneralSetting={addUpdateGeneralSetting}
      editLogo={editLogo}
      addProgramCategory={addProgramCategory}
      programsCategory={programsCategory}
      setFormActionType={setFormActionType}
      formActionType={formActionType}
      lmsAction={lmsAction}
      setLmsAction={setLmsAction}
      deleteItems={deleteItems}
      openDeletePopup={openDeletePopup}
      toggleDeletePopup={toggleDeletePopup}
      setSearchValue={setSearchValue}
      onSearchEnter={onSearchEnter}
      search={search}
      onReset={onReset}
      getProgramsCategory={getProgramsCategory}
      onResetCategories={onResetCategories}
      lmsList={lmsList}
      createLmsConfig={createLmsConfig}
      configLmsList={configLmsList}
      removeLmsConfig={removeLmsConfig}
      getAuthurl={getAuthurl}
      value={value}
      handleChange={handleChange}
      tabs={tabs}
      fetchCountries={fetchCountries}
      paginationMidState={paginationMidState}
      addGradeScale={addGradeScale}
      gradeScale={gradeScale}
    />
  )
}

EditSchoolContainer.propTypes = {
  headerAction: PropTypes.func,
  masterData: PropTypes.object,
  editSchoolCall: PropTypes.func,
  messageAction: PropTypes.func,
  fetchSchoolByIdCall: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  statesCall: PropTypes.func,
  fetchAppId: PropTypes.func,
  addAppId: PropTypes.func,
  searchCountry: PropTypes.string,
  updateAppId: PropTypes.func,
  fetchPaymentMaster: PropTypes.func,
  fetchPaymentGateways: PropTypes.func,
  createPaymentGateway: PropTypes.func,
  updatePaymentGateway: PropTypes.func,
  deletePaymentGateway: PropTypes.func,
  fetchCountriesCall: PropTypes.func,
  editSchoolCountriesCall: PropTypes.func,
  fetchMetadata: PropTypes.func,
  metadata: PropTypes.array,
  addUpdateMetadata: PropTypes.func,
  uploadSchoolLogoCall: PropTypes.func,
  fetchProgramCategory: PropTypes.func,
  createProgramCategory: PropTypes.func,
  updateProgramCategory: PropTypes.func,
  deleteProgramCategory: PropTypes.func,
  fetchLmsList: PropTypes.func,
  fetchConfigMasterLmsList: PropTypes.func,
  createLms: PropTypes.func,
  updateLms: PropTypes.func,
  deleteLms: PropTypes.func,
  fetchAuthlmsUrl: PropTypes.func,
  fetchAuthAccessUrl: PropTypes.func,
  authUser: PropTypes.object,
  addGradeScaleCall: PropTypes.func,
  fetchGradeScale: PropTypes.func,
}

EditSchoolContainer.defaultProps = {
  headerAction: () => {},
  masterData: {},
  editSchoolCall: () => {},
  messageAction: () => {},
  fetchSchoolByIdCall: () => {},
  fetchDistrictsCall: () => {},
  statesCall: () => {},
  fetchAppId: () => {},
  addAppId: () => {},
  metadata: [],
  updateAppId: () => {},
  fetchPaymentMaster: () => {},
  fetchPaymentGateways: () => {},
  createPaymentGateway: () => {},
  updatePaymentGateway: () => {},
  deletePaymentGateway: () => {},
  fetchCountriesCall: () => {},
  editSchoolCountriesCall: () => {},
  fetchMetadata: () => {},
  addUpdateMetadata: () => {},
  uploadSchoolLogoCall: () => {},
  fetchProgramCategory: () => {},
  createProgramCategory: () => {},
  updateProgramCategory: () => {},
  deleteProgramCategory: () => {},
  fetchLmsList: () => {},
  fetchConfigMasterLmsList: () => {},
  createLms: () => {},
  updateLms: () => {},
  deleteLms: () => {},
  fetchAuthlmsUrl: () => {},
  fetchAuthAccessUrl: () => {},
  authUser: {},
  addGradeScaleCall: () => {},
  fetchGradeScale: () => {},
}

const mapStateToProps = (state) => ({
  masterData: selectMasterData(state),
  authUser: selectUser(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  editSchoolCall,
  messageAction,
  fetchSchoolByIdCall,
  fetchDistrictsCall,
  statesCall,
  fetchAppId,
  addAppId,
  updateAppId,
  fetchPaymentMaster,
  fetchPaymentGateways,
  createPaymentGateway,
  updatePaymentGateway,
  deletePaymentGateway,
  fetchCountriesCall,
  editSchoolCountriesCall,
  fetchMetadata,
  addUpdateMetadata,
  uploadSchoolLogoCall,
  fetchProgramCategory,
  createProgramCategory,
  updateProgramCategory,
  deleteProgramCategory,
  fetchLmsList,
  createLms,
  updateLms,
  fetchConfigMasterLmsList,
  deleteLms,
  fetchAuthlmsUrl,
  fetchAuthAccessUrl,
  addGradeScaleCall,
  fetchGradeScale,
})(EditSchoolContainer)
