import { Chip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { styled } from '@material-ui/core/styles'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const CustomChip = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light(400),
    color: theme.palette.primary.main,
  },
}))(Chip)
export { CustomChip }

const CustomToggleGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0),
    fontFamily: `"Inter", sans-serif`,
    fontWeight: '500',
    textTransform: 'none',
    borderRadius: 0,
    border: 'none',
    flex: 1,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: 0,
    },
    '&:first-of-type': {
      borderRadius: 0,
    },
    '&:last-of-type': {
      borderRadius: '0 8px 8px 0',
    },
  },
}))
export { CustomToggleGroup }
