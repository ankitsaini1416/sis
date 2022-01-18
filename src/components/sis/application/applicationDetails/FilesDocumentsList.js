import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckCircle, Download, Search, Trash } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { getSorting, stableSort } from '../../../../helpers/utils'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../Application.Style'
import UploadFiles from './UploadFiles'

function FilesDocumentsList({ onChangePage, order, orderBy, setOrder, setOrderBy, pageDetails }) {
  const { t } = useTranslation()
  const classes = useStyles()
  const dataParameter = 'id'
  const [uploadFileModal, setUploadFileModal] = React.useState(false)
  const toggleUploadFiles = () => {
    setUploadFileModal(!uploadFileModal)
  }
  const allHeadCells = [
    { id: 'file_name', label: t('fileName'), isSort: true, sortProperty: 'file_name' },
    {
      id: 'uploaded_by',
      label: t('uploadedBy'),
      isSort: true,
      sortProperty: 'uploaded_by',
    },
    {
      id: 'uploaded_on',
      label: t('uploadedOn'),
      isSort: true,
      sortProperty: 'uploaded_on',
    },
    {
      id: 'action',
      label: t('actions'),
      isSort: false,
      sortProperty: 'action',
      width: '150px',
    },
  ]

  const FilesDocumentsData = [
    {
      file_name: 'Licensce',
      uploaded_by: 'Mathew John',
      uploaded_on: '7/30/2021 10:00 AM',
    },
    {
      file_name: 'School Transript',
      uploaded_by: 'Mathew John',
      uploaded_on: '7/30/2021 10:00 AM',
    },
    {
      file_name: 'Birth Certificate',
      uploaded_by: 'Mathew John',
      uploaded_on: '7/30/2021 10:00 AM',
    },
  ]
  const downloadDetail = (row) => {
    return (
      <Tooltip title={t('download')}>
        <IconButton aria-label={t('download')} edge="start" data-id={row.id} color="primary">
          <Download width="16px" height="16px" />
        </IconButton>
      </Tooltip>
    )
  }
  const deleteDetail = (row) => {
    return (
      <Tooltip title={t('delete')}>
        <IconButton aria-label={t('delete')} data-id={row.id} color="secondary">
          <Trash width="16px" height="16px" />
        </IconButton>
      </Tooltip>
    )
  }

  const fileName = (row) => {
    return (
      <Typography tabIndex={0} variant="body2" data-id={row.id} id={row.id} component="p">
        <Box component="div" display="flex" alignItems="center">
          <Box component="span" mr={1}>
            {row.file_name}
          </Box>
          <CheckCircle width="16px" height="16px" className="text-success" />
        </Box>
      </Typography>
    )
  }

  return (
    <>
      <Box px={{ xs: 2, md: 0 }} mb={2} width="100%">
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item xs={12} md={6} lg={6} xl={4}>
            <TextField
              className="custom-input-field"
              name="search"
              variant="outlined"
              fullWidth
              size="small"
              id="search"
              autoComplete="search"
              placeholder={t('searchByFileName')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="Press enter to search">
                      <Search className="icon-color-light rotate90" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm="auto">
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
          </Grid>
        </Grid>
      </Box>

      <CustomTable
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        data={FilesDocumentsData}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {stableSort(FilesDocumentsData, getSorting(order, orderBy)).map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell tabIndex={0}>{fileName(row)}</TableCell>
              <TableCell tabIndex={0}>{row.uploaded_by}</TableCell>
              <TableCell tabIndex={0}>{row.uploaded_on}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>
                {downloadDetail(row)} {deleteDetail(row)}
              </TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
      <Box
        display="flex"
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
          <Typography tabIndex={0} component="p" variant="body2">
            Showing {FilesDocumentsData.length} rows out of {pageDetails.total}
          </Typography>
        </Box>
      </Box>
      <UploadFiles open={uploadFileModal} onClose={toggleUploadFiles} />
    </>
  )
}

FilesDocumentsList.propTypes = {
  allHeadCells: PropTypes.array,
  allHeadCells2: PropTypes.array,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  FilesDocumentsData: PropTypes.array,
  StatesData: PropTypes.array,
  pageDetails: PropTypes.object,
}
FilesDocumentsList.defaultProps = {
  allHeadCells: [],
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  FilesDocumentsData: [],
  pageDetails: {},
}

export default FilesDocumentsList
