import {
  Box,
  Button,
  Grid,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { Archive, Download } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { getSorting, stableSort } from '../../../../helpers/utils'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../Programs.Style'
import UploadFiles from './UploadFiles'

function FilesDetail({ order, orderBy, setOrder, setOrderBy }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const dataParameter = 'id'
  const allHeadCells = [
    {
      id: 'file_name',
      label: t('fileName'),
      isSort: true,
      sortProperty: 'file_name',
    },
    {
      id: 'uploaded_by',
      label: t('uploadedBy'),
      isSort: true,
      sortProperty: 'uploaded_by',
    },
    {
      id: 'file_description',
      label: t('fileDescription'),
      isSort: true,
      sortProperty: 'file_description',
    },
    {
      id: 'uploaded_on',
      label: t('uploadedOn'),
      isSort: true,
      sortProperty: 'uploaded_on',
    },
    {
      id: 'last_modified',
      label: t('lastModified'),
      isSort: true,
      sortProperty: 'last_modified',
    },
    {
      id: 'last_modified_by',
      label: t('lastModifiedBy'),
      isSort: true,
      sortProperty: 'last_modified_by',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
    },
  ]
  const DetailsData = [
    {
      file_name: 'Document 01',
      uploaded_by: 'John Doe (Super Admin)',
      file_description: 'Lorem Ipsum',
      uploaded_on: '07/06/2021 10:00:00 AM',
      last_modified: '07/06/2021 10:00:00 AM',
      last_modified_by: 'John Doe (Super Admin)',
      status: 'Active',
    },
    {
      file_name: 'Document 02',
      uploaded_by: 'John Doe (Super Admin)',
      file_description: 'Lorem Ipsum',
      uploaded_on: '07/06/2021 10:00:00 AM',
      last_modified: '07/06/2021 10:00:00 AM',
      last_modified_by: 'John Doe (Super Admin)',
      status: 'Active',
    },
  ]
  const [uploadFileModal, setUploadFileModal] = React.useState(false)
  const toggleUploadFiles = () => {
    setUploadFileModal(!uploadFileModal)
  }
  const ActionButton = (row) => {
    return (
      <>
        <Tooltip title={t('downloadFile')}>
          <IconButton data-id={row.id} color="primary" aria-label={t('downloadFile')}>
            <Download width="16px" height="16px" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('archive')}>
          <IconButton edge="end" data-id={row.id} color="secondary" aria-label={t('archive')}>
            <Archive width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </>
    )
  }

  return (
    <>
      <Box px={2} py={2}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="" align="left" variant="body2" tabIndex={0}>
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('programFiles')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              mt={{ xs: 1, sm: 0 }}
              display="flex"
              alignItems="center"
              justifyContent={{
                xs: 'flex-start',
                sm: 'flex-start',
                md: 'space-between',
              }}
            >
              <Button
                className="text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                color="primary"
                onClick={toggleUploadFiles}
              >
                {t('uploadFiles')}
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
        data={DetailsData}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {stableSort(DetailsData, getSorting(order, orderBy)).map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell tabIndex={0}>{row.file_name}</TableCell>
              <TableCell tabIndex={0}>{row.uploaded_by}</TableCell>
              <TableCell tabIndex={0}>{row.file_description}</TableCell>
              <TableCell tabIndex={0}>{row.uploaded_on}</TableCell>
              <TableCell tabIndex={0}>{row.last_modified}</TableCell>
              <TableCell tabIndex={0}>{row.last_modified_by}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{ActionButton(row)}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
      <UploadFiles open={uploadFileModal} onClose={toggleUploadFiles} />
    </>
  )
}
FilesDetail.propTypes = {
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  school: PropTypes.object,
}
FilesDetail.defaultProps = {
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  school: {},
}

export default FilesDetail
