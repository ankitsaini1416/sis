import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, Edit2 } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../../helpers/constants'
import withRedirect from '../../../../hocs/RedirectHOC'
import SelectFilter from '../../../filters/Select'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../Settings.Style'

function EmailList({
  onChangePage,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  pageDetails,
  email,
  filter,
  setFilterValue,
  onFilterReset,
  onApplyFilter,
  districts,
  schools,
}) {
  const { t } = useTranslation()
  const classes = useStyles()

  const dataParameter = 'id'
  const status = (row) => {
    if (row.eml_is_enabled) {
      return (
        <Box component="span" className="label-green" id={row.id} tabIndex={0}>
          {t('active')}
        </Box>
      )
    } else {
      return (
        <Box component="span" className="label-red" id={row.id} tabIndex={0}>
          {t('inActive')}
        </Box>
      )
    }
  }

  const allHeadCells = [
    {
      id: 'email_name',
      label: t('emailName'),
      isSort: false,
      sortProperty: 'email_name',
    },
    {
      id: 'status',
      label: t('status'),
      isSort: false,
      sortProperty: 'status',
    },
    {
      id: 'date_created',
      label: t('dateCreated'),
      isSort: false,
      sortProperty: 'date_created',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '100px',
    },
  ]

  const editIcon = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <>
        <IconButtonEnhanced
          data-id={row.id}
          color="primary"
          to={`${ROUTES.EDITEMAIL}/${row.eml_id}/${row.eml_school?.sch_school_public_id}`}
          aria-label={t('edit')}
        >
          <Tooltip title={t('edit')}>
            <Edit2 width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>
      </>
    )
  }
  return (
    <>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box
          px={2}
          py={2}
          display="flex"
          width="100%"
          alignItems="flex-start"
          flexDirection="column"
        >
          <Typography component="h4" align="left" variant="h6" color="textPrimary" gutterBottom>
            <Box component="span" fontWeight="fontWeightMedium" fontSize="16px" tabIndex={0}>
              {t('filters')}
            </Box>
          </Typography>

          <Grid spacing={1} container className="filter-search-section">
            <Grid item xs={12} sm={4} md="auto">
              <SelectFilter
                name="districtId"
                filter={filter}
                setFilterValue={setFilterValue}
                options={districts}
                optionId="dst_id"
                optionName="dst_name"
                label={t('fields:district') + ':'}
                labelFallback={t('fields:selectDistrict')}
              />
            </Grid>
            <Grid item xs={12} sm={4} md="auto">
              <SelectFilter
                name="schoolId"
                filter={filter}
                setFilterValue={setFilterValue}
                label={t('fields:selectSchool') + ':'}
                labelFallback={t('fields:selectSchool')}
                options={schools}
                optionId="sch_id"
                optionName="sch_name"
              />
            </Grid>
            <Grid item xs={12} sm="auto" md="auto">
              <Box
                display="flex"
                justifyContent={{
                  xs: 'flex-start',
                  sm: 'flex-start',
                  md: 'flex-end',
                }}
                alignItems="center"
              >
                <Box mr={1}>
                  <Button
                    className="custom-default-button text-transform-none"
                    disableElevation
                    endIcon={<ArrowRight />}
                    variant="contained"
                    fullWidth
                    onClick={onApplyFilter}
                    disabled={!filter.schoolId}
                  >
                    {t('filter')}
                  </Button>
                </Box>
                <Button
                  className="text-transform-none"
                  disableElevation
                  variant="text"
                  color="primary"
                  onClick={onFilterReset}
                  disabled={!(filter.districtId || filter.schoolId)}
                >
                  {t('reset')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <CustomTable
          noDataMessage={t('dataNotFound')}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          data={email}
          headCells={allHeadCells}
          dataParameter={dataParameter}
          isSelection={false}
        >
          {email.map((row) => {
            return (
              <TableRow hover data-id={row.id} key={row.id}>
                <TableCell tabIndex={0}>{row.eml_name}</TableCell>
                <TableCell>{status(row)}</TableCell>
                <TableCell tabIndex={0}>{row.created_at}</TableCell>
                <TableCell className={classes.verticalSpaceRemove}>{editIcon(row)}</TableCell>
              </TableRow>
            )
          })}
        </CustomTable>
        {email.length > 0 && (
          <Box
            display="flex"
            px={2}
            py={2}
            justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems="center"
          >
            <Pagination
              count={pageDetails.last_page}
              shape="rounded"
              color="primary"
              onChange={onChangePage}
              page={pageDetails.page}
              variant="text"
              className="custom-pagination"
            />
            <Box mt={{ xs: 1, sm: 0 }}>
              <Typography component="p" variant="body2" tabIndex={0}>
                Showing {email.length} rows out of {pageDetails.total}
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </>
  )
}

EmailList.propTypes = {
  allHeadCells: PropTypes.array,
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  pageDetails: PropTypes.object,
  email: PropTypes.array,
  filter: PropTypes.object,
  setFilterValue: PropTypes.func,
  onFilterReset: PropTypes.func,
  onApplyFilter: PropTypes.func,
  districts: PropTypes.array,
  schools: PropTypes.array,
}

EmailList.defaultProps = {
  allHeadCells: [],
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  pageDetails: {},
  email: [],
  filter: {},
  setFilterValue: () => {},
  onFilterReset: () => {},
  onApplyFilter: () => {},
  districts: [],
  schools: [],
}

export default EmailList
