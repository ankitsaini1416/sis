import { makeStyles } from '@material-ui/core/styles'
/**
 * Material UI framework styling object
 * @type {StylesHook<Styles<Theme, {}, string>>}
 */
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    maxWidth: '100%',
    height: '100vh',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  authForm: {
    width: '416px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

export default useStyles
