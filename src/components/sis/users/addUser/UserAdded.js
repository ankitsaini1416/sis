import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import { PROCESSSTATUSES } from './../../../../helpers/constants'

const getCompletionClass = function (status) {
  if (status === PROCESSSTATUSES.ACTIVE) {
    return 'active'
  } else if (status === PROCESSSTATUSES.COMPLETED) {
    return 'completed'
  } else {
    return ''
  }
}

function UserAdded({ process }) {
  return (
    <Box px={{ xs: 2, sm: 3 }} pt={{ xs: 2, sm: 3 }} width="100%" mb={3}>
      <div className="user-progress">
        <div className={clsx('circle', getCompletionClass(process.orgInfo))} tabIndex={0}>
          <span></span>
          <Box mt={1} align="center" component="div" fontWeight={500}>
            District/School Added
          </Box>
        </div>
        <div className={clsx('circle', getCompletionClass(process.userInfo))} tabIndex={0}>
          <span></span>
          <Box px={2} mt={1} align="center" component="div" fontWeight={500}>
            User created
          </Box>
        </div>
        <div className={clsx('circle', getCompletionClass(process.roleInfo))} tabIndex={0}>
          <span></span>
          <Box px={2} mt={1} align="center" component="div" fontWeight={500}>
            Assigned Role
          </Box>
        </div>
      </div>
      {process.roleInfo === PROCESSSTATUSES.COMPLETED && (
        <Box mt={3} mb={3} px={3}>
          <Typography
            component="div"
            align="center"
            variant="h5"
            className="text-green"
            gutterBottom
            tabIndex={0}
          >
            <Box width="100%" component="span" fontWeight="600" fontSize="16px">
              User added successfully.
            </Box>
          </Typography>
        </Box>
      )}
    </Box>
  )
}

UserAdded.propTypes = {
  process: PropTypes.object,
}

UserAdded.defaultProps = {
  process: {},
}

export default UserAdded
