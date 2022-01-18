import {
  Box,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  Typography,
} from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined'
import PropTypes from 'prop-types'
import React from 'react'
import { Calendar, Edit2, MoreVertical, Trash } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../../helpers/constants'
import ConfirmBox from '../../../common/ConfirmBox'
import RedirectLink from '../../../common/RedirectLink'
import useStyles from '../Administration.Style'

function AllTopicsGrid({ topic, deleteItems, toggleDeletePopup, openDeletePopup, makeDefault }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState({})
  const openAnchorEl = function (id, event) {
    setAnchorEl((lastEls) => {
      lastEls[id] = event.target
      return { ...lastEls }
    })
  }
  const closeAnchorEl = function (id) {
    setAnchorEl((lastEls) => {
      lastEls[id] = null
      return { ...lastEls }
    })
  }

  const makeDefaultButton = (row) => {
    return (
      <Box className="custom-radio-box" mt={1}>
        <label htmlFor={row.id}>
          <Radio
            checked={row.is_default === true}
            onClick={makeDefault}
            data-id={row.id}
            color="primary"
            p={0}
          />
          {t('makeDefault')}
        </label>
      </Box>
    )
  }
  return (
    <Box px={2} pt={1} pb={3} className="grid-list">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
          <Box
            className={classes.topicGridBox + ' grid-box-border add-topic'}
            textAlign="center"
            display="flex"
            alignItems="center"
            flexGrow="1"
            justifyContent="center"
          >
            <RedirectLink to={ROUTES.ADDNEWTOPIC}>
              <Box
                fontSize={30}
                mx="auto"
                alignItems="flex-end"
                justifyContent="center"
                display="flex"
                height="100%"
                pb={{ xs: 0, sm: 3 }}
                minHeight={{ xs: '210px', sm: '100px' }}
              >
                {t('addTopic')}
              </Box>
            </RedirectLink>
          </Box>
        </Grid>
        {topic.map((row) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={row}>
              <Box className={classes.topicGridBox + ' grid-box-border'}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  height="100%"
                  width="100%"
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection="row"
                  >
                    <Typography component="h3" variant="h6" tabIndex={0}>
                      <Box component="span" fontWeight={600} className="break-word">
                        {row.name}
                      </Box>
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <IconButton
                        id={`action-button`}
                        edge="start"
                        aria-controls="action-menu"
                        aria-haspopup="true"
                        onClick={(e) => openAnchorEl(row.id, e)}
                      >
                        <MoreVertical fontSize="small" />
                      </IconButton>
                      <Menu
                        id={`action-menu`}
                        anchorEl={anchorEl[row.id]}
                        keepMounted
                        open={Boolean(anchorEl[row.id])}
                        onClose={() => closeAnchorEl(row.id)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <RedirectLink to={`${ROUTES.CONFIGRATION}/${row.id}`}>
                          <MenuItem color="primary">
                            <Box display="flex" alignItems="center">
                              <Edit2 className="text-primary" height="16px" width="16px" />
                              <Box ml={1} component="span">
                                {t('edit')}
                              </Box>
                            </Box>
                          </MenuItem>
                        </RedirectLink>
                        <Divider />
                        <MenuItem>
                          <Box
                            display="flex"
                            alignItems="center"
                            data-id={row.id}
                            onClick={toggleDeletePopup}
                          >
                            <Trash className="text-secondary" height="16px" width="16px" />
                            <Box ml={1}>{t('delete')}</Box>
                          </Box>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                          <RedirectLink to={`${ROUTES.TOPICLOGS}/${row.id}`}>
                            <Box display="flex" alignItems="center">
                              <ListAltOutlinedIcon
                                color="primary"
                                className="text-primary"
                                fontSize="small"
                              />
                              <Box ml={1}>{t('viewTopicLogs')}</Box>
                            </Box>
                          </RedirectLink>
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>

                  <Box mt={2}>
                    <Typography
                      variant="body2"
                      component="p"
                      className="break-word"
                      gutterBottom
                      tabIndex={row.processor ? 0 : null}
                    >
                      {row.processor}
                    </Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography
                      variant="body2"
                      component="p"
                      className="break-word"
                      tabIndex={row.description ? 0 : null}
                    >
                      {row.description}
                    </Typography>
                  </Box>
                  <Typography
                    component="p"
                    variant="body1"
                    color="primary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontSize={14} fontWeight={600}>
                      {t('lastUpdated')}
                    </Box>
                  </Typography>

                  <Typography component="p" variant="body1" color="textSecondary">
                    <Grid container justify="space-between">
                      <Grid item xs="auto">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-start"
                          height="100%"
                          tabIndex={row.last_updated ? 0 : null}
                        >
                          <Calendar height="16px" width="16px" />
                          <Box component="span" fontSize={14} fontWeight={600} ml={1}>
                            {row.last_updated}
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs="auto">
                        <Box width="100%" align="right">
                          {row.is_active ? (
                            <Box
                              m={0}
                              component="span"
                              className="button-label-success"
                              tabIndex={0}
                            >
                              <FiberManualRecordIcon fontSize="small" />
                              {t('active')}
                            </Box>
                          ) : (
                            <Box m={0} component="span" className="button-label-error" tabIndex={0}>
                              <FiberManualRecordIcon fontSize="small" />
                              {t('inActive')}
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Typography>
                  {makeDefaultButton(row)}
                </Box>
              </Box>
            </Grid>
          )
        })}
        <ConfirmBox
          maxWidth="xs"
          open={openDeletePopup}
          close={toggleDeletePopup}
          onConfirm={deleteItems}
          defaultProps={{ message: 'deleteConfirmation', buttonText: 'delete' }}
        />
      </Grid>
    </Box>
  )
}
AllTopicsGrid.propTypes = {
  topic: PropTypes.array,
  deleteItems: PropTypes.func,
  openDeletePopup: PropTypes.bool,
  toggleDeletePopup: PropTypes.func,
  makeDefault: PropTypes.func,
}
AllTopicsGrid.defaultProps = {
  topic: [],
  deleteItems: () => {},
  toggleDeletePopup: () => {},
  openDeletePopup: false,
  makeDefault: () => {},
}

export default AllTopicsGrid
