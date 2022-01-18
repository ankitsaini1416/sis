import { makeStyles } from '@material-ui/core'

/**
 * Material UI framework styling object
 * @type {StylesHook<Styles<Theme, {}, string>>}
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  customAlert: {
    width: '40%',
    position: 'fixed',
    bottom: 10,
    zIndex: 99999,
    left: '30%',
    [theme.breakpoints.down('sm')]: {
      left: '10%',
      width: '80%',
    },
  },
}))

export default useStyles
