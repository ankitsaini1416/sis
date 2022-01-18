import {
  Box,
  Button,
  Grid,
  IconButton,
  // InputAdornment,
  TableCell,
  TableRow,
  // TextField,
  Tooltip,
  // Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { Edit2, Plus, RefreshCw, Trash } from 'react-feather'
import { useTranslation } from 'react-i18next'

// import { ROUTES } from '../../../../../helpers/constants'
import { isEmpty } from '../../../../../helpers/utils'
import ConfirmBox from '../../../../common/ConfirmBox'
import CustomTable from '../../../../table/CustomTable'
import useStyles from './../../Organizations.Style'
import AddEditLMS from './AddEditLMS'
// import LMSSetup from './LMSSetup'

function LMSConfiguration({
  order,
  orderBy,
  setOrder,
  setOrderBy,
  lmsAction,
  setLmsAction,
  createLmsConfig,
  lmsList,
  configLmsList,
  removeLmsConfig,
  getAuthurl,
}) {
  const { t } = useTranslation()
  const classes = useStyles()
  const dataParameter = 'id'

  const allHeadCells = [
    {
      id: 'lms_name',
      label: t('lmsName'),
      isSort: false,
      sortProperty: 'lms_name',
    },
    {
      id: 'Alias',
      label: t('alias'),
      isSort: false,
      sortProperty: 'Alias',
    },
    {
      id: 'lms_status',
      label: t('status'),
      isSort: false,
      sortProperty: 'lms_status',
    },
    {
      id: 'action',
      label: t('actions'),
      isSort: false,
      sortProperty: 'action',
      width: '250px',
    },
  ]

  const onOpen = () => {
    setLmsAction({
      action: 'add',
    })
  }

  const onClose = () => {
    setLmsAction({})
  }
  const onEdit = (e) => {
    const id = e.currentTarget.attributes['data-id'].value
    const lmsItem = lmsList.find((item) => item.lmc_id.toString() === id)
    setLmsAction({
      action: 'edit',
      ...lmsItem,
    })
  }
  const onSync = (e) => {
    const id = e.currentTarget.attributes['data-id'].value
    getAuthurl(id)
  }
  const ActionButton = (row) => {
    return (
      <>
        <Tooltip title={t('syncLms')}>
          <IconButton
            data-id={row.lmc_id}
            color="primary"
            onClick={onSync}
            aria-label={t('syncLms')}
          >
            <RefreshCw width="16px" height="16px" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('editLms')}>
          <IconButton
            data-id={row.lmc_id}
            color="primary"
            onClick={onEdit}
            aria-label={t('editLms')}
          >
            <Edit2 width="16px" height="16px" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('delete')}>
          <IconButton
            onClick={toggleDeleteIntegration}
            aria-label={t('delete')}
            data-id={row.lmc_id}
            color="secondary"
          >
            <Trash width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </>
    )
  }
  const status = (row) => {
    if (row.lmc_active) {
      return (
        <Box component="span" className="label-green" id={row.lmc_id}>
          {t('active')}
        </Box>
      )
    } else {
      return (
        <Box component="span" className="label-red" id={row.lmc_id}>
          {t('inActive')}
        </Box>
      )
    }
  }
  const deleteIds = useRef('')

  const [deleteIntegrationModal, setDeleteIntegrationModal] = React.useState(false)

  const toggleDeleteIntegration = function (event) {
    if (!deleteIntegrationModal) {
      const dataIds = Array.isArray(event)
        ? [...event]
        : [event.currentTarget.attributes['data-id'].value]
      deleteIds.current = dataIds
      setDeleteIntegrationModal(true)
    } else {
      deleteIds.current = []
      setDeleteIntegrationModal(false)
    }
  }
  const onDeleteConfirm = function () {
    removeLmsConfig(deleteIds.current, { callback: toggleDeleteIntegration })
  }
  return (
    <>
      <Box px={2} py={2} width="100%">
        <Grid container spacing={2} justify="flex-end" alignItems="center">
          {/* <Grid item xs={12} sm={6} lg={4} xl={4}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={10}>
                <TextField
                  className="custom-input-field input-search"
                  variant="outlined"
                  fullWidth
                  size="small"
                  id="q"
                  name="q"
                  autoComplete="search"
                  placeholder={t('fields:search')}
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
          </Grid> */}
          <Grid item xs={12} sm="auto">
            <Button
              className="text-transform-none"
              size="large"
              variant="contained"
              disableElevation
              color="primary"
              startIcon={<Plus />}
              onClick={onOpen}
            >
              {t('addNewLMS')}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <CustomTable
        noDataMessage={t('dataNotFound')}
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        data={lmsList}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {lmsList?.map((row) => {
          return (
            <TableRow hover data-id={row.lmc_id} key={row.lmc_id}>
              <TableCell tabIndex={0}>{row.lmc_name}</TableCell>
              <TableCell tabIndex={0}>{row.lmc_alias}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{status(row)}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{ActionButton(row)}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
      {!isEmpty(lmsAction) && (
        <AddEditLMS
          open={true}
          onClose={onClose}
          callback={createLmsConfig}
          lmsAction={lmsAction}
          configLmsList={configLmsList}
          lmsList={lmsList}
        />
      )}
      <ConfirmBox
        maxWidth="xs"
        open={deleteIntegrationModal}
        close={toggleDeleteIntegration}
        onConfirm={onDeleteConfirm}
        defaultProps={{ message: 'deleteConfirmation', buttonText: 'delete' }}
      />
    </>
  )
}

LMSConfiguration.propTypes = {
  allHeadCells: PropTypes.array,
  allHeadCells2: PropTypes.array,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  CountriesData: PropTypes.array,
  StatesData: PropTypes.array,
  pageDetails: PropTypes.object,
  lmsAction: PropTypes.object,
  setLmsAction: PropTypes.func,
  createLmsConfig: PropTypes.func,
  lmsList: PropTypes.array,
  configLmsList: PropTypes.array,
  removeLmsConfig: PropTypes.func,
  getAuthurl: PropTypes.func,
}
LMSConfiguration.defaultProps = {
  allHeadCells: [],
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  CountriesData: [],
  pageDetails: {},
  lmsAction: {},
  setLmsAction: () => {},
  createLmsConfig: () => {},
  lmsList: [],
  configLmsList: [],
  removeLmsConfig: () => {},
  getAuthurl: () => {},
}

export default LMSConfiguration
