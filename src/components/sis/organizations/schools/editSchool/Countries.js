import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import { Search } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { TablePageData } from '../../../../../helpers/constants'
import { isEmpty } from '../../../../../helpers/utils'
import CustomTable from '../../../../table/CustomTable'

function Countries({
  onCountrySearchEnter,
  searchCountry,
  setSearchText,
  onApplyFilter,
  resetCountryState,
  editCountries,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  countries,
  checkStateCountry,
  onCheckCountry,
  pageDetails,
  onChangePage,
  setPageDetails,
  onReset,
  fetchCountries,
  paginationMidState,
}) {
  const { t } = useTranslation()
  const dataParameter = 'id'
  const allHeadCells = [
    {
      id: 'name',
      label: t('countryName'),
      isSort: true,
      sortProperty: 'name',
    },
    {
      id: 'isoCode',
      label: t('countryCode'),
      isSort: true,
      sortProperty: 'isoCode',
      width: '150px',
    },
  ]

  return (
    <>
      <Box px={2} py={2} width="100%">
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={10}>
                <TextField
                  className="custom-input-field input-search"
                  name="search"
                  variant="outlined"
                  fullWidth
                  size="small"
                  id="countrySearch"
                  autoComplete="search"
                  placeholder={t('fields:searchCountries')}
                  onKeyDown={onCountrySearchEnter}
                  value={searchCountry}
                  onChange={setSearchText}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="Press enter to search" onClick={onApplyFilter}>
                          <Search className="icon-color-light rotate90" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  className="text-transform-none"
                  disableElevation
                  variant="text"
                  color="primary"
                  onClick={() => onReset()}
                  disabled={isEmpty(searchCountry)}
                >
                  {t('reset')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              mt={{ xs: 1, sm: 0 }}
              display="flex"
              alignItems="center"
              justifyContent={{
                xs: 'flex-start',
                sm: 'flex-end',
                md: 'flex-end',
              }}
            >
              <Button
                className="custom-default-button text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                onClick={resetCountryState}
              >
                {t('reset')}
              </Button>
              <Box ml={2}>
                <Button
                  className="text-transform-none"
                  size="large"
                  variant="contained"
                  disableElevation
                  color="primary"
                  onClick={editCountries}
                >
                  {t('updateSave')}
                </Button>
              </Box>
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
        data={countries}
        headCells={allHeadCells}
        selected={checkStateCountry}
        setSelected={onCheckCountry}
        dataParameter={dataParameter}
        isSelection={true}
      >
        {countries.map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={onCheckCountry}
                  checked={checkStateCountry.includes(row.id.toString())}
                  name={row.id}
                  color="primary"
                />
              </TableCell>
              <TableCell tabIndex={0}>{row.name}</TableCell>
              <TableCell tabIndex={0}>{row.id}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
      <Box
        width="100%"
        px={2}
        py={2}
        display="flex"
        justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems="center"
      >
        <Pagination
          count={pageDetails.last_page}
          shape="rounded"
          color="primary"
          onChange={onChangePage}
          page={pageDetails.page}
        />
        <Box mt={{ xs: 1, sm: 0 }} display="flex" alignItems="center">
          <Box mr={1}>
            <TextField
              select
              // className={classes.fieldSearch}
              size="small"
              variant="outlined"
              id="search"
              name="search"
              autoComplete="search"
              type="search"
              value={pageDetails.per_page}
              onChange={(event) => {
                paginationMidState.per_page = event.target.value
                paginationMidState.current_page = 1
                setPageDetails((oldState) => ({
                  ...oldState,
                  per_page: paginationMidState.per_page,
                }))
                fetchCountries()
              }}
            >
              {TablePageData.per_page_options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Typography component="p" variant="body2">
            Showing {countries.length} rows out of {pageDetails.total}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

Countries.propTypes = {
  allHeadCells: PropTypes.array,
  allHeadCells2: PropTypes.array,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  StatesData: PropTypes.array,
  pageDetails: PropTypes.object,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  defaultCountry: PropTypes.array,
  defaultPhoneCode: PropTypes.array,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  countries: PropTypes.Array,
  searchCountry: PropTypes.String,
  checkStateCountry: PropTypes.object,
  onCheckCountry: PropTypes.func,
  setSearchText: PropTypes.func,
  onCountrySearchEnter: PropTypes.func,
  editCountries: PropTypes.func,
  resetCountryState: PropTypes.func,
  onChangeDefaultCountry: PropTypes.func,
  onPageChangeCountry: PropTypes.func,
  onApplyFilter: PropTypes.func,
  onReset: PropTypes.func,
  setPageDetails: PropTypes.func,
  fetchCountries: PropTypes.func,
  paginationMidState: PropTypes.func,
}
Countries.defaultProps = {
  allHeadCells: [],
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  countries: [],
  onApplyFilter: () => {},
  pageDetails: {},
  onReset: () => {},
  setPageDetails: () => {},
  fetchCountries: () => {},
  paginationMidState: () => {},
}

export default Countries
