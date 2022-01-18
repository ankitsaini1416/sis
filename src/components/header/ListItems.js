import './Header.scss'

import { List } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// import ListSubheader from '@material-ui/core/ListSubheader'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
// import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

ListItems.propTypes = {
  listItems: PropTypes.any,
  activeMenuItem: PropTypes.any,
  handleDrawerClose: PropTypes.func,
  logout: PropTypes.func,
}

let activeObject = {
  id: '',
  parentId: '',
}

const AppMenuItem = (item) => {
  const isExpandable = item.data && item.data.length > 0
  const [open, setOpen] = React.useState(
    (item.data || []).map((item) => item.id).includes(activeObject.id)
  )

  function handleClick() {
    setOpen(!open)
  }

  const MenuItemRoot = (
    <>
      {isExpandable ? (
        <ListItem
          className={activeObject.parentId === item.id ? 'header-selected ' : ''}
          onClick={handleClick}
        >
          <ListItemIcon className="menu-icon">{item.icon}</ListItemIcon>
          <ListItemText className="menu-text" primary={item.name} />
          {isExpandable && !open && <ArrowDropDownIcon />}
          {isExpandable && open && <ArrowDropUpIcon />}
        </ListItem>
      ) : (
        <ListItem
          data-bind={item.id}
          className={
            (activeObject.id === item.id ? 'Mui-selected ' : '') +
            ' ' +
            (item.className ? item.className : '')
          }
          // onClick={goToPage(item)}
        >
          <Link className="menu-link-item" to={item.url}>
            <ListItemIcon className="menu-icon">{item.icon}</ListItemIcon>
            <ListItemText className="menu-text" primary={item.name} />
          </Link>
        </ListItem>
      )}
    </>
  )

  const MenuItemChildren = isExpandable ? (
    <Collapse in={isExpandable ? open : true} timeout="auto">
      {item.data.map((subItem, index) => (
        <AppMenuItem {...subItem} key={index} handleDrawerClose={item.handleDrawerClose} />
      ))}
    </Collapse>
  ) : null

  return (
    <Box className={MenuItemChildren ? 'has-children' : ''}>
      {item.showRoot && MenuItemRoot}
      {MenuItemChildren}
    </Box>
  )
}

// eslint-disable-next-line react/prop-types
function ListItems({ listItems, activeMenuItem, handleDrawerClose, activeParent }) {
  activeObject.id = activeMenuItem
  activeObject.parentId = activeParent
  const [logoutConfirmModal, setLogoutConfirmModal] = React.useState(false)
  const toggleLogoutConfirmModal = () => {
    setLogoutConfirmModal(!logoutConfirmModal)
  }
  return (
    <List>
      <div className="side-menu-section">
        {listItems.map((item) => {
          return (
            <AppMenuItem
              key={item.id}
              {...item}
              logout={toggleLogoutConfirmModal}
              handleDrawerClose={handleDrawerClose}
            />
          )
        })}
      </div>
    </List>
  )
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, {})(ListItems)
