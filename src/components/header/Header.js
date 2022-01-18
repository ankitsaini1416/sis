import './Header.scss'

import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Box from '@material-ui/core/Box'
// import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import Toolbar from '@material-ui/core/Toolbar'
// import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { Bell, Clock, LogOut, User } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { selectedDeviceData, selectedHeaderData, selectUser } from '../../helpers/selectors'
import { logout } from './../../actions/auth.action'
import localStorageService from './../../api/localStorageService'
import RouterContext from './../../contexts/route.context'
import { ROUTES } from './../../helpers/constants'
import { getSchoolUrl, isEmpty } from './../../helpers/utils'
import useStyles from './Header.Style'
import SideBar from './SideBar'

Header.propTypes = {
  headerData: PropTypes.any,
  deviceData: PropTypes.object,
  authUser: PropTypes.object,
}
// const lngs = {
//   en: { nativeName: 'English' },
//   de: { nativeName: 'Deutsch' },
// }
// const ITEM_HEIGHT = 48

function Header(props) {
  const [age, setAge] = React.useState('')
  const handleChange = (event) => {
    localStorage.setItem('lang', event.target.value)
    i18n.changeLanguage(event.target.value)
    setAge(event.target.value)
  }
  const { headerData, deviceData, authUser } = props
  const { params } = useContext(RouterContext)
  const classes = useStyles()
  const { t, i18n } = useTranslation()
  const appState = localStorageService.getAppState()
  const [sidebarMobileOpen, setSidebarMobileOpen] = React.useState(
    !isEmpty(appState) ? appState.drawerOpen : !deviceData.isMobile
  )
  const [notificationEl, setNotificationEl] = React.useState(null)
  let history = useHistory()
  const redirectToProfile = function () {
    history.push(
      getSchoolUrl({ ...params, to: `${ROUTES.USERDETAILS}/${authUser.user_principal.id}` })
    )
  }
  const logoutAndRedirect = () => {
    logout()
    window.location = getSchoolUrl({ ...params, to: ROUTES.LOGIN })
  }
  const toggleDrawer = () => {
    if (sidebarMobileOpen) {
      setSidebarMobileOpen(false)
      localStorageService.setAppState({ drawerOpen: false })
    } else {
      setSidebarMobileOpen(true)
      localStorageService.setAppState({ drawerOpen: true })
    }
  }
  const toggleNotifications = function (event) {
    if (notificationEl === null) {
      setNotificationEl(event.currentTarget)
    } else {
      setNotificationEl(null)
    }
  }

  return (
    <>
      <AppBar
        elevation={0}
        position={deviceData.isMobile ? 'fixed' : 'fixed'}
        className={clsx(classes.appBar, {
          [classes.appBarShift + ' app-bar-shift']: sidebarMobileOpen,
          [classes.appBarOpen + ' app-bar-open']: !sidebarMobileOpen,
        })}
        color="default"
      >
        <Toolbar>
          <Box className="header-inside" width="100%" display="flex" alignItems="center">
            {/*{headerData.sideBar ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              className={clsx(classes.menuButton, sidebarMobileOpen && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
          ) : null}*/}
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer}
              // className={sidebarMobileOpen}
              aria-label={sidebarMobileOpen ? t('openSidebar') : t('closeSidebar')}
            >
              <MenuIcon />
            </IconButton>
            <Box style={{ minWidth: 120, minHieght: 80 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Select Language"
                  onChange={handleChange}
                >
                  <MenuItem value={'en'}>English</MenuItem>
                  <MenuItem value={'de'}>France</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* <div>
              {Object.keys(lngs).map((lng) => (
                <button
                  key={lng}
                  style={{
                    fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
                  }}
                  type="submit"
                  onClick={() => {
                    i18n.changeLanguage(lng)
                  }}
                >
                  {lngs[lng].nativeName}
                </button>
              ))}
            </div> */}

            <Box display="flex" flexDirection="row" alignItems="center" ml="auto">
              <Box
                tabIndex={0}
                aria-label={'User name' + authUser?.user_principal?.username}
                mr={1}
                display={{ xs: 'none', sm: 'flex' }}
                flexDirection="row"
                onClick={redirectToProfile}
                alignItems="center"
                className="cursor-pointer"
              >
                <User aria-label={authUser?.user_principal?.username} />
                <Box ml={1} component="span" fontWeight="fontWeightMedium" fontSize="16px">
                  {authUser?.user_principal?.username}
                </Box>
              </Box>

              <IconButton
                color="inherit"
                aria-label={t('notifications')}
                aria-controls="notification"
                aria-haspopup="true"
                onClick={toggleNotifications}
                className={classes.notification}
              >
                <Bell />
                <span className="notification-sign" />
              </IconButton>
              <Menu
                id="notification-menu"
                anchorEl={notificationEl}
                getContentAnchorEl={null}
                keepMounted
                open={Boolean(notificationEl)}
                onClose={toggleNotifications}
                classes={{ paper: 'notificationDropdown' }}
                PaperProps={{
                  style: {
                    // maxHeight: ITEM_HEIGHT * 8,
                    width: '45ch',
                    marginTop: '60px',
                    boxShadow: '0 0.25rem 0.75rem rgb(18 38 63 / 8%)',
                    border: '1px solid #e9e9ef',
                    height: 'auto',
                    maxHeight: '100%',
                  },
                }}
              >
                <Box display="flex" flexDirection="column" id="notification-body"></Box>
                <Box px={2} py={1}>
                  {/* <Link to="/" color="primary">
                  <Tooltip title="Load More">
                    <MoreHorizIcon color="primary" />
                  </Tooltip>
                </Link> */}
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" component="h5" gutterBottom>
                      <b>{t('notifications')}</b>
                    </Typography>
                    <Link
                      className="link-color-text word-break text-transform-none"
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      {t('markAllRead')}
                    </Link>
                  </Box>
                </Box>
                <Divider />
                <List className="custom-list">
                  <ListItem alignItems="flex-start">
                    <Badge
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      variant="dot"
                      color="primary"
                    >
                      <ListItemAvatar>
                        <Avatar>H</Avatar>
                      </ListItemAvatar>
                    </Badge>

                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="Primary">
                            <Box fontWeight="600" mb={0.5}>
                              HR Confidential
                            </Box>
                          </Typography>
                        </React.Fragment>
                      }
                      color="Primary"
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="textPrimary">
                            Confidential staff documents
                          </Typography>
                          <Box width="100%" mt={0.8}>
                            <Typography component="span" variant="body2" color="textSecondary">
                              <Box display="flex" alignItems="center">
                                <Clock height="15px" width="15px" />
                                <Box ml={1} fontSize="12px">
                                  1 hours 31 minutes ago
                                </Box>
                              </Box>
                            </Typography>
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <Badge
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      variant="dot"
                      color="primary"
                    >
                      <ListItemAvatar>
                        <Avatar>H</Avatar>
                      </ListItemAvatar>
                    </Badge>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="Primary">
                            <Box fontWeight="600" mb={0.5}>
                              HR Confidential
                            </Box>
                          </Typography>
                        </React.Fragment>
                      }
                      color="Primary"
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="textPrimary">
                            Confidential staff documents
                          </Typography>
                          <Box width="100%" mt={0.8}>
                            <Typography component="span" variant="body2" color="textSecondary">
                              <Box display="flex" alignItems="center">
                                <Clock height="15px" width="15px" />
                                <Box ml={1} fontSize="12px">
                                  1 hours 31 minutes ago
                                </Box>
                              </Box>
                            </Typography>
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>

                  <ListItem alignItems="flex-start">
                    <Badge
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      variant="dot"
                      color="primary"
                    >
                      <ListItemAvatar>
                        <Avatar>H</Avatar>
                      </ListItemAvatar>
                    </Badge>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="Primary">
                            <Box fontWeight="600" mb={0.5}>
                              HR Confidential
                            </Box>
                          </Typography>
                        </React.Fragment>
                      }
                      color="Primary"
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="textPrimary">
                            Confidential staff documents
                          </Typography>
                          <Box width="100%" mt={0.8}>
                            <Typography component="span" variant="body2" color="textSecondary">
                              <Box display="flex" alignItems="center">
                                <Clock height="15px" width="15px" />
                                <Box ml={1} fontSize="12px">
                                  1 hours 31 minutes ago
                                </Box>
                              </Box>
                            </Typography>
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>

                  <ListItem alignItems="flex-start">
                    <Badge
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      variant="dot"
                      color="primary"
                    >
                      <ListItemAvatar>
                        <Avatar>H</Avatar>
                      </ListItemAvatar>
                    </Badge>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="Primary">
                            <Box fontWeight="600" mb={0.5}>
                              HR Confidential
                            </Box>
                          </Typography>
                        </React.Fragment>
                      }
                      color="Primary"
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="textPrimary">
                            Confidential staff documents
                          </Typography>
                          <Box width="100%" mt={0.8}>
                            <Typography component="span" variant="body2" color="textSecondary">
                              <Box display="flex" alignItems="center">
                                <Clock height="15px" width="15px" />
                                <Box ml={1} fontSize="12px">
                                  1 hours 31 minutes ago
                                </Box>
                              </Box>
                            </Typography>
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>

                  <ListItem alignItems="flex-start">
                    <Badge
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      variant="dot"
                      color="primary"
                    >
                      <ListItemAvatar>
                        <Avatar>H</Avatar>
                      </ListItemAvatar>
                    </Badge>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="Primary">
                            <Box fontWeight="600" mb={0.5}>
                              HR Confidential
                            </Box>
                          </Typography>
                        </React.Fragment>
                      }
                      color="Primary"
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="textPrimary">
                            Confidential staff documents
                          </Typography>
                          <Box width="100%" mt={0.8}>
                            <Typography component="span" variant="body2" color="textSecondary">
                              <Box display="flex" alignItems="center">
                                <Clock height="15px" width="15px" />
                                <Box ml={1} fontSize="12px">
                                  1 hours 31 minutes ago
                                </Box>
                              </Box>
                            </Typography>
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>

                  <ListItem alignItems="flex-start">
                    <Badge
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      variant="dot"
                      color="primary"
                    >
                      <ListItemAvatar>
                        <Avatar>H</Avatar>
                      </ListItemAvatar>
                    </Badge>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="Primary">
                            <Box fontWeight="600" mb={0.5}>
                              HR Confidential
                            </Box>
                          </Typography>
                        </React.Fragment>
                      }
                      color="Primary"
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="textPrimary">
                            Confidential staff documents
                          </Typography>
                          <Box width="100%" mt={0.8}>
                            <Typography component="span" variant="body2" color="textSecondary">
                              <Box display="flex" alignItems="center">
                                <Clock height="15px" width="15px" />
                                <Box ml={1} fontSize="12px">
                                  1 hours 31 minutes ago
                                </Box>
                              </Box>
                            </Typography>
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
                <Box className="simplebar-track simplebar-vertical"></Box>
                <Divider />
                <Box px={2} py={1} pt={2} align="center">
                  <Link
                    className="link-color-text word-break text-transform-none"
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    {t('Clear All')}
                  </Link>
                </Box>
              </Menu>

              <IconButton
                aria-label={t('logout')}
                color="inherit"
                edge="end"
                onClick={logoutAndRedirect}
              >
                <LogOut />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {headerData.sideBar ? (
        <SideBar
          activeMenuItem={headerData.activeMenuItem}
          activeParent={headerData.activeParent}
          sidebarMobileOpen={sidebarMobileOpen}
          handleDrawerClose={toggleDrawer}
          listItems={headerData.listItems}
          deviceData={deviceData}
        />
      ) : null}
    </>
  )
}

const mapStateToProps = (state) => ({
  headerData: selectedHeaderData(state),
  deviceData: selectedDeviceData(state),
  authUser: selectUser(state),
})
// const mapDispathToPros = dispatch => ({
//
//     // reload: () => dispatch(reload())
// });
export default connect(mapStateToProps, {})(Header)

// export default Header;
