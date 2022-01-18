import {
  Box,
  IconButton,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, Check, Edit2, Plus, Settings, Trash, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import EmptyDashboard from '../../../assets/images/empty-dashboard.svg'
import { ROUTES } from '../../../helpers/constants'
import { get, isEmpty } from '../../../helpers/utils'
import withRedirect from '../../../hocs/RedirectHOC'
import ConfirmBox from '../../common/ConfirmBox'
import CustomTable from '../../table/CustomTable'
import useStyles from '../settings/Settings.Style'
import Breadcrumb from './../../breadcrumbs/Breadcrumbs'
import AddDashboard from './AddDashboard'

function DashboardList({
  openDeletePopup,
  toggleDeletePopup,
  addDashboard,
  dashboards,
  deleteDashboard,
  dashboardWidgetList,
  updateDashboard,
}) {
  const { t } = useTranslation()
  const classes = useStyles()
  const dataParameter = 'id'
  const [addDashboardModal, setAddDashboardModal] = React.useState(false)

  const toggleAddDashboard = () => {
    setAddDashboardModal(!addDashboardModal)
  }
  const [updateId, setUpdateId] = React.useState({})

  const toggleEditModal = (event) => {
    const id = get(event, 'currentTarget.attributes.data-id.value', '')
    const dashboard = dashboards.find((board) => board.id === id)
    if (id) {
      setUpdateId({ name: dashboard.name, id })
    } else {
      setUpdateId({})
    }
  }

  const onUpdate = () => {
    updateDashboard(
      updateId.id,
      {
        name: updateId.name,
      },
      () => {
        toggleEditModal()
      }
    )
  }

  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbDashboard'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('manageDashboard'),
      href: '',
    },
  ]

  const allHeadCells = [
    {
      id: 'name',
      label: t('name'),
      isSort: false,
      sortProperty: 'name',
    },
    {
      id: 'date_created',
      label: t('dateCreated'),
      isSort: false,
      sortProperty: 'date_created',
      width: '300',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '200px',
    },
  ]

  const editIcon = (row) => {
    return (
      <>
        <Tooltip title={t('edit')}>
          <IconButton
            data-id={row.id}
            color="primary"
            aria-label={t('edit')}
            onClick={toggleEditModal}
          >
            <Edit2 width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </>
    )
  }
  const updateActionIcon = (row) => {
    return (
      <>
        <Tooltip title={t('update')}>
          <IconButton
            className="icon-button-primary"
            disableElevation
            data-id={row.id}
            onClick={onUpdate}
            disabled={updateId.name.length < 1}
            color="primary"
            aria-label={t('update')}
          >
            <Check width="16px" height="16px" />
          </IconButton>
        </Tooltip>
        <Box ml={1}>
          <Tooltip title={t('cancel')}>
            <IconButton
              className="icon-button-secondary"
              disableElevation
              edge="end"
              data-id={row.id}
              onClick={() => toggleEditModal()}
              color="secondary"
              aria-label={t('cancel')}
            >
              <X width="16px" height="16px" />
            </IconButton>
          </Tooltip>
        </Box>
      </>
    )
  }
  const settingsIcon = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <>
        <Tooltip title={t('configuration')}>
          <IconButtonEnhanced
            edge="start"
            data-id={row.id}
            color="primary"
            to={`${ROUTES.DASHBOARD}/${row._id}`}
            aria-label={t('configuration')}
          >
            <Settings width="16px" height="16px" />
          </IconButtonEnhanced>
        </Tooltip>
      </>
    )
  }

  const deleteIcon = (row) => {
    return (
      <>
        <Tooltip title={t('delete')}>
          <IconButton
            edge="end"
            color="secondary"
            data-id={row._id}
            onClick={toggleDeletePopup}
            aria-label={t('delete')}
          >
            <Trash data-id={row._id} width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </>
    )
  }

  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('dashboard')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs="auto">
            {!isEmpty(dashboards) ? (
              <Button
                className="text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                color="primary"
                fullWidth
                startIcon={<Plus />}
                onClick={toggleAddDashboard}
              >
                {t('addDashboard')}
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        {isEmpty(dashboards) ? (
          <Box
            px={{ xs: 2, md: 4, xl: 6 }}
            py={{ xs: 2, md: 6, xl: 10 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            minHeight={{ xs: 'auto', xl: '700px' }}
          >
            <Box mb={3}>
              <img width={250} src={EmptyDashboard} alt="Empty Dashboard" />
            </Box>
            <Box mb={3} fontSize={{ xs: 20, md: 24, lg: 32 }} className="color-blue-grey">
              {t('emptyDashboard')}
            </Box>

            <Button
              className="text-transform-none"
              size="large"
              variant="contained"
              disableElevation
              color="primary"
              endIcon={<ArrowRight />}
              onClick={toggleAddDashboard}
            >
              {t('createNewDashboard')}
            </Button>
          </Box>
        ) : (
          <CustomTable
            noDataMessage={t('emptyDashboard')}
            data={dashboards}
            headCells={allHeadCells}
            dataParameter={dataParameter}
            isSelection={false}
          >
            {dashboards.map((row) => {
              return (
                <TableRow data-id={row.id} key={row.id}>
                  <TableCell tabIndex={0} className={open ? null : classes.verticalSpaceRemove}>
                    {updateId.id === row.id ? (
                      <Box display="flex" alignItems="center">
                        <Box width={{ xs: '200px', sm: '250px' }} mr={1}>
                          <TextField
                            className="custom-input-field"
                            name="q"
                            value={updateId.name}
                            onChange={(event) => {
                              setUpdateId({
                                ...updateId,
                                name: event.target.value,
                              })
                            }}
                            variant="outlined"
                            fullWidth
                            size="small"
                            id="q"
                            autoComplete="q"
                            placeholder={t('fields:name')}
                          />
                        </Box>
                        {updateActionIcon(row)}
                      </Box>
                    ) : (
                      <>
                        <Box component="span" mr={1}>
                          {row.name}
                        </Box>
                        {editIcon(row)}
                      </>
                    )}
                  </TableCell>
                  <TableCell tabIndex={0}>{row.createdAtLabel}</TableCell>
                  <TableCell className={classes.verticalSpaceRemove}>
                    {settingsIcon(row)} {deleteIcon(row)}
                  </TableCell>
                </TableRow>
              )
            })}
          </CustomTable>
        )}
      </Paper>

      <AddDashboard
        open={addDashboardModal}
        onClose={toggleAddDashboard}
        addDashboard={addDashboard}
        dashboardWidgetList={dashboardWidgetList}
      />
      <ConfirmBox
        maxWidth="xs"
        open={openDeletePopup}
        close={toggleDeletePopup}
        onConfirm={deleteDashboard}
        defaultProps={{ message: 'deleteConfirmation', buttonText: 'delete' }}
      />
    </>
  )
}

DashboardList.propTypes = {
  openDeletePopup: PropTypes.bool,
  toggleDeletePopup: PropTypes.func,
  addDashboard: PropTypes.func,
  dashboards: PropTypes.array,
  deleteDashboard: PropTypes.func,
  dashboardWidgetList: PropTypes.array,
  updateDashboard: PropTypes.func,
}
DashboardList.defaultProps = {
  toggleDeletePopup: () => {},
  openDeletePopup: false,
  addDashboard: () => {},
  dashboards: [],
  deleteDashboard: () => {},
  dashboardWidgetList: [],
  updateDashboard: () => {},
}

export default DashboardList
