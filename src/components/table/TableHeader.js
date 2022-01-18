import { Checkbox, makeStyles } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import PropTypes from 'prop-types'
import React from 'react'

TableHeader.propTypes = {
  order: PropTypes.any,
  setOrder: PropTypes.any,
  orderBy: PropTypes.any,
  setOrderBy: PropTypes.any,
  selected: PropTypes.any,
  setSelected: PropTypes.any,
  data: PropTypes.any,
  headCells: PropTypes.any,
  dataParameter: PropTypes.any,
  isSelection: PropTypes.any,
}

const useStyles = makeStyles(() => ({
  th: {
    fontWeight: '600',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableSortTitle: {
    '& .sortIcon': {
      position: 'absolute',
      right: '-26px',
      opacity: '0.3',
    },
    '&:hover .sortIcon': {
      opacity: '0.8',
    },
  },
}))

export default function TableHeader(props) {
  const classes = useStyles()
  const {
    order,
    setOrder,
    orderBy,
    setOrderBy,
    selected,
    setSelected,
    data,
    headCells,
    dataParameter,
    isSelection,
  } = props

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n[dataParameter])
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  return (
    <TableHead className={classes.thead}>
      <TableRow>
        {isSelection ? (
          <TableCell padding="checkbox" className={classes.th}>
            <Checkbox
              indeterminate={selected.length > 0 && selected.length < data.length}
              checked={selected.length === data.length && selected.length !== 0}
              onChange={handleSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
              color="primary"
            />
          </TableCell>
        ) : null}
        {headCells.map((headCell) => {
          const sortBy = headCell.sortProperty ? headCell.sortProperty : headCell.id
          const isSort = headCell.isSort ? headCell.isSort : false
          return (
            <TableCell
              align={headCell.actionsCellStyle}
              width={headCell.width}
              key={headCell.id}
              sortDirection={orderBy === sortBy ? order : false}
              className={classes.th}
            >
              {isSort ? (
                <TableSortLabel
                  className={classes.tableSortTitle}
                  active={orderBy === sortBy}
                  direction={orderBy === sortBy ? order : 'asc'}
                  onClick={createSortHandler(sortBy)}
                  classes={{
                    icon: 'sortIcon',
                  }}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  {headCell.label}
                  {orderBy === sortBy ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              ) : (
                <span tabIndex={0}>{headCell.label}</span>
              )}
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}
