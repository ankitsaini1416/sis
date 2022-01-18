import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import RouterContext from './../../contexts/route.context'
import { getSchoolUrl } from './../../helpers/utils'

const RedirectLink = ({ children, to }) => {
  const { params } = useContext(RouterContext)
  const url = getSchoolUrl({ ...params, to })
  return (
    <Link to={url} className="link-text">
      {children}
    </Link>
  )
}

RedirectLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.element,
}
RedirectLink.defaultProps = {
  to: '',
  children: null,
}

export default RedirectLink
