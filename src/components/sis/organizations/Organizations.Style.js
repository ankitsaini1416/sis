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
  popoverSwatch: {
    marginTop: theme.spacing(1),
    position: 'relative',
    zIndex: '2',
  },
  swatchCover: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
  uploadFiles: {
    width: '100%',
  },
  popperRoot: {
    '& .MuiAutocomplete-listbox': {
      border: '2px solid grey',
      minHeight: 400,
      color: 'green',
      fontSize: 18,
      '& li:nth-child(even)': { backgroundColor: '#CCC' },
      '& li:nth-child(odd)': { backgroundColor: '#FFF' },
    },
  },
  buttonAction: {
    '& button:last-child': {
      margin: theme.spacing(0, 0, 0, 1),
      minWidth: '228px',
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(0, 0, 2, 0),
        width: '100%',
      },
      [theme.breakpoints.up('lg')]: {
        minWidth: '265px',
      },
    },
  },
}))

export default useStyles
