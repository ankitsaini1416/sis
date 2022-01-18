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
  positionRelative: {
    position: 'relative',
  },
  studentBox: {
    marginBottom: theme.spacing(3),
  },
  programImage: {
    width: '96px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  programDetail: {
    width: 'calc(100% - 96px)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  courseImage: {
    width: '56px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  courseDetail: {
    width: 'calc(100% - 56px)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  courseInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(0),
    margin: theme.spacing(0),
    '& li': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative',
      '&:not(:last-child)': {
        paddingRight: theme.spacing(4),
      },
    },
  },
  walletDetail: {
    width: 'calc(100% - 40px)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& .course-info > :not(:first-child):before': {
      [theme.breakpoints.down(767)]: {
        display: 'none',
      },
    },
    '& .course-info': {
      [theme.breakpoints.down(767)]: {
        alignItems: 'flex-start',
      },
    },
    '&  .align-right': {
      [theme.breakpoints.up('sm')]: {
        textAlign: 'right',
      },
    },
    '&  .align-center': {
      [theme.breakpoints.up('sm')]: {
        textAlign: 'center',
      },
    },
  },
  successCoach: {
    width: '160px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  successCoachDetail: {
    width: 'calc(100% - 160px)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  infiniteLoader: {
    position: 'absolute',
    top: '50%',
    right: '50%',
    transform: 'translate(20px, 20px)',
  },
}))

export default useStyles
