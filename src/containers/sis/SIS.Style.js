import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    //overflow: 'hidden',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: {
    'body[data-theme="eden"] &': {
      minHeight: '64px',
      [`${theme.breakpoints.up(0)} and (orientation: landscape)`]: {
        minHeight: '56px',
      },
      [theme.breakpoints.up(600)]: {
        minHeight: '88px',
      },
    },
    'body[data-theme="charcoal"] &, body[data-theme="cornflower"] &': theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    minHeight: '100vh',
    overflow: 'hidden',
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  container: {
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down(1025)]: {
      paddingBottom: theme.spacing(2),
    },
  },
}))

export default useStyles
