import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import GridOnIcon from '@material-ui/icons/GridOn'
import ListIcon from '@material-ui/icons/List'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import { Plus, Search } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../../helpers/constants'
import withRedirect from '../../../../hocs/RedirectHOC'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import AllTopicsGrid from './AllTopicsGrid'
import AllTopicsList from './AllTopicsList'

const ButtonEnhanced = withRedirect(Button)

function Notification({
  allHeadCells,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  pageDetails,
  topic,
  deleteItems,
  onChangePage,
  searchText,
  setSearchValue,
  onSearchEnter,
  handleClickListView,
  handleClickGridView,
  uiState,
  toggleDeletePopup,
  openDeletePopup,
  getTopicDetails,
  onReset,
  makeDefault,
}) {
  const { t } = useTranslation()
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbAdministration'),
      href: ROUTES.NOTIFICATION,
    },
    {
      title: t('breadcrumbNotification'),
      href: '',
    },
  ]

  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={6} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('notification')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <ButtonEnhanced
              className="text-transform-none"
              size="large"
              variant="contained"
              disableElevation
              color="primary"
              startIcon={<Plus />}
              to={ROUTES.ADDNEWTOPIC}
            >
              {t('addTopic')}
            </ButtonEnhanced>
          </Grid>
        </Grid>
      </Box>

      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={2} py={2} width="100%">
          <Grid container justify="space-between">
            <Grid item xs="auto">
              <Typography component="h4" align="left" variant="h5" color="Primary" tabIndex={0}>
                <Box fontWeight="500" fontSize="24px" mb={2}>
                  {t('topics')}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs="auto">
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                flexGrow={{ xs: 0, sm: 1 }}
              >
                <Tooltip title={t('listView')}>
                  <IconButton
                    edge="start"
                    color={uiState.spaceListType === 'list' ? 'primary' : 'default'}
                    onClick={handleClickListView}
                  >
                    <ListIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('gridView')}>
                  <IconButton
                    edge="end"
                    color={uiState.spaceListType === 'grid' ? 'primary' : 'default'}
                    onClick={handleClickGridView}
                  >
                    <GridOnIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8} sm={6} md={4} xl={3}>
              <TextField
                className="custom-input-field input-search"
                name="search"
                variant="outlined"
                fullWidth
                size="small"
                id="search"
                onChange={setSearchValue}
                value={searchText}
                onKeyDown={onSearchEnter}
                autoComplete="search"
                placeholder={t('fields:searchByNameDescriptionNotification')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => getTopicDetails()}>
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
                onClick={onReset}
              >
                {t('reset')}
              </Button>
            </Grid>
          </Grid>
        </Box>
        {uiState.spaceListType === 'grid' ? (
          <AllTopicsGrid
            pageDetails={pageDetails}
            onChangePage={onChangePage}
            topic={topic}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            toggleDeletePopup={toggleDeletePopup}
            deleteItems={deleteItems}
            openDeletePopup={openDeletePopup}
            makeDefault={makeDefault}
          />
        ) : (
          <AllTopicsList
            allHeadCells={allHeadCells}
            pageDetails={pageDetails}
            onChangePage={onChangePage}
            topic={topic}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            toggleDeletePopup={toggleDeletePopup}
            deleteItems={deleteItems}
            openDeletePopup={openDeletePopup}
            makeDefault={makeDefault}
          />
        )}
        {pageDetails.total > 0 ? (
          <Box
            display="flex"
            px={2}
            py={2}
            justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems="center"
          >
            <Pagination
              count={pageDetails.lastPage}
              shape="rounded"
              color="primary"
              onChange={onChangePage}
              page={pageDetails.page}
              variant="text"
              className="custom-pagination"
            />
            <Box mt={{ xs: 1, sm: 0 }}>
              <Typography component="p" variant="body2" tabIndex={0}>
                Showing {topic.length} rows out of {pageDetails.total}
              </Typography>
            </Box>
          </Box>
        ) : null}
      </Paper>
    </>
  )
}
Notification.propTypes = {
  searchText: PropTypes.string,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  allHeadCells: PropTypes.array,
  topic: PropTypes.array,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  onChangePage: PropTypes.func,
  setSearchValue: PropTypes.func,
  onSearchEnter: PropTypes.func,
  pageDetails: PropTypes.object,
  uiState: PropTypes.object,
  handleClickGridView: PropTypes.func,
  handleClickListView: PropTypes.func,
  toggleDeletePopup: PropTypes.func,
  deleteItems: PropTypes.func,
  openDeletePopup: PropTypes.bool,
  getTopicDetails: PropTypes.func,
  onReset: PropTypes.func,
  makeDefault: PropTypes.func,
}

Notification.defaultProps = {
  searchText: '',
  order: '',
  orderBy: '',
  topic: [],
  allHeadCells: [],
  setOrder: () => {},
  setOrderBy: () => {},
  setSearchValue: () => {},
  onSearchEnter: () => {},
  onChangePage: () => {},
  pageDetails: {},
  handleClickGridView: () => {},
  handleClickListView: () => {},
  uiState: {},
  toggleDeletePopup: () => {},
  deleteItems: () => {},
  getTopicDetails: () => {},
  openDeletePopup: false,
  onReset: () => {},
  makeDefault: () => {},
}
export default Notification
