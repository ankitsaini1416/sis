import { Box, TableCell, TableRow, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { getSorting, stableSort } from '../../../../helpers/utils'
import CustomTable from '../../../table/CustomTable'

function OtherInfo({ order, orderBy, setOrder, setOrderBy }) {
  const { t } = useTranslation()
  const dataParameter = 'id'

  const allHeadCells = [
    {
      id: 'role_name',
      label: t('roleName'),
      isSort: true,
      sortProperty: 'role_name',
    },
    {
      id: 'role_description',
      label: t('roleDescription'),
      isSort: true,
      sortProperty: 'role_description',
    },
    { id: 'date', label: t('date'), isSort: true, sortProperty: 'date' },
  ]
  const OtherInfoData = [
    {
      role_name: 'District Admin',
      role_description: 'District Admin is a supervisor of a district',
      date: '07/07/21 12:00:00 AM',
    },
    {
      role_name: 'Achool Admin',
      role_description: 'School Admin is a supervisor of a school',
      date: '07/07/21 12:00:00 AM',
    },
  ]
  const allHeadCells2 = [
    {
      id: 'district_id',
      label: t('districtID'),
      isSort: true,
      sortProperty: 'district_id',
    },
    {
      id: 'district_name',
      label: t('districtName'),
      isSort: true,
      sortProperty: 'district_name',
    },
    {
      id: 'school_id',
      label: t('schoolID'),
      isSort: true,
      sortProperty: 'school_id',
    },
    {
      id: 'school_name',
      label: t('schoolName'),
      isSort: true,
      sortProperty: 'school_name',
    },
    {
      id: 'date_created',
      label: t('dateCreated'),
      isSort: true,
      sortProperty: 'date_created',
    },
    {
      id: 'date_modified',
      label: t('dateModified'),
      isSort: true,
      sortProperty: 'date_modified',
    },
  ]
  const OtherInfoData2 = [
    {
      district_id: 'OC-2001',
      district_name: 'Orange County',
      school_id: 'EHS-1101',
      school_name: 'Excel High School',
      date_created: 'Orange County',
      date_modified: 'EHS-1101',
    },
    {
      district_id: 'OC-2001',
      district_name: 'Orange County',
      school_id: 'EHS-1101',
      school_name: 'Excel High School',
      date_created: 'Orange County',
      date_modified: 'EHS-1101',
    },
  ]
  return (
    <Box pb={{ xs: 0, sm: 3, lg: 4 }}>
      <Box className="bg-color-surface" mb={{ xs: 2, lg: 2 }}>
        <Typography component="" align="left" variant="body2" color="Primary" tabIndex={0}>
          <Box component="span" fontWeight="600" fontSize="16px">
            {t('assignedRoles')}
          </Box>
        </Typography>
      </Box>

      <CustomTable
        noDataMessage={t('dataNotFound')}
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        data={OtherInfoData}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {stableSort(OtherInfoData, getSorting(order, orderBy)).map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell tabIndex={0}>{row.role_name}</TableCell>
              <TableCell tabIndex={0}>{row.role_description}</TableCell>
              <TableCell tabIndex={0}>{row.date}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>

      <Box className="bg-color-surface" mb={{ xs: 2, lg: 2 }} mt={{ xs: 2, lg: 5 }}>
        <Typography component="" align="left" variant="body2" color="Primary" tabIndex={0}>
          <Box component="span" fontWeight="600" fontSize="16px">
            {t('schoolsAndDistricts')}
          </Box>
        </Typography>
      </Box>

      <CustomTable
        noDataMessage={t('dataNotFound')}
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        data={OtherInfoData2}
        headCells={allHeadCells2}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {stableSort(OtherInfoData2, getSorting(order, orderBy)).map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell tabIndex={0}>{row.district_id}</TableCell>
              <TableCell tabIndex={0}>{row.district_name}</TableCell>
              <TableCell tabIndex={0}>{row.school_id}</TableCell>
              <TableCell tabIndex={0}>{row.school_name}</TableCell>
              <TableCell tabIndex={0}>{row.date_created}</TableCell>
              <TableCell tabIndex={0}>{row.date_modified}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
    </Box>
  )
}

OtherInfo.propTypes = {
  allHeadCells: PropTypes.array,
  allHeadCells2: PropTypes.array,
  onChangeRowsPerPage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  OtherInfoData: PropTypes.array,
  OtherInfoData2: PropTypes.array,
}
OtherInfo.defaultProps = {
  allHeadCells: [],
  allHeadCells2: [],
  onChangeRowsPerPage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  OtherInfoData: [],
  OtherInfoData2: [],
}

export default OtherInfo
