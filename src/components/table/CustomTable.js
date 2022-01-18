import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import PropTypes from 'prop-types'
import React from 'react'

import useStyles from './Style'
import TableBody from './TableBody'
import TableHeader from './TableHeader'

CustomTable.propTypes = {
  data: PropTypes.array,
  headCells: PropTypes.array,
  children: PropTypes.element,
  noDataMessage: PropTypes.string,
  containerClass: PropTypes.string,
}

CustomTable.defaultProps = {
  data: [],
  headCells: [],
  children: null,
  noDataMessage: '',
  containerClass: '',
}

export default function CustomTable(props) {
  const classes = useStyles()
  const { data, headCells, children, containerClass, noDataMessage } = props

  return (
    <TableContainer className={containerClass}>
      <Table className={classes.table + ' custom-table'}>
        <TableHeader {...props} />
        <TableBody headCells={headCells} data={data} noDataMessage={noDataMessage}>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
