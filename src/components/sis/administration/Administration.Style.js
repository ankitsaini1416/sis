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
  verticalTab: {
    '& .MuiTab-wrapper': {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    '& .MuiTab-root': {
      padding: '6px 18px',
    },
    '& .MuiButtonBase-root svg': {
      marginRight: '10px',
    },
    '& .MuiTab-labelIcon .MuiTab-wrapper > *:first-child': {
      marginBottom: '0',
    },
  },
  selectIcon: {
    '& .MuiSelect-iconOutlined': {
      right: '54px',
    },
  },
  topicGridBox: {
    display: 'flex',
    height: '100%',
    color: '#000',
    padding: theme.spacing(2, 3, 2),
    borderRadius: theme.shape.borderRadius * 2,
    textDecoration: 'none',
    position: 'relative',
    '& :hover': {
      textDecoration: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 2, 2),
    },
  },
}))

export default useStyles
