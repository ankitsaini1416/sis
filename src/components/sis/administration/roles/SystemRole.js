import { TableCell, TableRow } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CustomTable from '../../../table/CustomTable'

// import useStyles from '../roles/Roles.Style'

function SystemRole({ systemRoles }) {
  const { t } = useTranslation()
  // const classes = useStyles()
  const dataParameter = 'id'

  const allHeadCells = [
    {
      id: 'role_name',
      label: t('roleName'),
      isSort: false,
      sortProperty: 'role_name',
    },
    {
      id: 'role_description',
      label: t('roleDescription'),
      isSort: false,
      sortProperty: 'role_description',
    },
  ]
  return (
    <>
      <CustomTable
        noDataMessage={t('dataNotFound')}
        data={systemRoles}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {systemRoles.map((row) => {
          return (
            <TableRow hover data-id={row.urn} key={row.urn}>
              <TableCell tabIndex={0}>{row.name}</TableCell>
              <TableCell tabIndex={0}>{row.description}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
      {/* <Box
        display="flex"
        px={2}
        py={2}
        justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        className="custom-pagination"
      >
        <Pagination
          count={pageDetails.last_page}
          shape="rounded"
          color="primary"
          onChange={onChangePage}
          page={pageDetails.page}
          variant="text"
        />
        <Box mt={{ xs: 1, sm: 0 }}>
          <Typography component="p" variant="body2">
            Showing {CustomRoleData.length} rows out of {pageDetails.total}
          </Typography>
        </Box>
      </Box> */}
    </>
  )
}

SystemRole.defaultProps = {
  systemRoles: [],
}

SystemRole.propTypes = {
  systemRoles: PropTypes.array,
}

export default SystemRole
