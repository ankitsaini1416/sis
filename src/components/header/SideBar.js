import './Header.scss'

import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import brandLogo from '../../assets/images/learnstage-logo.png'
import brandLogoXs from '../../assets/images/learnstage-logo-xs.png'
import useStyles from './Header.Style'
import ListItems from './ListItems'

SideBar.propTypes = {
  sidebarMobileOpen: PropTypes.any,
  handleDrawerClose: PropTypes.any,
  listItems: PropTypes.any,
  activeMenuItem: PropTypes.any,
  deviceData: PropTypes.object,
  onHomeClick: PropTypes.func,
  activeParent: PropTypes.string,
}

SideBar.defaultProps = {
  sidebarMobileOpen: false,
  handleDrawerClose: () => {},
  listItems: [],
  activeMenuItem: '',
  deviceData: {},
  onHomeClick: () => {},
  activeParent: () => {},
}

function SideBar(props) {
  const {
    sidebarMobileOpen,
    handleDrawerClose,
    listItems,
    activeMenuItem,
    activeParent,
    deviceData,
    onHomeClick,
  } = props
  const classes = useStyles()
  const { t } = useTranslation()
  // const [year] = React.useState(new Date().getFullYear())
  return (
    <Drawer
      variant={deviceData.isMobile ? 'temporary' : 'permanent'}
      open={sidebarMobileOpen}
      className={
        clsx(classes.drawer, {
          [classes.drawerCapsule + ' drawer-sidebar-open']: sidebarMobileOpen,
          [classes.drawerCapsuleClose + ' drawer-sidebar-close']: !sidebarMobileOpen,
        }) + ' drawer-sidebar'
      }
      classes={{
        paper: clsx({
          [classes.drawerPaper + ' drawer-paper-open']: sidebarMobileOpen,
          [classes.drawerPaperClose + ' drawer-paper-close']: !sidebarMobileOpen,
        }),
      }}
    >
      <Box className="drawer-inner">
        <Box component="div" className={classes.toolbarIcon}>
          <div onClick={onHomeClick} className="brand-name">
            <img
              className="brand-logo"
              src={sidebarMobileOpen && !deviceData.isMobile ? brandLogoXs : brandLogo}
              alt={t('appName')}
            />
          </div>
          {deviceData.isMobile ? (
            <IconButton
              edge="end"
              aria-label={t('closeSidebar')}
              className="drawer-arrow"
              onClick={handleDrawerClose}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
        </Box>
        <ListItems
          activeMenuItem={activeMenuItem}
          listItems={listItems}
          handleDrawerClose={deviceData.isMobile ? handleDrawerClose : null}
          activeParent={activeParent}
        />
      </Box>
    </Drawer>
  )
}

export default SideBar
