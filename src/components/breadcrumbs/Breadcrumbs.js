import Breadcrumbs from '@material-ui/core/Breadcrumbs'
// import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { ChevronRight } from 'react-feather'
import { Link } from 'react-router-dom'

import RouterContext from './../../contexts/route.context'
import { getSchoolUrl } from './../../helpers/utils'

const SimpleBreadcrumbs = function ({ data }) {
  const { params } = useContext(RouterContext)
  return (
    <Breadcrumbs separator={<ChevronRight width="18px" />} aria-label="breadcrumb">
      {data.map((link, index) =>
        index < data.length - 1 ? (
          <Link
            className="breadcrumb-link"
            key={link.title}
            to={getSchoolUrl({ ...params, to: link.href })}
          >
            {link.title}
          </Link>
        ) : (
          <Typography tabIndex={0} variant="body2" key={link.title} color="textSecondary">
            {link.title}
          </Typography>
        )
      )}
    </Breadcrumbs>
  )
}

SimpleBreadcrumbs.propTypes = {
  data: PropTypes.array,
}

SimpleBreadcrumbs.defaultProps = {
  data: [],
}

export default SimpleBreadcrumbs
