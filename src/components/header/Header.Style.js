import { makeStyles } from '@material-ui/core/styles'

import store from '../../store'

const sidebarHeight = window.innerHeight
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(1),
    },
  },
  menuButtonHidden: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: store.getState().device.isMobile ? 'block' : 'none',
    },
  },
  drawer: {
    overflow: 'hidden',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    '& .MuiList-padding': {
      [theme.breakpoints.up('md')]: {
        minHeight: `calc(${sidebarHeight}px - 112px)`,
      },
    },
  },

  drawerCapsule: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerCapsuleClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerPaper: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  languageButton: {
    marginLeft: theme.spacing(2),
    minWidth: 120,
    backgroundColor: '#fff',
    '& :focus': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 110,
      margin: theme.spacing(1, 0.5),
    },
    '& .MuiOutlinedInput-inputMarginDense': {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      fontSize: '14px',
    },
  },
  notification: {
    position: 'relative',
  },
}))

export default useStyles
