import {
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination'
import { Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Download, Search, Trash, Upload } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { getSorting, stableSort } from '../../../../helpers/utils'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../User.Style'
import UploadFiles from './UploadFiles'

function FileDocuments({ onChangePage, order, orderBy, setOrder, setOrderBy, pageDetails }) {
  const { t } = useTranslation()
  const classes = useStyles()
  const [checkState, setCheckState] = React.useState([])
  const onCheck = (event) => {
    if (Array.isArray(event)) {
      return setCheckState(event.map((item) => item))
    }
    const id = event.target.name
    if (checkState.includes(id)) {
      setCheckState(checkState.filter((item) => item !== id))
    } else {
      setCheckState((oldState) => [...oldState, id])
    }
  }
  const [uploadFileModal, setUploadFileModal] = React.useState(false)
  const toggleUploadFiles = () => {
    setUploadFileModal(!uploadFileModal)
  }
  const dataParameter = 'id'

  const allHeadCells = [
    {
      id: 'file_name',
      label: t('name'),
      isSort: true,
      sortProperty: 'file_name',
    },
    {
      id: 'upload_by',
      label: t('uploadBy'),
      isSort: true,
      sortProperty: 'upload_by',
    },
    {
      id: 'last_updated',
      label: t('lastUpdated'),
      isSort: true,
      sortProperty: 'last_updated',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '100px',
    },
  ]
  const FileDocumentsData = [
    {
      file_name: 'Password',
      upload_by: 'John Doe',
      last_updated: '07/07/21 12:00:00 AM',
    },
    {
      file_name: 'Driver License',
      upload_by: 'John Doe',
      last_updated: '07/07/21 12:00:00 AM',
    },
    {
      file_name: 'Social Security Card',
      upload_by: 'John Doe',
      last_updated: '07/07/21 12:00:00 AM',
    },
    {
      file_name: 'Birth Certificate',
      upload_by: 'John Doe',
      last_updated: '07/07/21 12:00:00 AM',
    },
  ]
  const viewDetail = (row) => {
    return (
      <Box whiteSpace="nowrap">
        <Tooltip title={t('download')}>
          <IconButton edge="start" data-id={row.id} color="primary">
            <Download width="16px" height="16px" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('delete')}>
          <IconButton edge="end" data-id={row.id} color="secondary">
            <Trash width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }
  return (
    <Paper rounded={true} elevation={1} className="paper-round">
      <Formik onSubmit="">
        {() => (
          <Form className={classes.form} noValidate autoComplete="off">
            <Box px={3} py={3} width="100%">
              <Grid container spacing={2} justify="space-between" alignItems="center">
                <Grid item xs={12} sm={6} md={6} xl={4}>
                  <Grid container alignItems="center">
                    <Grid item xs={10}>
                      <Field
                        className="custom-input-field input-search"
                        name="search"
                        variant="outlined"
                        as={TextField}
                        fullWidth
                        size="small"
                        id="search"
                        autoComplete="search"
                        placeholder={t('fields:search')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton>
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
                      >
                        {t('reset')}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Box
                    display="flex"
                    justifyContent={{
                      xs: 'flex-start',
                      sm: 'flex-start',
                      lg: 'flex-end',
                    }}
                    alignItems="center"
                  >
                    <Box mr={1}>
                      <Button
                        className="text-transform-none"
                        onClick={toggleUploadFiles}
                        size="large"
                        variant="outlined"
                        disableElevation
                        startIcon={<Upload />}
                        color="primary"
                      >
                        {t('uploadFiles')}
                      </Button>
                    </Box>
                    <Button
                      className="text-transform-none"
                      size="large"
                      variant="outlined"
                      disableElevation
                      color="secondary"
                    >
                      {t('delete')}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>

      <CustomTable
        noDataMessage={t('dataNotFound')}
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        data={FileDocumentsData}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        selected={checkState}
        setSelected={onCheck}
        isSelection={true}
      >
        {stableSort(FileDocumentsData, getSorting(order, orderBy)).map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  name={row.id}
                  onChange={onCheck}
                  checked={checkState.includes(row.id)}
                  color="primary"
                />
              </TableCell>
              <TableCell tabIndex={0}>{row.file_name}</TableCell>
              <TableCell tabIndex={0}>{row.upload_by}</TableCell>
              <TableCell tabIndex={0}>{row.last_updated}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{viewDetail(row)}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
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
          <Typography component="p" variant="body2" tabIndex={0}>
            Showing {FileDocumentsData.length} rows out of {pageDetails.total}
          </Typography>
        </Box>
      </Box>
      <UploadFiles open={uploadFileModal} onClose={toggleUploadFiles} />
    </Paper>
  )
}

FileDocuments.propTypes = {
  allHeadCells: PropTypes.array,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  FileDocumentsData: PropTypes.array,
  pageDetails: PropTypes.object,
}
FileDocuments.defaultProps = {
  allHeadCells: [],
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  FileDocumentsData: [],
  pageDetails: {},
}

export default FileDocuments
