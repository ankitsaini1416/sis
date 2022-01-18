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
  buttonAction: {
    '& button:first-child': {
      margin: theme.spacing(0, 1, 0, 0),
      minWidth: '196px',
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(2, 0, 0, 0),
        width: '100%',
      },
      [theme.breakpoints.up('lg')]: {
        minWidth: '204px',
      },
    },
  },
  widgetTypeList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  widgetType: {
    '& .MuiSelect-selectMenu': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      '& svg': {
        marginLeft: theme.spacing(0.5),
      },
    },
  },
  widgetBox: {
    '& .recharts-wrapper': {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      width: '100%!important',
      height: 'auto!important',
    },
  },
}))

export default useStyles
