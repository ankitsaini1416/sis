import { makeStyles } from '@material-ui/core'

/**
 * Material UI framework styling object
 * @type {StylesHook<Styles<Theme, {}, string>>}
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outlineStyle: 'none',
  },
  form: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  checkboxHead: {
    '& .MuiFormControlLabel-label': {
      fontWeight: '600',
    },
  },
  columnSettings: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    '& .MuiFormControlLabel-root': {
      flex: '0 100%',
      [theme.breakpoints.up('sm')]: {
        flex: '0 49%',
      },
    },
  },
}))

export default useStyles
