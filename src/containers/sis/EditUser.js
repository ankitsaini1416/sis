import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { messageAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import { statesCall } from '../../actions/masterData.action'
import EditUser from '../../components/sis/users/EditUser'
import { get, isEmpty } from '../../helpers/utils'
import { fetchUserByIdCall, updateUserCall, uploadUserlogoCall } from './../../actions/agm2.action'
import { MESSAGE_SEVERITIES } from './../../helpers/constants'
import { selectMasterData } from './../../helpers/selectors'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

function EditUserContainer({
  headerAction,
  masterData,
  statesCall,
  updateUserCall,
  messageAction,
  fetchUserByIdCall,
  uploadUserlogoCall,
}) {
  const { userId } = useParams()
  const [user, setUser] = useState({})
  const [states, setStates] = useState([])
  function fetchUserDetails() {
    fetchUserByIdCall(
      userId,
      (data) => {
        setUser(data)
      },
      () => {}
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
      null,
      false
    )
  }
  const editUser = (values, { setErrors, callback }) => {
    const { first_name, last_name, email, ...rest } = values
    const payload = {
      active: true,
      first_name,
      last_name,
      email,
      attributes: Object.keys(rest).reduce((curr, val) => {
        curr[val] = [rest[val]]
        return curr
      }, {}),
    }
    updateUserCall(
      userId,
      payload,
      () => {
        fetchUserDetails()
        callback && callback()
        messageAction({
          subTitle: 'message:editUserGeneral',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorEditUserGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorEditUserGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  const editLogo = (file) => {
    uploadUserlogoCall(
      userId,
      file,
      () => {
        fetchUserDetails()
      },
      (err) => {
        const error = get(err, 'response.data.field_errors', {})

        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(err, 'error:editLogo'),
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
  useEffect(() => {
    fetchUserDetails()
  }, [])
  React.useEffect(() => {
    const headerData = { activeMenuItem: 'users', activeParent: 'agm' }
    headerAction(headerData)
  }, [])
  /**
   * renders JSX of Edit User container component
   * @param user
   */
  return (
    <EditUser
      user={user}
      masterData={masterData}
      searchStates={searchStates}
      states={states}
      editUser={editUser}
      editLogo={editLogo}
    />
  )
}

EditUserContainer.propTypes = {
  headerAction: PropTypes.func,
  masterData: PropTypes.object,
  statesCall: PropTypes.func,
  updateUserCall: PropTypes.func,
  messageAction: PropTypes.func,
  fetchUserByIdCall: PropTypes.func,
  uploadUserlogoCall: PropTypes.func,
}

EditUserContainer.defaultProps = {
  headerAction: () => {},
  masterData: {},
  statesCall: () => {},
  updateUserCall: () => {},
  messageAction: () => {},
  fetchUserByIdCall: () => {},
  uploadUserlogoCall: () => {},
}
const mapStateToProps = (state) => ({
  masterData: selectMasterData(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  statesCall,
  updateUserCall,
  messageAction,
  fetchUserByIdCall,
  uploadUserlogoCall,
})(EditUserContainer)
