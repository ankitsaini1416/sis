import { Box, IconButton, TableCell, TableRow, Tooltip, Typography } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import { Eye } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../../../helpers/constants'
import { get } from '../../../../../helpers/utils'
import withRedirect from '../../../../../hocs/RedirectHOC'
import CustomTable from '../../../../table/CustomTable'
import useStyles from '../../Organizations.Style'
function Schools({
  onChangePage,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  schools,
  allHeadCells,
  pageDetails,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const dataParameter = 'id'

  const viewDetail = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <IconButtonEnhanced data-id={row.id} color="primary" to={`${ROUTES.SCHOOLDETAILS}/${row.id}`}>
        <Tooltip title={t('viewDetail')}>
          <Eye width="16px" height="16px" />
        </Tooltip>
      </IconButtonEnhanced>
    )
  }
  return (
    <Box>
      <CustomTable
        noDataMessage={t('dataNotFound')}
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        data={schools}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {schools.map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell tabIndex={0}>{row.sch_school_public_id}</TableCell>
              <TableCell tabIndex={0}>{row.sch_name}</TableCell>
              <TableCell tabIndex={0}>{get(row, 'sch_district.dst_name', '')}</TableCell>
              <TableCell tabIndex={0}>{t(`reference:${row.sch_school_type}`)}</TableCell>
              <TableCell tabIndex={0}>{row.sch_slug}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{viewDetail(row)}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
      {pageDetails.total > 0 ? (
        <Box
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
              Showing {schools.length} rows out of {pageDetails.total}
            </Typography>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}

Schools.propTypes = {
  district: PropTypes.object,
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  schools: PropTypes.array,
  allHeadCells: PropTypes.array,
  pageDetails: PropTypes.object,
}
Schools.defaultProps = {
  district: {},
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  schools: [],
  allHeadCells: [],
  pageDetails: {},
}

export default Schools
