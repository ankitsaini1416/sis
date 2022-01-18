import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { headerAction } from '../../actions/header.action'
import EditRole from '../../components/sis/administration/roles/EditRole'
import { cloneDeep, isEmpty } from '../../helpers/utils'
import {
  callActionsApi,
  callRolePoliciesApi,
  callRolesByIdApi,
  callUpdateRolePoliciesApi,
} from './../../actions/agm2.action'

function EditRoleContainer({
  headerAction,
  callRolesByIdApi,
  callActionsApi,
  callRolePoliciesApi,
  callUpdateRolePoliciesApi,
}) {
  const { id } = useParams()
  const [detail, setDetail] = useState({})
  const [actions, setActions] = useState([])
  const [actionsCopyForReset, setActionsCopyForReset] = useState([])

  const onReset = function () {
    setActions(cloneDeep(actionsCopyForReset))
  }

  const fetchActions = function () {
    callActionsApi((data) => {
      callRolePoliciesApi(id, (rolePolicies) => {
        if (!isEmpty(rolePolicies)) {
          const rolePoliciesActions = rolePolicies[0].grants.grants.map((grant) => grant.action)
          data.forEach((item) => {
            item.actions.forEach((action) => {
              action.isSelected = rolePoliciesActions.includes(`${item.group}/${action.action}`)
            })
          })
        }
        setActions(data)
        setActionsCopyForReset(cloneDeep(data))
      })
    })
  }

  const updatePoliciesOnRole = function () {
    const payload = { grants: [] }
    actions.forEach((group) => {
      group.actions.map((action) => {
        if (action.isSelected) {
          payload.grants.push(`${group.group}/${action.action}`)
        }
      })
    })
    callUpdateRolePoliciesApi(id, payload, () => {
      fetchActions()
    })
  }

  useEffect(() => {
    const headerData = {
      activeMenuItem: 'roles',
      activeParent: 'agm',
    }
    headerAction(headerData)
  }, [])

  useEffect(() => {
    callRolesByIdApi(id, (data) => {
      setDetail(data)
    })
    fetchActions()
  }, [])

  /**
   * renders JSX of Edit User container component
   * @param user
   */
  return (
    <EditRole
      detail={detail}
      onReset={onReset}
      actions={actions}
      setActions={setActions}
      updatePoliciesOnRole={updatePoliciesOnRole}
    />
  )
}

EditRoleContainer.propTypes = {
  headerAction: PropTypes.func,
  callRolesByIdApi: PropTypes.func,
  customRoleResourcesCall: PropTypes.func,
  attachDettachRolesCall: PropTypes.func,
  callActionsApi: PropTypes.func,
  callRolePoliciesApi: PropTypes.func,
  callUpdateRolePoliciesApi: PropTypes.func,
}

EditRoleContainer.defaultProps = {
  headerAction: () => {},
  callRolesByIdApi: () => {},
  customRoleResourcesCall: () => {},
  attachDettachRolesCall: () => {},
  callActionsApi: () => {},
  callRolePoliciesApi: () => {},
  callUpdateRolePoliciesApi: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  callRolesByIdApi,
  callActionsApi,
  callRolePoliciesApi,
  callUpdateRolePoliciesApi,
})(EditRoleContainer)
