import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

import store from '../../store'
import TableNoData from './images/nodatafound.svg'
import { StyleVariables } from './StyleSheetVariables'
const drawerWidth = 280
const drawerWidthSmall = 88
// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      light: StyleVariables.primaryLight,
      main: StyleVariables.primaryMain,
      dark: StyleVariables.primaryDark,
      contrastText: StyleVariables.contrasText,
    },
    secondary: {
      light: StyleVariables.colorSecondaryLight,
      main: StyleVariables.colorSecondaryErrorDark,
      dark: StyleVariables.colorSecondaryRed,
      contrastText: StyleVariables.contrasText,
    },
    error: {
      light: red.A400,
      main: StyleVariables.colorSecondaryError,
      dark: StyleVariables.colorSecondaryErrorDark,
    },
    background: {
      default: StyleVariables.surface,
    },
  },
  typography: {
    fontFamily: `"Inter", sans-serif`,
    fontWeight: 'normal',
  },
  overrides: {
    MuiTypography: {
      colorTextPrimary: {
        color: StyleVariables.primaryGrey,
      },
      colorTextSecondary: {
        color: StyleVariables.secondaryText,
      },
    },
    MuiButton: {
      root: {
        borderRadius: '8px',
      },
      sizeLarge: {
        '@media (min-width: 1400px)': {
          //lineHeight: '32px',
          //fontSize: '1.15em',
        },
        '@media (max-width: 599px)': {
          padding: '6px 16px',
        },
      },
    },
    MuiTableCell: {
      head: {
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: StyleVariables.tableHeader,
        fontWeight: '600',
      },
      body: {
        '& .no-data-image': {
          backgroundImage: `url(${TableNoData})`,
          backgroundRepeat: 'no-repeat',
          width: '200px',
          height: '200px',
          backgroundSize: '100%',
          margin: '0 auto',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '0.825rem',
        fontWeight: 'normal',
      },
    },
    MuiSlider: {
      track: { backgroundColor: StyleVariables.primaryMain },
      thumb: { backgroundColor: StyleVariables.primaryMain },
      root: {
        color: StyleVariables.primaryMain,
        height: 2,
      },
    },
    MuiToggleButton: {
      '&.Mui-selected': {
        color: StyleVariables.contrasText,
        backgroundColor: StyleVariables.primaryMain,
      },
    },
    MuiTabs: {
      vertical: {
        '& .MuiTab-root': {
          borderLeft: '4px solid' + StyleVariables.colorBlueGrey9,
          padding: '6px 18px',
          '&.Mui-selected': {
            backgroundColor: StyleVariables.colorPrimaryLight10,
            color: StyleVariables.primaryDark,
          },
          '& .MuiTab-wrapper': {
            flexDirection: 'row',
            justifyContent: 'flex-start',
          },
        },
        '& .MuiTabs-indicator': {
          left: '0',
          width: '4px',
        },
      },
    },
    MuiAppBar: {
      root: {
        '&.app-bar-shift': {
          marginLeft: store.getState().device.isMobile ? 0 : drawerWidthSmall,
          width: store.getState().device.isMobile ? '100%' : `calc(100% - ${drawerWidthSmall}px)`,
        },
        '&.app-bar-open': {
          marginLeft: store.getState().device.isMobile ? 0 : drawerWidth,
          width: store.getState().device.isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
        },
      },
      colorDefault: {
        backgroundColor: StyleVariables.surface,
        padding: '24px 24px 0 24px',
        ['@media (max-width:599px)']: {
          padding: '8px 16px 0 16px',
        },
      },
    },
    MuiToolbar: {
      regular: {
        boxShadow: '0px 0px 20px 0px rgba(76, 87, 125, 0.02)',
        backgroundColor: StyleVariables.surfaceWhite,
        borderRadius: '8px',
      },
    },
    MuiDrawer: {
      root: {
        '&.drawer-sidebar-open': {
          width: store.getState().device.isMobile ? drawerWidth : drawerWidthSmall,
        },
        '&.drawer-sidebar-close': {
          width: drawerWidth,
        },
      },
      paperAnchorDockedLeft: {
        borderRight: 'none',
      },
      paper: {
        backgroundColor: StyleVariables.surfaceWhite,
        color: StyleVariables.colorBlueGrey2,
        boxShadow: StyleVariables.commonElevation,
        borderRadius: store.getState().device.isMobile ? '0' : '8px',
        top: store.getState().device.isMobile ? 0 : 24,
        bottom: store.getState().device.isMobile ? 0 : 24,
        height: store.getState().device.isMobile ? '100%' : 'auto',
        '&.drawer-paper-open': {
          overflowX: store.getState().device.isMobile ? 'hidden' : 'visible',
          overflowY: store.getState().device.isMobile ? 'visible' : 'visible',
          width: store.getState().device.isMobile
            ? drawerWidth
            : `calc(${drawerWidthSmall}px - 24px)`,
        },
        '&.drawer-paper-close': {
          overflowX: 'hidden',
          overflowY: 'scroll',
          width: `calc(${drawerWidth}px - 24px)`,
        },
      },
      paperAnchorLeft: {
        left: store.getState().device.isMobile ? 0 : 24,
        ['@media (min-width:1280px)']: {
          //left: 24,
        },
      },
    },
  },
})

export default theme
