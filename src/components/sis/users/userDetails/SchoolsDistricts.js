import { Box, IconButton, Paper, TableCell, TableRow, Tooltip, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
// import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import { PlusCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import ConfirmBox from '../../../common/ConfirmBox'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../User.Style'
import AssignSchoolDistrict from './AssignSchoolDistrict'

function SchoolsDistricts({
  detachOrganization,
  districts,
  schools,
  searchSchools,
  attachOrganization,
  organizationList,
  openDeletePopup,
  toggleDeletePopup,
  authUser,
  orgType,
  setOrgType,
}) {
  const { t } = useTranslation()
  const classes = useStyles()
  const onDetach = function () {
    detachOrganization()
  }
  const [assignSchoolDistrictModal, setAssignSchoolDistrictModal] = React.useState(false)
  const toggleAssignSchoolDistrict = () => {
    setAssignSchoolDistrictModal(!assignSchoolDistrictModal)
  }
  const dataParameter = 'id'

  const allHeadCells = [
    {
      id: 'district_id',
      label: t('districtID'),
      isSort: false,
      sortProperty: 'district_id',
    },
    {
      id: 'district_name',
      label: t('districtName'),
      isSort: false,
      sortProperty: 'district_name',
    },
    {
      id: 'school_id',
      label: t('schoolID'),
      isSort: false,
      sortProperty: 'school_id',
    },
    {
      id: 'school_name',
      label: t('schoolName'),
      isSort: false,
      sortProperty: 'school_name',
    },
    {
      id: 'date_created',
      label: t('dateCreated'),
      isSort: false,
      sortProperty: 'date_created',
    },
    {
      id: 'date_modified',
      label: t('dateModified'),
      isSort: false,
      sortProperty: 'date_modified',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
    },
  ]
  const viewDetail = (row) => {
    return (
      <Tooltip title={t('revokeAccess')}>
        <IconButton
          onClick={toggleDeletePopup}
          data-id={row.dst_id || row.sch_id || row.id}
          className="icon-button-red"
        >
          <X width="16px" height="16px" />
        </IconButton>
      </Tooltip>
    )
  }
  return (
    <Paper rounded={true} elevation={1} className="paper-round">
      <Box px={3} py={1} width="100%">
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('schoolsAndDistricts')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              mt={{ xs: 1, lg: 0 }}
            >
              <Button
                className="text-transform-none"
                size="large"
                variant="contained"
                color="primary"
                disableElevation
                startIcon={<PlusCircle />}
                onClick={toggleAssignSchoolDistrict}
              >
                {t('assignSchoolsAndDistricts')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <CustomTable
        noDataMessage={t('dataNotFound')}
        // order={orderEntities}
        // orderBy={orderByEntities}
        // setOrder={setOrderEntities}
        // setOrderBy={setOrderByEntities}
        data={organizationList}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {organizationList.map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell tabIndex={0}>{row.dst_district_public_id || '-'}</TableCell>
              <TableCell tabIndex={0}>{row.dst_name || '-'}</TableCell>
              <TableCell tabIndex={0}>{row.sch_school_public_id || '-'}</TableCell>
              <TableCell tabIndex={0}>{row.sch_name || '-'}</TableCell>
              <TableCell tabIndex={0}>{row.createdTimeLabel}</TableCell>
              <TableCell tabIndex={0}>{row.updatedTimeLabel}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{viewDetail(row)}</TableCell>
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
      >
        <Pagination
          count={pageDetailsEntities.last_page}
          shape="rounded"
          color="primary"
          onChange={onChangePageEntities}
          page={pageDetailsEntities.page}
          variant="text"
          className="custom-pagination"
        />
        <Box mt={{ xs: 1, sm: 0 }}>
          <Typography component="p" variant="body2" tabIndex={0}>
            Showing {organizationList.length} rows out of {pageDetailsEntities.total}
          </Typography>
        </Box>
      </Box> */}
      <AssignSchoolDistrict
        districts={districts}
        schools={schools}
        searchSchools={searchSchools}
        attachOrganization={attachOrganization}
        open={assignSchoolDistrictModal}
        onClose={toggleAssignSchoolDistrict}
        authUser={authUser}
        orgType={orgType}
        setOrgType={setOrgType}
      />
      <ConfirmBox
        maxWidth="xs"
        open={openDeletePopup}
        close={toggleDeletePopup}
        onConfirm={onDetach}
        defaultProps={{ message: 'archiveConfirmation', buttonText: 'archive' }}
      />
    </Paper>
  )
}

SchoolsDistricts.propTypes = {
  detachOrganization: PropTypes.func,
  districts: PropTypes.array,
  schools: PropTypes.array,
  searchSchools: PropTypes.func,
  attachOrganization: PropTypes.func,
  organizationList: PropTypes.array,
  openDeletePopup: PropTypes.bool,
  toggleDeletePopup: PropTypes.func,
  authUser: PropTypes.object,
  orgType: PropTypes.string,
  setOrgType: PropTypes.func,
}
SchoolsDistricts.defaultProps = {
  detachOrganization: () => {},
  districts: [],
  schools: [],
  searchSchools: () => {},
  attachOrganization: () => {},
  organizationList: [],
  openDeletePopup: false,
  toggleDeletePopup: () => {},
  authUser: {},
  orgType: () => {},
  setOrgType: () => {},
}

export default SchoolsDistricts
