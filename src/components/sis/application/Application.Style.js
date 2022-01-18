import { makeStyles } from '@material-ui/core/styles'

/**
 * Material UI framework styling object
 * @type {StylesHook<Styles<Theme, {}, string>>}
 */
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 350,
    [theme.breakpoints.down('md')]: {
      minWidth: 750,
    },
  },
  form: {
    width: '100%',
  },
  verticalSpaceRemove: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  stepperTop: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  selectIcon: {
    '& .MuiSelect-iconOutlined': {
      right: '54px',
    },
  },
}))

export default useStyles
