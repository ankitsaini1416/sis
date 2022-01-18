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
    '& .MuiTableCell-head': {
      whiteSpace: 'nowrap',
    },
  },
  reportsTable: {
    '& .custom-table': {
      minWidth: 2200,
      [theme.breakpoints.down('md')]: {
        minWidth: 750,
      },
      '& .MuiTableCell-head': {
        whiteSpace: 'nowrap',
      },
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
  removeField: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0!important',
    },
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      right: '-64px',
      bottom: '12px',
    },
  },
  positionRelative: {
    position: 'relative',
  },
  removeField2: {
    paddingLeft: '0!important',
  },
  filterNew: {
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: '0!important',
    },
  },
  dateFilterBox: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    '& .MuiInputBase-inputMarginDense': {
      paddingTop: '8px',
    },
  },
  dateFilterLabel: {
    padding: '14px',
    '&.filter-title': {
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        width: '100%',
        margin: theme.spacing(0),
        borderRadius: theme.spacing(1),
      },
    },
  },
  rangeFilter: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiOutlinedInput-input': {
      textAlign: 'center',
    },
  },
  datePickerStandard: {
    '& label + .MuiInput-formControl': {
      marginTop: 0,
    },
  },
}))

export default useStyles
